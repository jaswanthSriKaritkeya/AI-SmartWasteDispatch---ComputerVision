import API from './api';

export const getRequests = async () => {
  const response = await API.get('/captain/requests');
  return response.data;
};

export const acceptRequest = async (requestId) => {
  const response = await API.post(`/captain/requests/${requestId}/accept`);
  return response.data;
};

export const rejectRequest = async (requestId) => {
  const response = await API.post(`/captain/requests/${requestId}/reject`);
  return response.data;
};

export const getActiveTask = async () => {
  const response = await API.get('/captain/tasks/active');
  return response.data;
};

export const startTask = async (reportId) => {
  const response = await API.post(`/captain/tasks/${reportId}/start`);
  return response.data;
};

export const completeTask = async (reportId) => {
  const response = await API.post(`/captain/tasks/${reportId}/complete`);
  return response.data;
};
