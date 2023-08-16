import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const { country, currency } = req.body;
      console.log(req.headers);
      const response = await Rapyd.get(`/v1/payment_methods/countries/${country}?currency=${currency}`);
      const data = await response.data();

      return res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
};

export default endpointHandler;
