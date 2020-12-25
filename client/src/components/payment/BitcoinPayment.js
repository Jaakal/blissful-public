import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import '../../css/BitcoinPayment.css';

const BitcoinPayment = ({
  massage: { bookingInformation: { studioBodyTreatmentId } },
  payment: { paymentInProcess }
}) => {
  return (
    studioBodyTreatmentId &&
    <div className="bitcoin-button-wrapper">
      <form className="bitcoin-button-form" method="POST" action="https://mainnet.demo.btcpayserver.org/apps/36m2vXqqDy2Q5uBZGyVThuSZqV92/pos">
        <input type="hidden" name="email" value="customer@example.com" />
        <input type="hidden" name="orderId" value="CustomOrderId" />
        <input type="hidden" name="notificationUrl" value="https://example.com/callbacks" />
        <input type="hidden" name="redirectUrl" value="https://example.com/thanksyou" />
        <button type="submit" className="bitcoin-button" name="choiceKey" disabled={paymentInProcess} value={`${studioBodyTreatmentId}`}>
          <div className="bitcoin-logo-wrapper">
            <div className="bitcoin-logo"></div>
          </div>
        </button>
      </form>
      <div className={paymentInProcess ? 'bitcoin-button-disabled-cover' : ''}></div>
    </div>
  )
}

BitcoinPayment.propTypes = {
  studioBodyTreatmentId: PropTypes.string,
  massage: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  massage: state.massage,
  payment: state.payment,
});

export default connect(mapStateToProps)(BitcoinPayment)
