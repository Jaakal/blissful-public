import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPaymentConfirmed } from '../../actions/payment';

import '../../css/PayPalPayment.css';

const PayPalPayment = ({
  massage: {
    massage: { name },
    bookingInformation: { price },
  },
  payment: { paymentInProcess },
  setPaymentConfirmed,
}) => {
  const paypal = useRef();

  useEffect(() => {
    if (window.paypal && price) {
      window.paypal
        .Buttons({
          style: {
            size: 'responsive',
          },
          fundingSource: window.paypal.FUNDING.PAYPAL,
          createOrder: (data, actions, err) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: name,
                  amount: {
                    currency_code: 'USD',
                    value: price,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            try {
              await actions.order.capture();
              setPaymentConfirmed(true);
            } catch (err) {
              console.log(err);
            }
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
    }
  }, [price, name, setPaymentConfirmed]);

  return (
    <div className={`paypal-button-wrapper${paymentInProcess ? ' paypal-button-disabled' : ''}`}>
      <div className='paypal-button' ref={paypal}></div>
      <div className={paymentInProcess ? 'paypal-button-disabled-cover' : ''}></div>
    </div>
  );
};

PayPalPayment.propTypes = {
  massage: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
  setPaymentConfirmed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  massage: state.massage,
  payment: state.payment,
});

export default connect(mapStateToProps, { setPaymentConfirmed })(PayPalPayment);
