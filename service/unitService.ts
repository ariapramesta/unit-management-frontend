import api from "./api";

export type UnitType = "capsule" | "cabin";

export type UnitStatus = "available" | "occupied" | "cleaning" | "maintenance";

export type CreateUnitPayload = {
  name: string;
  type: UnitType | "";
  status?: UnitStatus;
};

export type UnitResponse = {
  id: string;
  name: string;
  type: UnitType;
  status: UnitStatus;
  lastUpdated: string;
};

export const unitService = {
  getAllUnits: async (): Promise<UnitResponse[]> => {
    const response = await api.get<UnitResponse[]>("/units");
    return response.data;
  },

  createUnit: async (data: CreateUnitPayload): Promise<UnitResponse> => {
    const response = await api.post<UnitResponse>("/units", data);
    return response.data;
  },
};
