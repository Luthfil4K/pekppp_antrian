
import api from '../lib/api';

export const postQueueNumberAdmin = async (id, jenisLayananId) => {
  const res = await api.post(`/qr/${id}`, {
    jenisLayananId, 
  });
  return res.data;
};

export const getLatestQueue  = async() => {
  const res = await api.get(`/latest`);
  return res.data;
};

export const GetAllQueueTodayAdmin  = async() => {
  const res = await api.get(`/admin/allQueueTodayAdmin`);
  return res.data;
};

export const GetAllQueueToday  = async() => {
  const res = await api.get(`/todayQueue`);
  return res.data;
};

export const updateStatusByAdmin = async ({ id, type }) => {
  return api.patch(`/admin/changeStatus/${id}`, {
    type
  });
}

export const getAllQueueMonth = async () => {
  const res = await  api.get(`/thisMonthQueue`);
  return res.data
}

