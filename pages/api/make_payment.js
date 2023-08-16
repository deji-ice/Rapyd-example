import { Rapyd } from "../../rapyd.js";

const endpointHandler = async (req, res) => {
  if (req.method === "POST") {
    const { city, line_1, amount, complete_payment_url, currency, ewallet, customer_name, customer_email, customer_phone_number, error_payment_url } =
      req.body;
    const response = await Rapyd.post(`/v1/payments`, {
      address: {
        city,
        line_1,
      },
      amount,
      complete_payment_url,
      currency,
      ewallet,
      customer: {
        name: customer_name,
        email: customer_email,
        phone_number: customer_phone_number,
      },
      error_payment_url,
    });
    const data = await response.data();

    return res.json({ data });
  }
};

export default endpointHandler;
