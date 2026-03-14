import { CreateUnitPayload, UnitData, UnitStatus } from "@/types/unit";
import api from "./api";

export const unitService = {
  getAllUnits: async (): Promise<UnitData[]> => {
    const response = await api.get<UnitData[]>("/units");
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
    const response = await api.patch(`/units/${id}/status`, { status });
    return response.data.data;
  },
};
