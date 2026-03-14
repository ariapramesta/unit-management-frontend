import { CreateUnitPayload, UnitData, UnitStatus } from "@/types/unit";
import api from "./api";

export const unitService = {
  getAllUnits: async (status?: string): Promise<UnitData[]> => {
    const params = status ? { status } : {};
    const response = await api.get<UnitData[]>("/units", { params });
    return response.data;
  },

  createUnit: async (data: CreateUnitPayload): Promise<UnitData> => {
    const response = await api.post<UnitData>("/units", data);
    return response.data;
  },

  deleteUnit: async (id: string): Promise<void> => {
    await api.delete(`/units/${id}`);
  },

  updateUnitStatus: async (
    id: string,
    status: UnitStatus,
  ): Promise<UnitData> => {
    const response = await api.put(`/units/${id}`, { status });
    return response.data.data;
  },
};
