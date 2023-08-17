import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import SelectCountry from "../components/selectCountry";
import Loader from "../components/loader";
import SelectPaymentMethod from "../components/SelectPaymentMethod";
import SelectPaymentType from "../components/selectPaymentType";

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

  const loadPaymentMethod = async () => {
    setLoading(true);
    console.log(selectedCountry);
    try {
      const response = await axios.post("/api/payment_method", {
        country: selectedCountry.iso_alpha2,
        currency: selectedCountry.currency_code,
      });
      setPaymentMethodData(response.data);
      console.log(response.data);

      setStep("select_payment_method");
      setLoading(false);
    } catch (err) {
      console.error(err, "pay");
    }
  };

  const loadPaymentType = async () => {
    setLoading(true);
    console.log(selectedPaymentMethod);

    try {
      const response = await axios.post("/api/required_fields", {
        type: selectedPaymentMethod,
      });
      setPaymentTypeData(response.data.data.fields);
      console.log(response.data.data.fields)
      setStep("set_required_fields");
      console.log(response.data.data.fields);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_URL + "/countries"
        );
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
      console.log(selectedPaymentMethod);
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
        GetWorkFlow(
          step,
          countries,
          paymentMethodData,
          paymentTypeData,
          moveToSecondStep,
          moveToThirdStep
        )
      )}
    </Layout>
  );
}

const GetWorkFlow = (
  step,
  countries,
  paymentMethodData,
  paymentTypeData,
  moveToSecondStep,
  moveToThirdStep,
) => {
  switch (step) {
    case "select_country":
      return (
        <SelectCountry
          countries={countries}
          moveToNextStep={moveToSecondStep}
        />
      );
    case "select_payment_method":
      return (
        <>
          <SelectPaymentMethod
            moveToNextStep={moveToThirdStep}
            paymentMethod={paymentMethodData}
          />
        </>
      );
    case "set_required_fields":
      return (
        <>
          <SelectPaymentType
            moveToNextStep={moveToThirdStep}
            paymentType={paymentTypeData}
          />
        </>
      );
    case "process_payment":
      return <></>;
    default:
      return null; // Handle unknown step case
  }
};
