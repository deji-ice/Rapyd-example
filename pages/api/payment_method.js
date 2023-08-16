import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { country, currency } = req.body;
      // /v1/payment_methods/countries/GB?currency=GBP'
      const response = await Rapyd.get(
        `/v1/payment_methods/country?country=${country}&currency=${currency}`
      );
      const data = await response.data();
      return res.json(data);
    } catch (err) {
      res.json(err);
    }
  }
};

export default endpointHandler;
