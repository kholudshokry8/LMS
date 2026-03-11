
import api from "@/axios";

export const getNextSession = () => {
  return api.get('/studentProfile/getNextSession');
};

export const submitTask = (taskId, payload) => {
  return api.post(`/studentProfile/tasks/${taskId}/submit`, payload);
};

export const getSessionTask = (sessionId) => {
  return api.get(`/studentProfile/sessions/${sessionId}/task`);
};
