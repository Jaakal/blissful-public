import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getMassageBookings,
  setBookingInformation,
  resetBookingInformation,
  bookMassage,
} from '../../actions/massage';

import '../../css/BookingForm.css';

const BookingForm = ({
  getMassageBookings,
  setBookingInformation,
  resetBookingInformation,
  bookMassage,
  massage: { massage, massageBookings, bookingFormData },
  payment: { paymentConfirmed },
}) => {
  let startDate = new Date();
  let endDate = new Date();

  startDate.setDate(new Date().getDate() + 1);
  endDate.setDate(startDate.getDate());
  endDate.setMonth(startDate.getMonth() + 1);

  startDate = startDate.toISOString().split('T')[0];
  endDate = endDate.toISOString().split('T')[0];

  const formDataInitialState = {
    city: 'Choose a City',
    address: 'Choose a Address',
    duration: 'Choose a Duration',
    date: startDate,
    time: 'Choose a Time',
    price: undefined,
    studioId: undefined,
    studioBodyTreatmentId: undefined,
  };

  const [bookingFormHash, setBookingFormHash] = useState(null);
  const [formData, setFormData] = useState(formDataInitialState);

  const {
    city,
    address,
    duration,
    date,
    time,
    price,
    studioId,
    studioBodyTreatmentId,
  } = formData;

  const createBookingFormHash = (bookingFormData) => {
    const bookingFormHash = { city: {} };

    for (let i = 0; i < bookingFormData.length; i += 1) {
      if (bookingFormHash.city[bookingFormData[i].city]) {
        if (
          bookingFormHash.city[bookingFormData[i].city].address[
            bookingFormData[i].address
          ]
        ) {
          const priceHash = {
            price: bookingFormData[i].price,
            studioBodyTreatmentId: bookingFormData[i].id,
          };

          bookingFormHash.city[bookingFormData[i].city].address[
            `${bookingFormData[i].address}`
          ].duration[`${bookingFormData[i].duration}`] = priceHash;
        } else {
          const priceHash = {
            price: bookingFormData[i].price,
            studioBodyTreatmentId: bookingFormData[i].id,
          };
          const durationHash = {
            duration: { studio_id: bookingFormData[i].studio_id },
          };

          durationHash.duration[`${bookingFormData[i].duration}`] = priceHash;
          bookingFormHash.city[bookingFormData[i].city].address[
            `${bookingFormData[i].address}`
          ] = durationHash;
        }
      } else {
        const priceHash = {
          price: bookingFormData[i].price,
          studioBodyTreatmentId: bookingFormData[i].id,
        };
        const durationHash = {
          duration: { studio_id: bookingFormData[i].studio_id },
        };
        const addressHash = { address: {} };

        durationHash.duration[`${bookingFormData[i].duration}`] = priceHash;
        addressHash.address[`${bookingFormData[i].address}`] = durationHash;
        bookingFormHash.city[`${bookingFormData[i].city}`] = addressHash;
      }
    }

    return bookingFormHash;
  };

  const convertStringTimeToMinutes = (time) => {
    if (Number.isInteger(time)) return time;

    let minutes = parseInt(time.split(':')[0], 10) * 60;
    minutes += parseInt(time.split(':')[1], 10);

    return minutes;
  };

  const convertMinutesToStringTime = (minutes) => {
    let hourString = Math.floor(minutes / 60).toString();
    let minuteString = (minutes % 60).toString();

    if (hourString.length < 2) hourString += '0';

    if (minuteString.length < 2) minuteString += '0';

    return `${hourString}:${minuteString}`;
  };

  const findFreeTimeInADay = (temporaryMassageBookings, shopOpen) => {
    const freeTimesArray = [];
    const durationInteger = parseInt(duration, 10);

    if (temporaryMassageBookings.length) {
      if (shopOpen[0] + durationInteger + 15 <= temporaryMassageBookings[0]['start_time']) {
        let startTime = shopOpen[0];

        while (startTime + durationInteger + 15 <= temporaryMassageBookings[0]['start_time']) {
          freeTimesArray.push(startTime);
          startTime += 15;
        }
      }

      for (let i = 0; i < temporaryMassageBookings.length - 1; i += 1) {
        let startTime = temporaryMassageBookings[i]['start_time'] + temporaryMassageBookings[i].duration + 15

        while (startTime + durationInteger <= temporaryMassageBookings[i + 1]['start_time'] - 15) {
          freeTimesArray.push(startTime);
          startTime += 15;
        }
      }

      let startTime = temporaryMassageBookings[temporaryMassageBookings.length - 1]['start_time'] + temporaryMassageBookings[temporaryMassageBookings.length - 1].duration + 15

      while (startTime + durationInteger <= shopOpen[1]) {
        freeTimesArray.push(startTime);
        startTime += 15;
      }
    } else {
      for (let i = shopOpen[0]; i <= shopOpen[1] - durationInteger; i += 15)
        freeTimesArray.push(i);
    }

    return freeTimesArray;
  };

  const createAvailableTimes = () => {
    const temporaryMassageBookings = [...massageBookings];
    const shopOpen = [convertStringTimeToMinutes('10:00'), convertStringTimeToMinutes('20:00')];

    temporaryMassageBookings.map((booking) => convertStringTimeToMinutes(booking['start_time']))
    temporaryMassageBookings.sort((a, b) => a['start_time'] - b['start_time']);

    const freeTimesArray = findFreeTimeInADay(
      temporaryMassageBookings,
      shopOpen
    );

    return freeTimesArray.map((time) => convertMinutesToStringTime(time));
  };

  const handleSelectBoxChange = (event) => {
    switch (event.target.id) {
      case 'choose-a-city':
        setFormData({
          ...formDataInitialState,
          city: event.target.value,
        });
        resetBookingInformation();
        break;
      case 'choose-a-address':
        setFormData({
          ...formDataInitialState,
          city,
          address: event.target.value,
        });
        resetBookingInformation();
        break;
      case 'choose-a-duration':
        const temporaryStudioId = event.target.options[
          event.target.selectedIndex
        ].getAttribute('data-studio-id');
        setFormData({
          ...formData,
          duration: event.target.value,
          price: event.target.options[event.target.selectedIndex].getAttribute(
            'data-price'
          ),
          time: 'Choose a Time',
          studioId: temporaryStudioId,
          studioBodyTreatmentId: event.target.options[
            event.target.selectedIndex
          ].getAttribute('data-studio-body-treatment-id'),
        });
        getMassageBookings(massage.id, temporaryStudioId, date);
        resetBookingInformation();
        break;
      case 'date':
        const temporaryDate = event.target.value;
        setFormData({
          ...formData,
          date: temporaryDate,
          time: 'Choose a Time',
        });
        getMassageBookings(massage.id, studioId, temporaryDate);
        resetBookingInformation();
        break;
      case 'choose-a-time':
        setFormData({
          ...formData,
          time: event.target.value,
        });

        if (event.target.value === 'Choose a Time') {
          resetBookingInformation();
        } else {
          setBookingInformation({
            studioBodyTreatmentId,
            price,
          });
        }

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setBookingFormHash(createBookingFormHash(bookingFormData));
  }, [bookingFormData]);

  useEffect(() => {
    if (paymentConfirmed)
      bookMassage({ studioBodyTreatmentId, date, startTime: time });
  }, [paymentConfirmed, bookMassage, date, studioBodyTreatmentId, time]);

  return (
    bookingFormHash && (
      <div className='booking-form-wrapper'>
        <form className='booking-form'>
          <div className='select-wrapper'>
            {city !== 'Choose a City' && (
              <div className='city-label floating-label'>City</div>
            )}
            <select id='choose-a-city' value={city} onChange={(event) => handleSelectBoxChange(event)}>
              <option>Choose a City</option>
              {Object.keys(bookingFormHash.city).map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className='select-wrapper'>
            {address !== 'Choose a Address' && (
              <div className='address-label floating-label'>Address</div>
            )}
            {city !== 'Choose a City' && <div className='arrow-down' />}
            <select id='choose-a-address' disabled={!(city !== 'Choose a City')} value={address} onChange={(event) => handleSelectBoxChange(event)}>
              <option>Choose a Address</option>
              {city !== 'Choose a City' &&
                Object.keys(
                  bookingFormHash.city[city].address
                ).map((address) => <option key={address}>{address}</option>)}
            </select>
          </div>

          <div className='select-wrapper'>
            {duration !== 'Choose a Duration' && (
              <div className='duration-label floating-label'>Duration</div>
            )}
            {address !== 'Choose a Address' && (
              <div className='arrow-down address-arrow' />
            )}
            <select id='choose-a-duration' disabled={!(address !== 'Choose a Address')} value={duration} onChange={(event) => handleSelectBoxChange(event)}>
              <option>Choose a Duration</option>
              {address !== 'Choose a Address' &&
                Object.keys(
                  bookingFormHash.city[city].address[address].duration
                )
                  .filter((element) => element !== 'studio_id')
                  .map((duration) => (
                    <option key={duration}
                      data-price={bookingFormHash.city[city].address[address].duration[duration].price}
                      data-studio-id={bookingFormHash.city[city].address[address].duration.studio_id}
                      data-studio-body-treatment-id={bookingFormHash.city[city].address[address].duration[duration].studioBodyTreatmentId}
                    >
                      {duration}
                    </option>
                  ))}
            </select>
          </div>

          <div className='date-input-wrapper'>
            {duration !== 'Choose a Duration' && (
              <div className='date-label floating-label'>Date</div>
            )}
            <input
              type='date'
              disabled={!(duration !== 'Choose a Duration')}
              value={date}
              onChange={(event) => handleSelectBoxChange(event)}
              id='date'
              name='date'
              min={startDate}
              max={endDate}
            />
          </div>

          <div className='select-wrapper'>
            {time !== 'Choose a Time' && (
              <div className='time-label floating-label'>Time</div>
            )}
            {duration !== 'Choose a Duration' && (
              <div className='arrow-down address-arrow' />
            )}
            <select id='choose-a-time' disabled={!(duration !== 'Choose a Duration')} value={time} onChange={(event) => handleSelectBoxChange(event)}>
              <option>Choose a Time</option>
              {duration !== 'Choose a Duration' &&
                createAvailableTimes().map((startTime) => (
                  <option key={startTime}>{startTime}</option>
                ))}
            </select>
          </div>

          {time !== 'Choose a Time' && (
            <div className='booking-price'>
              <div className='price-value'>
                <span className='price-label'>Price: </span>
                {price}$
              </div>
            </div>
          )}
        </form>
      </div>
    )
  );
};

BookingForm.propTypes = {
  getMassageBookings: PropTypes.func.isRequired,
  setBookingInformation: PropTypes.func.isRequired,
  resetBookingInformation: PropTypes.func.isRequired,
  bookMassage: PropTypes.func.isRequired,
  massage: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  massage: state.massage,
  payment: state.payment,
});

export default connect(mapStateToProps, {
  getMassageBookings,
  setBookingInformation,
  resetBookingInformation,
  bookMassage,
})(BookingForm);
