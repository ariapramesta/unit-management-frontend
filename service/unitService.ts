import { CreateUnitPayload, UnitData } from "@/types/unit";
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
};
