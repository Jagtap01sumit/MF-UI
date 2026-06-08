import { getAllAMCs } from "../services/amc.services";


export const getAMCs = async (req, res) => {
  try {
    const amcs = await getAllAMCs();

    res.status(200).json({
      success: true,
      data: amcs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



