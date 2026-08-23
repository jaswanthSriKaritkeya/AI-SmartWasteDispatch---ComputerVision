export const getApiErrorMessage = (error) => {
  if (error.response && error.response.data) {
    const data = error.response.data;
    const status = error.response.status;

    // 409 Conflict — e.g. request already accepted by another captain
    if (status === 409) {
      return typeof data.detail === 'string'
        ? data.detail
        : 'This request has already been accepted by another captain.';
    }

    // FastAPI Validation Errors (422)
    if (status === 422 && Array.isArray(data.detail)) {
      return data.detail.map((err) => {
        const field = err.loc[err.loc.length - 1];
        const msg = err.msg;
        // Make field names human-readable
        const fieldLabel = field === 'image' ? 'image'
          : field === 'waste_type' ? 'waste type'
          : field === 'latitude' ? 'latitude (location)'
          : field === 'longitude' ? 'longitude (location)'
          : field;
        return `Missing or invalid ${fieldLabel}: ${msg}`;
      }).join(' | ');
    }

    // 401 Unauthorized
    if (status === 401) {
      return 'Authentication failed. Please log in again.';
    }

    // Other FastAPI errors (400, 403, 404, 500, etc.)
    if (typeof data.detail === 'string') {
      return data.detail;
    }
    if (data.message) {
      return data.message;
    }
  }

  if (error.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
};
