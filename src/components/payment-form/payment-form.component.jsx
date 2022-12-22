import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

import Button from "../button/button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe || !elements) {
      return;
    }

    setIsProcessingPayment(true);
    
    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 })
    }).then((res) => res.json());
    // const {paymentIntent: { client_secret }} = response;
    const clientSecret = response.paymentIntent.client_secret;
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        }
      }
    });

    setIsProcessingPayment(false);

    if(paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if(paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Seccessfull");
      }
    }
  }

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit card payment: </h2>
        <CardElement/>
        <Button type="inverted" disabled={isProcessingPayment}> Pay now</Button>
      </form>
    </div>
  )
}

export default PaymentForm;