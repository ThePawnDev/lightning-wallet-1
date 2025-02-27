import React from "react";
import "./Transactions.css";

export const Transactions = ({transactions}) => {
const parseTx = (tx) => {
    // console.log(tx);
    const date = new Date(tx.time * 1000);
    const formattedDate = date.toLocaleString("pt-BR");
    
    if (tx.pending) return null;

    if (tx.status === "success") {
        if (tx.amount > 0 && tx.amount === 1000) {
            return (
                <div key={tx.checking_id} className="tx-item">
                    <p>Received from {tx.bolt11.substring(0, 25)}...</p>
                    <p>+{tx.amount / 1000} sat</p>
                    <p>[Fees: {tx.fee / 1000} sat(s)]</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            );
        }
        else if (tx.amount > 0 && tx.amount !== 1000) {
            return (
                <div key={tx.checking_id} className="tx-item">
                    <p>Received from {tx.bolt11.substring(0, 25)}...</p>
                    <p>+{tx.amount / 1000} sats</p>
                    <p>[Fees: {tx.fee / 1000} sat(s)]</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            );
        }
        else if (tx.amount < 0 && tx.amount === -1000) {
            return (
                <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
                    <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
                    <p className="tx-amount">{tx.amount / 1000} sat</p>
                    <p>[Fees: {tx.fee / 1000} sat(s)]</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            );
        }
        else if (tx.amount < 0 && tx.amount !== -1000) {
            return (
                <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
                    <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
                    <p className="tx-amount">{tx.amount / 1000} sats</p>
                    <p>[Fees: {tx.fee / 1000} sat(s)]</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            );
        }
    }

    else if (tx.status !== "success") {
        if (tx.amount > 0) {
            return (
                <div key={tx.checking_id} className="tx-item">
                    <p>Oops! Something went wrong!</p>
                    <p>Your {tx.amount / 1000} sat(s) tx was not received!</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            )
        }
        if (tx.amount < 0) {
            return (
                <div key={tx.checking_id} className="tx-item">
                    <p>Oops! Something went wrong!</p>
                    <p>Your {tx.amount / 1000} sat(s) tx was not sent!</p>
                    <p className="transaction-date">{formattedDate}</p>
                </div>
            )
        }
    }

};
 
return (
    <div>
        <h3>Transactions</h3>
            {transactions.map((transaction) => {
        return parseTx(transaction);
        })}
    </div>
    );
};

export default Transactions;

