import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const response = await Rapyd.post(`/v1/payments`, req.body);

      const data = await response.data();

      return res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};

export default endpointHandler;
