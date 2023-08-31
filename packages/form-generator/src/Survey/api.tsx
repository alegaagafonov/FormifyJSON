// api.js
import axios from "axios";

const API_BASE = "your-api-url";

export const sendVerification = ({
  phoneNumber,
  projectId,
}: {
  phoneNumber: string;
  projectId: string;
}) => {
  return axios.post(`${API_BASE}/send-verification`, {
    phoneNumber,
    projectId,
  });
};

export const verifyUser = ({
  phoneNumber,
  code,
}: {
  phoneNumber: string;
  code: string;
}) => {
  return axios.post(`${API_BASE}/verify-user`, {
    phoneNumber,
    code,
  });
};

export const saveFeedback = ({
  projectId,
  data,
}: {
  projectId: string;
  data: any;
}) => {
  return fetch(`${API_BASE}/saveFeedback/${projectId}`, {
    method: "POST",
    body: data,
  });
};
