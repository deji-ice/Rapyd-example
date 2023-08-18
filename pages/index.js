import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import SelectCountry from "../components/SelectCountry";
import Loader from "../components/Loader";
import SelectPaymentMethod from "../components/SelectPaymentMethod";
import SelectPaymentType from "../components/SelectPaymentType";
import PaymentProcessed from "../components/PaymentProcessed";
import PaymentFailed from "../components/PaymentFailed";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState("select_country");
  const [paymentMethodData, setPaymentMethodData] = useState([]);
  const [paymentTypeData, setPaymentTypeData] = useState([]);

  const moveToSecondStep = (country) => {
    setSelectedCountry(country);
  };

  const moveToThirdStep = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
  };

  const moveToFourthStep = (fields) => {
    processPayment(fields);
  };

  const loadPaymentMethod = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/payment_method", {
        country: selectedCountry.iso_alpha2,
        currency: selectedCountry.currency_code,
      });
      setPaymentMethodData(response.data);

      setStep("select_payment_method");
      setLoading(false);
    } catch (err) {
      console.error(err, "pay");
    }
  };

  const loadPaymentType = async () => {
    setLoading(true);

    try {
      const response = await axios.post("/api/required_fields", {
        type: selectedPaymentMethod,
      });
      setPaymentTypeData(response.data.data);

      setStep("set_required_fields");

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const processPayment = async (fields) => {
    setLoading(true);

    try {
      const { amount, name, email, phone_number, addresses } = fields;
      delete fields.amount;
      delete fields.name;
      delete fields.email;
      delete fields.phone_number;
      delete fields.addresses;

      await axios.post("/api/make_payment", {
        amount: amount ?? 0,
        currency: selectedCountry.currency_code,
        customer: {
          name,
          email,
          phone_number,
          addresses: [addresses],
        },
        payment_method: {
          type: selectedPaymentMethod,
          fields: {
            ...fields,
          },
        },
      });

      setStep("set_payment_processed");
    } catch (error) {
      setStep("set_payment_process_failed");
      console.error(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_URL + "/countries");
        setCountries(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err, "country");
      }
    };

    getCountries();
  }, []);

  useEffect(() => {
    if (selectedCountry.name) {
      loadPaymentMethod();
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (!!selectedPaymentMethod) {
      loadPaymentType();
    }
  }, [selectedPaymentMethod]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {isLoading ? (
        <Loader />
      ) : (
        GetWorkFlow(step, countries, paymentMethodData, paymentTypeData, moveToSecondStep, moveToThirdStep, moveToFourthStep, isLoading)
      )}
    </Layout>
  );
}

const GetWorkFlow = (step, countries, paymentMethodData, paymentTypeData, moveToSecondStep, moveToThirdStep, moveToFourthStep, isLoading) => {
  switch (step) {
    case "select_country":
      return <SelectCountry countries={countries} moveToNextStep={moveToSecondStep} />;
    case "select_payment_method":
      return (
        <>
          <SelectPaymentMethod moveToNextStep={moveToThirdStep} paymentMethod={paymentMethodData} />
        </>
      );
    case "set_required_fields":
      return (
        <>
          <SelectPaymentType moveToNextStep={moveToFourthStep} paymentType={paymentTypeData} isLoading={isLoading} />
        </>
      );
    case "set_payment_processed":
      return <PaymentProcessed />;
    case "set_payment_process_failed":
      return <PaymentFailed />;
  }
};
