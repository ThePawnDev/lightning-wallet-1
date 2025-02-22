import React, { useEffect, useState } from "react";
import axios from "axios";
import Transactions from "./components/Transactions";
import "./App.css";

function App() {
  const [price, setPrice] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const getPrice = () => {
    // Axios for http requests
    axios
      .get("https://api.coinbase.com/v2/prices/BTC-USD/spot")
      // Using .then to run if the API call is successful
      .then((res) => {
        setPrice(res.data.data.amount);
      })
      // Using .catch to run if the API call fails
      .catch((err) => {
        console.log(err);
      });
  };

  const getWalletBalance = () => {
    const headers = {
      "X-Api-Key": process.env.REACT_APP_READ_KEY,
    };
    axios
      .get("https://demo.lnbits.com/api/v1/wallet", { headers })
      .then((res) => {
        // Divide our balance by 1000 since it is denominated in millisats
        setBalance(res.data.balance / 1000);
      })
      .catch((err) => console.log(err));
  };

  const getTransactions = () => {
   const headers = {
     "X-Api-Key": process.env.REACT_APP_ADMIN_KEY,
   };
   axios
     .get("https://demo.lnbits.com/api/v1/payments", { headers })
     .then((res) => {
       setTransactions(res.data);
     })
     .catch((err) => console.log(err));
 };

  // useEffect is a 'hook' that will run code based on a trigger
  // The brackets hold the trigger that determines when the code will run
  // Since it is empty [] that means this code will run once on page load
  useEffect(() => {
    getPrice();
    getWalletBalance();
    getTransactions();
  }, []);
 
  // Run these functions every 5 seconds after initial page load
  useEffect(() => {
    const interval = setInterval(() => {
      getPrice();
      getWalletBalance();
      getTransactions();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>My First ln Wallet</h1>
      </header>
      {/* <Buttons /> */}
      <div className="row">
        <div className="balance-card">
          <h2>Balance</h2>
          <p>{balance} sats</p>
        </div>
        <div className="balance-card">
          <h2>BTC Price</h2>
          <p>US${price}</p>
        </div>
      </div>
      <div className="row">
        <div className="row-item">
          <Transactions transactions={transactions} />
        </div>
        <div className="row-item">{/* <Chart chartData={chartData} /> */}</div>
      </div>
      <footer>
        <p>It's crappy, but might just work.</p>
      </footer>
    </div>
  );
  }

export default App;
