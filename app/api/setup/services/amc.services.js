import { fetchAllAMCs } from "../repositories/amc.repository.js";

export const getAllAMCs = async () => {
  return await fetchAllAMCs();
};