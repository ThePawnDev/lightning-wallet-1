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



//     if (tx.status !== "success" && tx.amount > 0){
//         return (
//             <div key={tx.checking_id} className="tx-item">
//               <p>TRANSACTION FAILED! Invoice: {tx.bolt11.substring(0, 10)}...</p>
//               <p>{tx.amount / 1000} sats - failed</p>
//               <p className="transaction-date">{formattedDate}</p>
//             </div>
//           );
//     }
//     if (tx.status !== "success" && tx.amount < 0){
//         return (
//             <div key={tx.checking_id} className="tx-item">
//               <p>TRANSACTION FAILED! Sats were not sent!</p>
//               <p>{tx.amount / 1000} sats - failed</p>
//               <p className="transaction-date">{formattedDate}</p>
//             </div>
//           );
//     }
//     if (tx.status === "success" && tx.fee === 0){
//         if (tx.pending) {
//             if (tx.amount > 0 && tx.amount !== 1000){
//                 return (
//                 <div key={tx.checking_id} className="tx-item">
//                     <p>Pending tx from {tx.bolt11.substring(0, 25)}...</p>
//                     <p>+{tx.amount / 1000} sats</p>
//                     <p className="transaction-date">{formattedDate}</p>
//                 </div>
//                 );
//             }
//             // For single sat transactions
//             if (tx.amount > 0 && tx.amount === 1000){
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Pending tx from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sat</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount < 0 && tx.amount !== 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Transaction is pending.</p>
//                         <p className="tx-amount">{tx.amount / 1000} sats</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             } 
//             if (tx.amount < 0 && tx.amount === 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Transaction is pending.</p>
//                         <p className="tx-amount">{tx.amount / 1000} sat</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }       
//         }
//         if (tx.pending === false) {    
//             if (tx.amount > 0 && tx.amount !== 1000) {
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Received from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sats</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount > 0 && tx.amount === 1000) {
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Received from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sat</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
        
//             if (tx.amount < 0 && tx.amount !== 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
//                         <p className="tx-amount">{tx.amount / 1000} sats</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount < 0 && tx.amount === 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
//                         <p className="tx-amount">{tx.amount / 1000} sat</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//         }
//     };

//     // For transactions that had fees
//     if (tx.status === "success" && tx.fee > 0){
//         if (tx.pending) {
//             if (tx.amount > 0 && tx.amount !== 1000){
//                 return (
//                 <div key={tx.checking_id} className="tx-item">
//                     <p>Pending tx from {tx.bolt11.substring(0, 25)}...</p>
//                     <p>+{tx.amount / 1000} sats</p>
//                     <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                     <p className="transaction-date">{formattedDate}</p>
//                 </div>
//                 );
//             }
//             if (tx.amount > 0 && tx.amount === 1000){
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Pending tx from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sat</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount < 0 && tx.amount !== 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Transaction is pending.</p>
//                         <p className="tx-amount">{tx.amount / 1000} sats</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             } 
//             if (tx.amount < 0 && tx.amount === 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Transaction is pending.</p>
//                         <p className="tx-amount">{tx.amount / 1000} sat</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }       
//         }
//         if (tx.pending === false) {    
//             if (tx.amount > 0 && tx.amount !== 1000) {
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Received from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sats</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount > 0 && tx.amount === 1000) {
//                 return (
//                     <div key={tx.checking_id} className="tx-item">
//                         <p>Received from {tx.bolt11.substring(0, 25)}...</p>
//                         <p>+{tx.amount / 1000} sat</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
        
//             if (tx.amount < 0 && tx.amount !== 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
//                         <p className="tx-amount">{tx.amount / 1000} sats</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//             if (tx.amount < 0 && tx.amount === 1000) {
//                 return (
//                     <div id={tx.checking_id} key={tx.checking_id} className="tx-item">
//                         <p>Sent with {tx.bolt11.substring(0, 25)}...</p>
//                         <p className="tx-amount">{tx.amount / 1000} sat</p>
//                         <p>(tx fee: {tx.fee / 1000} sat(s))</p>
//                         <p className="transaction-date">{formattedDate}</p>
//                     </div>
//                 );
//             }
//         }    
//     };
// }
 
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

