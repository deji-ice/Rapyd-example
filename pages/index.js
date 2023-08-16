import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import SelectCountry from "../components/selectCountry";
import Loader from "../components/loader";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [step, setStep] = useState("select_country");
  const [paymentMethodData, setPaymentMethodData] = useState([]);

  const moveToSecondStep = (country) => {
    setSelectedCountry(country);
  };

  const loadPaymentMethod = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
      "localhost:3000/api/v1/payment_method",
        {
          country: selectedCountry.name,
          currency: selectedCountry.currency_code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            country: selectedCountry.name,
            currency: selectedCountry.currency_code,
          },
        }
      );
      setPaymentMethodData(response.data);
      setStep("payment_method");
      setLoading(false);
    } catch (err) {
      console.error(err, "pay");
    }
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
    if (!!selectedCountry) {
      loadPaymentMethod();
    }
  }, [selectedCountry]);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {isLoading ? <Loader /> : GetWorkFlow(step, countries, moveToSecondStep)}
    </Layout>
  );
}

const GetWorkFlow = (step, countries, moveToSecondStep) => {
  if (step === "select_country") return <SelectCountry countries={countries} moveToNextStep={moveToSecondStep} />;
  if (step === "select_payment_method") return <></>;
  if (step === "set_required_fields") return <></>;
  if (step === "process_payment") return <></>;
};
