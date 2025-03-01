import React, { useState } from "react";
import Modal from "react-modal";
import {QRCodeSVG} from 'qrcode.react';
import axios from "axios";
import "./PaymentsModal.css";

const customStyles = {
    content: {
        top: "20%",
        left: "40%",
        right: "40%",
        bottom: "auto",
    },
};

const PaymentsModal = ({ modalState, setModalState }) => {
    // The state for the info we will send to either generate a new invoice or pay an invoice
    const [formData, setFormData] = useState({
        amount: 0,
        invoiceToPay: "",
        memo:"",
    });
    // The state for storing the invoice we created to be paid
    const [invoice, setInvoice] = useState("");
    // The state for the invoice we paid
    const [paymentInfo, setPaymentInfo] = useState({
        paymentHash: "",
        checkingId: "",
    });

    
 
    const handleSend = (e) => {
        // Keep the page from refreshing when the form is submitted
        e.preventDefault();
     
        const headers = {
            "X-Api-Key": process.env.REACT_APP_ADMIN_KEY,
        };
        const data = {
            bolt11: formData.invoiceToPay,
            out: true,
        };
        axios
            .post("https://demo.lnbits.com/api/v1/payments", data, { headers })
            .then((res) =>
                setPaymentInfo({
                paymentHash: res.data.payment_hash,
                checkingId: res.data.checking_id,
                })
            )
            .catch((err) => console.log(err));
     
        return;
        };
     
        const handleReceive = (e) => {
            // Keep the page from refreshing when the form is submitted
            e.preventDefault();
         
            const headers = {
                "X-Api-Key": process.env.REACT_APP_ADMIN_KEY,
            };
            const data = {
                
                out: false,
                memo: formData.memo,
            };
            // Only generate the invoice if the amount is > 0
            // LNBits demo server does not support generic invoices with no value
            if (formData.amount > 0) {
                data.amount = parseFloat(formData.amount);
            }
            axios
                .post("https://demo.lnbits.com/api/v1/payments", data, { headers })
                .then((res) => setInvoice(res.data.payment_request))
                .catch((err) => console.log(err));
         
        return;
        };

        const clearForms = () => {
            setModalState({
                type: "",
                open: false,
            });
            setInvoice("");
            setPaymentInfo({
                paymentHash: "",
                checkingId: "",
            });
            setFormData({
                amount: 0,
                invoiceToPay: "",
            });
          };
         
          
    return (
        <Modal
            isOpen={modalState.open}
            style={customStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById("root")}
        >
            <p
            className="close-button"
            onClick={() => {
                clearForms();
            }}     
            >
                [Close]
            </p>
        {/* If it is a send */}
        {modalState.type === "send" && (
            <form>
                <label>Paste an invoice</label>
                <input
                type="text"
                value={formData.invoiceToPay}
                onChange={(e) =>
                    setFormData({ ...formData, invoiceToPay: e.target.value })
                }
                />
                <button className="button" onClick={(e) => handleSend(e)}>
                    Submit
                </button>
            </form>
        )}
        {/* If it is a receive */}
        {modalState.type === "receive" && (
            <form>
                <label>Enter amount</label>
                <input
                type="number"
                min="0"
                value={formData.amount}
                onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                }
                />
            <label>Memo</label>
            <input
                type="text"
                placeholder="Leave a Message"
                value={formData.memo}
                onChange={(e) =>
                    setFormData({ ...formData, memo: e.target.value })
                }
            />
            <button className="button" onClick={(e) => handleReceive(e)}>
                Submit
            </button>
        </form>
        )}
        {/* If we are displaying our newly created invoice */}
        {invoice && (
        <section>
            <h3>Invoice created</h3>
            <div className="invoice_qr" >
                <QRCodeSVG value={invoice} />
            </div>
            <p>Memo: {formData.memo}</p>
            <p>{invoice}</p>
        </section>
        )}
        {/* If we are displaying the status of our successful payment */}
        {paymentInfo.paymentHash && (
        <section>
            <h3>Payment sent</h3>
            <p>Payment hash: {paymentInfo.paymentHash}</p>
            <p>Checking id: {paymentInfo.checkingId}</p>
        </section>
        )}
        </Modal>
    );
};

export default PaymentsModal;
