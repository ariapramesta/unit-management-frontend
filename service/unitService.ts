import api from "./api";

export const unitService = {
  getAllUnits: async () => {
    const response = await api.get("/units");
    return response.data;
  },
};
