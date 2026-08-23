import API from './api';

// POST /predict — multipart/form-data with image, waste_type, latitude, longitude
// DO NOT pass headers manually; let Axios set the correct multipart boundary.
export const createReport = async (formData) => {
  const response = await API.post('/predict', formData);
  return response.data;
};

// GET /citizen/reports — returns { success, reports: [...] }
export const getReports = async () => {
  const response = await API.get('/citizen/reports');
  return response.data;
};

// GET /citizen/reports/{reportId} — returns { success, report: {...} }
export const getReport = async (reportId) => {
  const response = await API.get(`/citizen/reports/${reportId}`);
  return response.data;
};
