import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "POST") {

    const { type } = req.body;
    const response = await Rapyd.get(
      `/v1/payment_methods/required_fields/${type}`
    );
    const data = await response.data();
    return res.json({ data });
  }
};

export default endpointHandler;
