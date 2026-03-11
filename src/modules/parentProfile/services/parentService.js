// src/services/parentService.js
import api from "@/axios"; // axios المخصص اللي فيه baseURL + headers

const ENDPOINT = "/parentProfile";

export const getParentProfile = async () => {
  const response = await api.get("/parentProfile");

  return response; 
};

export const getChildDetails = async (childId) => {
  const response = await api.get(`${ENDPOINT}/${childId}`);
  return response;
};
export const getChildGroupDetails = async (childId, groupId) => {
  const response = await api.get(`/parentProfile/${childId}/${groupId}`);
  console.log("response.data",response.data.data);
  
  return response.data.data; // ✅ هنا التصحيح
};
