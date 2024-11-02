import React, { useState, useEffect } from "react";
import axios from "axios";

const Currency = () => {
  const [rates, setRates] = useState({});
  const [ratesFetched, setRatesFetched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [output, setOutput] = useState("");

  const getRates = async () => {
    try {
      const response = await axios.get("https://v6.exchangerate-api.com/v6/b6564127786cea2181f2812f/latest/USD");
      if (response.data.result === "success") {
        setRates(response.data.conversion_rates);
        setRatesFetched(true);
      }
    } catch (error) {
      console.error("Error fetching rates:", error);
    }
  };

  useEffect(() => {
    getRates();
  }, []);

  const calculateOutput = () => {
    if (ratesFetched && rates[toCurrency]) {
      const CurrencyRate = rates[toCurrency];
      const calculatedOutput = (amount * CurrencyRate).toFixed(2);
      setOutput(calculatedOutput);
    } else {
      setOutput("Please select valid currencies");
    }
  };

  return (
    <div className="container">
      <h1>Currency Converter Application</h1>	
      <div className="input-amount">
        <label>Amount: </label>
        <input type="number" id="amount" onChange={(e) => setAmount(e.target.value)} value={amount} />
      </div>

      <div className="input-form">
        <label>From: </label>
        <select id="from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option value="USD">USD</option>
          )}
        </select>
      </div>

      <div className="input-to">
        <label>To:</label>
        <select id="to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
          {ratesFetched ? (
            Object.keys(rates).map((currency, index) => (
              <option key={index} value={currency}>
                {currency}
              </option>
            ))
          ) : (
            <option value="INR">INR</option>
          )}
        </select>
      </div>

      <button className="btn" onClick={calculateOutput}>Calculate</button>

      <div className="output">
        <label>{output}</label>
      </div>
    </div>
  );
};

export default Currency;
