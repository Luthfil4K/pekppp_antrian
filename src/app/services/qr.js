
import api from '../lib/api';

export const postQueuebyUser = async () => {
  const res = await api.post("/QueueByUser");
  return res.data;
};