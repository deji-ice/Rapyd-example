import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "GET") {
    const response = await Rapyd.get("/v1/data/countries");
    const data = await response.data();

    return res.json(data);
  }
};

export default endpointHandler;
