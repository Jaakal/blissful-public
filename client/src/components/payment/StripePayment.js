import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import {
  getCountryCode,
  resetCountryCode,
  getStripeClientSecret,
  resetStripeClientSecret,
  setPaymentInProcess,
  setPaymentConfirmed,
} from '../../actions/payment';

import '../../css/StripePayment.css';

import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#C4C4C4',
      fontWeight: 400,
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '14px',
      fontSmoothing: 'antialiased',
    },
    invalid: {
      color: '#FC5770',
    },
  },
};

const StripePayment = ({
  massage: {
    bookingInformation: { studioBodyTreatmentId },
  },
  payment: { countryCode, stripeClientSecret, paymentInProcess },
  getCountryCode,
  resetCountryCode,
  getStripeClientSecret,
  resetStripeClientSecret,
  setPaymentInProcess,
  setPaymentConfirmed,
}) => {
  const stripeFormRef = useRef(null)
  const cardNumberRef = useRef(null)
  const cardExpirationRef = useRef(null)
  const cardCvcRef = useRef(null)

  const stripe = useStripe();
  const elements = useElements();

  const [formOpened, setFormOpened] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zip: '',
    formErrors: {},
  });

  const { name, email, address, city, country, zip, formErrors } = formData;

  const setScrollPosition = useCallback(() => {
    if (stripeFormRef.current !== null) {
      gsap.to(window, { duration: 1, scrollTo: { y: document.documentElement.scrollTop + stripeFormRef.current.getBoundingClientRect().top - 10 } })
    } else {
      setTimeout(setScrollPosition, 100);
    }
  }, [])

  const validateEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  };

  const handleFormChange = (event) => {
    if (formErrors[event.target.id]) {
      const temporaryFormErrors = { ...formErrors };
      delete temporaryFormErrors[event.target.id];

      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
        formErrors: temporaryFormErrors,
      });
    } else {
      setFormData({
        ...formData,
        [event.target.id]: event.target.value,
      });
    }
  };

  const formErrorHandler = (event) => {
    let errorMessage;

    if (event.target.value.length === 0) {
      errorMessage = `Can't be blank!`;
    } else if (event.target.id === 'email') {
      if (!validateEmail(event.target.value)) errorMessage = 'Not valid!';
    }

    if (errorMessage) {
      setFormData({
        ...formData,
        formErrors: {
          ...formErrors,
          [event.target.id]: errorMessage,
        },
      });
    } else if (formErrors[event.target.id]) {
      const temporaryFormErrors = { ...formErrors };
      delete temporaryFormErrors[event.target.id];

      setFormData({
        ...formData,
        formErrors: temporaryFormErrors,
      });
    }
  };

  const stripeElementOnChangeHandler = (event) => {
    let element;

    switch (event.elementType) {
      case 'cardNumber':
        element = cardNumberRef.current
        break;
      case 'cardExpiry':
        element = cardExpirationRef.current
        break;
      case 'cardCvc':
        element = cardCvcRef.current
        break;
      default:
        break;
    }

    if (element?.className.split(' ').indexOf('focused') !== -1)
      element.classList.remove('focused');

    if (event.complete) {
      element.classList.remove('incomplete');
    } else if (element.className.split(' ').indexOf('incomplete') === -1) {
      element.classList.add('incomplete');
    }
  };

  const stripeElementOnBlurHandler = (event) => {
    let element;

    switch (event.elementType) {
      case 'cardNumber':
        element = cardNumberRef.current
        break;
      case 'cardExpiry':
        element = cardExpirationRef.current
        break;
      case 'cardCvc':
        element = cardCvcRef.current
        break;
      default:
        break;
    }

    if (element?.className.split(' ').indexOf('focused') === -1)
      element.classList.add('focused');
  };

  const submitPayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !studioBodyTreatmentId) return;

    setPaymentInProcess(true);
    getStripeClientSecret(studioBodyTreatmentId);
    getCountryCode(country);
  };

  useEffect(() => {
    if (formOpened) setScrollPosition();
  }, [formOpened, setScrollPosition]);

  useEffect(() => {
    if (countryCode === 'ERROR') {
      setFormData({
        ...formData,
        formErrors: {
          ...formErrors,
          country: 'Not valid!',
        },
      });

      resetCountryCode();
    } else if (stripeClientSecret && countryCode && Object.keys(formErrors).length === 0) {
      (async () => {
        const billingDetails = {
          name: name,
          email: email,
          address: {
            city: city,
            line1: address,
            country: countryCode,
            postal_code: zip,
          },
        };

        const cardElement = elements.getElement(CardNumberElement);

        try {
          const paymentMethodRequest = await stripe.createPaymentMethod({type: 'card', card: cardElement, billing_details: billingDetails});

          await stripe.confirmCardPayment(stripeClientSecret, {payment_method: paymentMethodRequest.paymentMethod.id});

          resetStripeClientSecret();
          resetCountryCode();
          setPaymentConfirmed(true);
        } catch (err) {
          console.log(err);
        }
      })();
    }

    if (Object.keys(formErrors).length) setPaymentInProcess(false);
  }, [stripeClientSecret, countryCode, address, city, elements, email, formData, formErrors, name, resetCountryCode, resetStripeClientSecret, setPaymentConfirmed, setPaymentInProcess, stripe, zip]);

  return (
    <>
      {!formOpened && (
        <div className={`stripe-button-wrapper`}>
          <button className='stripe-button logo' onClick={() => setFormOpened(true)}>
            <div className='stripe-logo-wrapper'>
              <div className='stripe-logo'></div>
            </div>
          </button>
        </div>
      )}
      {formOpened && (
        <form className='stripe-form' ref={stripeFormRef} onSubmit={submitPayment}>
          <span className='close-sign' onClick={() => setFormOpened(false)}>
            <span></span>
            <span></span>
          </span>

          <div className={`stripe-input-wrapper${formErrors['name'] ? ' input-error' : name.length > 0 ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-name-label floating-label${name.length > 0 ? ' input-exists' : ''}`}>
              Name
              {formErrors['name'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['name']}
                </span>
              )}
            </div>
            <input
              autoComplete='off'
              id='name'
              placeholder='John Doe'
              name='name'
              type='search'
              value={name}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className={`stripe-input-wrapper${formErrors['email'] ? ' input-error' : email.length > 0 && validateEmail(email) ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-email-label floating-label${email.length > 0 ? ' input-exists' : ''}`}>
              Email
              {formErrors['email'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['email']}
                </span>
              )}
            </div>
            <input
              className={formErrors['email'] ? 'input-error-color' : ''}
              autoComplete='off'
              id='email'
              placeholder='john.doe@gmail.com'
              name='email'
              type='search'
              value={email}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className={`stripe-input-wrapper${formErrors['address'] ? ' input-error' : address.length > 0 ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-address-label floating-label${address.length > 0 ? ' input-exists' : ''}`}>
              Address
              {formErrors['address'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['address']}
                </span>
              )}
            </div>
            <input
              autoComplete='off'
              id='address'
              placeholder='2818 E Madison St'
              name='address'
              type='search'
              value={address}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className={`stripe-input-wrapper${formErrors['city'] ? ' input-error' : city.length > 0 ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-city-label floating-label${city.length > 0 ? ' input-exists' : ''}`}>
              City
              {formErrors['city'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['city']}
                </span>
              )}
            </div>
            <input
              autoComplete='off'
              id='city'
              placeholder='Seattle'
              name='city'
              type='search'
              value={city}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className={`stripe-input-wrapper${formErrors['country'] ? ' input-error' : country.length > 0 ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-country-label floating-label${country.length > 0 ? ' input-exists' : ''}`}>
              Country
              {formErrors['country'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['country']}
                </span>
              )}
            </div>
            <input
              autoComplete='off'
              id='country'
              placeholder='USA'
              name='country'
              type='search'
              value={country}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className={`stripe-input-wrapper${formErrors['zip'] ? ' input-error' : zip.length > 0 ? ' complete' : ' empty'}`} onBlur={formErrorHandler}>
            <div className={`billing-zip-label floating-label${zip.length > 0 ? ' input-exists' : ''}`}>
              ZIP
              {formErrors['zip'] && (
                <span className='error-message'>
                  &nbsp;-&nbsp;{formErrors['zip']}
                </span>
              )}
            </div>
            <input
              autoComplete='off'
              id='zip'
              name='zip'
              type='search'
              placeholder='98112'
              value={zip}
              onChange={(e) => handleFormChange(e)}
            />
            <div className='border-bottom'></div>
          </div>

          <div className='stripe-input-wrapper card-number-element incomplete' ref={cardNumberRef}>
            <CardNumberElement
              onChange={stripeElementOnChangeHandler}
              onBlur={stripeElementOnBlurHandler}
              options={CARD_OPTIONS}
              className='number-element stripe-input'
            />
            <div className='card-number-label floating-label'>
              <span>Card number</span>
              <span className='invalid-error-message'>&nbsp;- Not valid!</span>
              <span className='blank-error-message'>
                &nbsp;- Can't be blank!
              </span>
            </div>
            <div className='border-bottom-wrapper'>
              <div className='focus-border'></div>
            </div>
          </div>

          <div className='stripe-input-wrapper card-expiration-element incomplete' ref={cardExpirationRef}>
            <CardExpiryElement
              onChange={stripeElementOnChangeHandler}
              onBlur={stripeElementOnBlurHandler}
              options={CARD_OPTIONS}
              className='stripe-input'
            />
            <div className='card-expiration-label floating-label'>
              <span>Expiration</span>
              <span className='invalid-error-message'>&nbsp;- Not valid!</span>
              <span className='blank-error-message'>
                &nbsp;- Can't be blank!
              </span>
            </div>
            <div className='border-bottom-wrapper'>
              <div className='focus-border'></div>
            </div>
          </div>

          <div className='stripe-input-wrapper card-cvc-element incomplete' ref={cardCvcRef}>
            <CardCvcElement
              onChange={stripeElementOnChangeHandler}
              onBlur={stripeElementOnBlurHandler}
              options={CARD_OPTIONS}
              className='stripe-input'
            />
            <div className='card-cvc-label floating-label'>
              <span>CVC</span>
              <span className='invalid-error-message'>&nbsp;- Not valid!</span>
              <span className='blank-error-message'>
                &nbsp;- Can't be blank!
              </span>
            </div>
            <div className='border-bottom-wrapper'>
              <div className='focus-border'></div>
            </div>
          </div>

          <div className='stripe-pay-button-wrapper'>
            <button className='stripe-button pay'>
              <div className='stripe-logo-wrapper'>
                <div className='stripe-logo'></div>
              </div>
            </button>
            <div className={paymentInProcess ? 'stripe-pay-button-cover disabled' : 'stripe-pay-button-cover'}></div>
          </div>
        </form>
      )}
    </>
  );
};

StripePayment.propTypes = {
  payment: PropTypes.object.isRequired,
  getCountryCode: PropTypes.func.isRequired,
  resetCountryCode: PropTypes.func.isRequired,
  getStripeClientSecret: PropTypes.func.isRequired,
  resetStripeClientSecret: PropTypes.func.isRequired,
  setPaymentInProcess: PropTypes.func.isRequired,
  setPaymentConfirmed: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  massage: state.massage,
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getCountryCode,
  resetCountryCode,
  getStripeClientSecret,
  resetStripeClientSecret,
  setPaymentInProcess,
  setPaymentConfirmed,
})(StripePayment);
