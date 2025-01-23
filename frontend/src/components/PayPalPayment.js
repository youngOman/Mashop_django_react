// PayPalPayment.js
import React, { useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

const ButtonWrapper = ({ currency, amount, onSuccess, showSpinner }) => {

  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  const updatedOptions = React.useMemo(() => {
    return {
      ...options,
      currency: currency,
    };
  }, [currency, options]);

  useEffect(() => {
    if (JSON.stringify(options) !== JSON.stringify(updatedOptions)) {
      dispatch({
        type: "resetOptions",
        value: updatedOptions,
      });
    }
  }, [currency, showSpinner, dispatch, updatedOptions, options]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[amount, currency]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              return orderId;
            });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(() => {
            onSuccess();
          });
        }}
      />
    </>
  );
};

const PayPalPayment = ({ amount, onSuccess }) => {
  const currency = "TWD";

  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": "Afy7WAvwiFBbV7ECCDPj842rGP_016i_xz7-CoBIKIlwY1Ss55714aDS4EW8aCYbd2ftDyXuI9yh0R3f",
          components: "buttons",
          currency: currency,
        }}
      >
        <ButtonWrapper
          currency={currency}
          amount={amount}
          onSuccess={onSuccess}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalPayment;
