import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import { resetBookingInformation } from '../../actions/massage';
import { resetPaymentInformation } from '../../actions/payment';

import '../../css/BookingConfirmation.css';

gsap.registerPlugin(DrawSVGPlugin);

const BookingConfirmation = ({
  resetBookingInformation,
  resetPaymentInformation,
}) => {
  const innerWrapperRef = useRef(null)
  const leftRef = useRef(null)
  const rightWingWrapperRef = useRef(null)
  const butterflyWrapperRef = useRef(null)
  const rightFullImageRef = useRef(null)
  const textRef = useRef(null)

  const bookingConfirmationContainerRef = useRef(null)
  const bookingConfirmationRef = useRef(null)

  const b1P1Ref = useRef(null)
  const b1P2Ref = useRef(null)
  const b1P3Ref = useRef(null)
  
  const l1P1Ref = useRef(null)
  const l1P2Ref = useRef(null)
  
  const i1P1Ref = useRef(null)
  const i1P2Ref = useRef(null)
  
  const s1P1Ref = useRef(null)
  const s1P2Ref = useRef(null)
  
  const s2P1Ref = useRef(null)
  const s2P2Ref = useRef(null)
  
  const f1P1Ref = useRef(null)
  const f1P2Ref = useRef(null)
  
  const u1P1Ref = useRef(null)
  const u1P2Ref = useRef(null)

  const l2P1Ref = useRef(null)
  const l2P2Ref = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline();

    // Butterfly flapping wings
    gsap.set(innerWrapperRef.current, { perspective: 1000 })

    timeline.to(innerWrapperRef.current, { duration: 2, opacity: 1 })
    timeline.to(leftRef.current, { duration: 0.4, rotationY: -40, ease: 'power1.out' }, '>')
    timeline.to(rightWingWrapperRef.current, { duration: 0.4, rotationY: 40, ease: 'power1.out' }, '-=0.4')

    timeline.to(leftRef.current, { duration: 0.3, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.3, rotationY: -25, ease: 'power1.out' }, '-=0.3')

    timeline.to(leftRef.current, { duration: 0.2, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.2, rotationY: 40, ease: 'power1.out' }, '-=0.2')

    timeline.to(leftRef.current, { duration: 0.15, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.15, rotationY: -25, ease: 'power1.out' }, '-=0.15')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 25, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -25, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: -40, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: 40, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 0.1, rotationY: 35, ease: 'power1.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 0.1, rotationY: -35, ease: 'power1.out' }, '-=0.1')

    timeline.to(leftRef.current, { duration: 2, rotationY: 0, ease: 'power4.out' }, '+=0')
    timeline.to(rightWingWrapperRef.current, { duration: 2, rotationY: 0, ease: 'power4.out' }, '-=2')

    // Fading and moving the butterfly
    timeline.to(rightFullImageRef.current, { duration: 1, opacity: 0, ease: 'power4.out' }, '-=2')
    timeline.to(butterflyWrapperRef.current, { duration: 1, translateX: butterflyWrapperRef.current.offsetWidth / 2 - butterflyWrapperRef.current.offsetLeft }, '-=2')

    // Making text container visible
    timeline.to(textRef.current, { duration: 0, opacity: 1 }, '-=1.1');

    // Blissful text letter animations
    const strokeDashDuration = 0.001;

    const b1_p1_strokeDashCount = 237;
    const b1_p2_strokeDashCount = 464;
    const b1_p3_strokeDashCount = 241;

    timeline.from(b1P1Ref.current, { duration: b1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(b1P2Ref.current, { duration: b1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, `>`)
    timeline.from(b1P3Ref.current, { duration: b1_p3_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, `>`)

    const l1_p1_strokeDashCount = 164;
    const l1_p2_strokeDashCount = 268;

    timeline.from(l1P1Ref.current, { duration: l1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(l1P2Ref.current, { duration: l1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const i1_p1_strokeDashCount = 155;
    const i1_p2_strokeDashCount = 30;

    timeline.from(i1P1Ref.current, { duration: i1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(i1P2Ref.current, { duration: i1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const s1_p1_strokeDashCount = 97;
    const s1_p2_strokeDashCount = 153;

    timeline.from(s1P1Ref.current, { duration: s1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(s1P2Ref.current, { duration: s1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const s2_p1_strokeDashCount = 97;
    const s2_p2_strokeDashCount = 153;

    timeline.from(s2P1Ref.current, { duration: s2_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(s2P2Ref.current, { duration: s2_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const f1_p1_strokeDashCount = 408;
    const f1_p2_strokeDashCount = 96;

    timeline.from(f1P1Ref.current, { duration: f1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(f1P2Ref.current, { duration: f1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const u1_p1_strokeDashCount = 130;
    const u1_p2_strokeDashCount = 141;

    timeline.from(u1P1Ref.current, { duration: u1_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(u1P2Ref.current, { duration: u1_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    const l2_p1_strokeDashCount = 164;
    const l2_p2_strokeDashCount = 268;

    timeline.from(l2P1Ref.current, { duration: l2_p1_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')
    timeline.from(l2P2Ref.current, { duration: l2_p2_strokeDashCount * strokeDashDuration, drawSVG: '0% 0%' }, '>')

    // Booking confirmation note
    timeline.to(bookingConfirmationRef.current, { duration: 0.4, opacity: 1 }, '>');

    // Fade the whole confirmation away
    timeline.to(bookingConfirmationContainerRef.current, { duration: 0.8, opacity: 0, onComplete: () => {
      resetBookingInformation()
      resetPaymentInformation()
    } }, '+=1')
  }, [resetBookingInformation, resetPaymentInformation]);

  return (
    <div className='booking-confirmation-container' ref={bookingConfirmationContainerRef}>
      <div className='outer-wrapper'>
        <div className='inner-wrapper' ref={innerWrapperRef}>
          <div className='butterfly-wrapper' ref={butterflyWrapperRef}>
            <div className='left' ref={leftRef}></div>
            <div className='right-wing-wrapper' ref={rightWingWrapperRef}>
              <div className='right-full-image' ref={rightFullImageRef}></div>
              <div className='right-masked-image'></div>
            </div>
          </div>
          <div className='text' ref={textRef}>
            <svg id='Layer_1' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 786.013 302.609'>
              <defs>
                <clipPath id='clip-path' transform='translate(5.102 7.858)'>
                  <path
                    id='b1-p1-clip'
                    d='M31.2,161.133q-.147-4.979-.22-9.668t-.073-9.375v-4.4q0-6.151.147-15.088t.8-18.969q.66-10.032,2.051-20.362a133.629,133.629,0,0,1,4.028-19.409,76.075,76.075,0,0,1,6.592-16.113,26.651,26.651,0,0,1,9.815-10.4,37.111,37.111,0,0,1,4.834-2.417,14.306,14.306,0,0,1,5.566-1.1q4.539,0,4.541,4.1a8.144,8.144,0,0,1-.366,2.564q-.368,1.1-.806,2.27-2.492,5.862-5.2,11.5a72.469,72.469,0,0,0-4.468,11.939A300.8,300.8,0,0,0,51.2,100.562q-2.712,17.8-3.882,36.547l-.293,4.541q-.294,5.274-.439,10.547t-.293,10.547l-.146,3.955q-.3,23.148.659,45.484t2.417,42.407l-2.783.879a170.593,170.593,0,0,1-6.3-20.655q-2.637-10.986-4.4-22.558t-2.856-23.364q-1.1-11.791-1.538-23.218Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-2' transform='translate(5.102 7.858)'>
                  <path
                    id='b1-p2-clip'
                    d='M98,157.445a141.128,141.128,0,0,1-25.781,7.471c-8.789,1.662-17.482,2.983-26.074,2.783-3.707-.086-11.113-.593-14.8-1.025a40.81,40.81,0,0,1-7.1-1.685,29.721,29.721,0,0,1-6.445-2.783,15.494,15.494,0,0,1-4.614-4.028,9.242,9.242,0,0,1-1.758-5.713,9.526,9.526,0,0,1,1.684-5.713,14.92,14.92,0,0,1,4.468-4.028,24.481,24.481,0,0,1,6.3-2.637,39.134,39.134,0,0,1,7.031-1.392c2.02-.162,5.1-.4,8.136-.5l.978,4.524c-3.361.079-6.868.214-9.114.371a27.54,27.54,0,0,0-5.127.952,25.206,25.206,0,0,0-4.468,1.611,9.675,9.675,0,0,0-3.222,2.417,5.053,5.053,0,0,0-1.245,3.369,6.35,6.35,0,0,0,1.245,3.882,12.681,12.681,0,0,0,3.222,3,21.879,21.879,0,0,0,4.541,2.271,27.85,27.85,0,0,0,5.347,1.538c3.747.591,11.3,1.433,15.088,1.611,7.609.357,15.161-1.073,22.632-2.93a100.239,100.239,0,0,0,21.313-7.91l7.325-4.1a97.223,97.223,0,0,0,16.919-12.891,80.82,80.82,0,0,0,13.183-16.26,78.683,78.683,0,0,0,8.5-19.189,69.745,69.745,0,0,0,2.71-21.533q0-16.844-5.786-30.176A69.021,69.021,0,0,0,117.7,26.2,68.339,68.339,0,0,0,70.459,7.152a58.132,58.132,0,0,0-18.9,3.369A65.09,65.09,0,0,0,33.691,19.9,51.437,51.437,0,0,0,20.435,34.4a35.219,35.219,0,0,0-5.2,18.75,25.2,25.2,0,0,0,.953,7.178,57.587,57.587,0,0,0,2.05,5.86q1.1,2.635,2.051,4.907a11.515,11.515,0,0,1,.952,4.468,9.642,9.642,0,0,1-2.856,7.1,9.473,9.473,0,0,1-6.958,2.856,8.447,8.447,0,0,1-6.006-2.05,14.119,14.119,0,0,1-3.442-5.127A23.953,23.953,0,0,1,.366,71.825,57.978,57.978,0,0,1,0,65.746,45.683,45.683,0,0,1,6.079,42.382,70.19,70.19,0,0,1,21.973,23.705a115.329,115.329,0,0,1,12.378-9.3A78.7,78.7,0,0,1,47.168,7.665a72.187,72.187,0,0,1,13.843-4.1A82.077,82.077,0,0,1,76.465,2.172q19.774,0,35.6,5.786a79.954,79.954,0,0,1,26.806,15.82,69.821,69.821,0,0,1,16.919,23.365,69.1,69.1,0,0,1,5.933,28.418,75.346,75.346,0,0,1-4.248,25.708A81.694,81.694,0,0,1,145.9,122.8a89.492,89.492,0,0,1-17.285,17.358,123.378,123.378,0,0,1-21.533,13.184Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-3' transform='translate(5.102 7.858)'>
                  <path
                    id='b1-p3-clip'
                    d='M90.234,152.783a90.669,90.669,0,0,0-21.02-7.251,112.99,112.99,0,0,0-22.193-3c-1.794-.023-4.388.006-7.069.07l-.21-4.453c2.861-.091,5.662-.147,7.572-.158a123.675,123.675,0,0,1,24.9,2.93,135.79,135.79,0,0,1,25.342,7.764l9.521,4.541a91.55,91.55,0,0,1,13.843,9.3,61.3,61.3,0,0,1,11.059,11.719,54.211,54.211,0,0,1,7.325,14.282,52.1,52.1,0,0,1,2.636,16.846,45.665,45.665,0,0,1-3.955,18.823A52.545,52.545,0,0,1,127.3,239.868a50.965,50.965,0,0,1-15.6,10.767,45.338,45.338,0,0,1-18.676,3.955,37.609,37.609,0,0,1-12.012-2.124,58.579,58.579,0,0,1-12.012-5.64,65.674,65.674,0,0,1-10.547-8.056,44.976,44.976,0,0,1-7.763-9.375l2.05-1.758A62.831,62.831,0,0,0,69.8,237.817,51.013,51.013,0,0,0,89.062,241.7a31.994,31.994,0,0,0,13.4-5.273A39.242,39.242,0,0,0,112.5,226.392a45.94,45.94,0,0,0,6.226-13.038,49.694,49.694,0,0,0,2.124-14.282q0-14.5-6.372-24.756A55.308,55.308,0,0,0,98,157.324Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-4' transform='translate(5.102 7.858)'>
                  <path
                    id='l1-p1-clip'
                    d='M221.484,0q7.762,0,12.6,4.541A32.129,32.129,0,0,1,241.7,15.747a54.491,54.491,0,0,1,3.736,14.136,106.984,106.984,0,0,1,.952,13.33,130.79,130.79,0,0,1-3.736,31.128A146.375,146.375,0,0,1,232.4,103.2a129.843,129.843,0,0,1-15.307,24.61,100.813,100.813,0,0,1-18.9,18.53l-1.025-5.42a95.554,95.554,0,0,0,16.7-19.482,111.07,111.07,0,0,0,11.279-23.072,135.676,135.676,0,0,0,6.373-26.074A199.276,199.276,0,0,0,233.5,43.8q0-1.9-.073-4.981t-.513-6.591a71.089,71.089,0,0,0-1.245-7.032,29.727,29.727,0,0,0-2.2-6.372,14.474,14.474,0,0,0-3.516-4.687,7.492,7.492,0,0,0-5.054-1.831Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-5' transform='translate(5.102 7.858)'>
                  <path
                    id='l1-p2-clip'
                    d='M198.9,145.813q-.35.266-.7.525,2.05,9.816,4.908,19.116a82.972,82.972,0,0,0,6.958,16.553,41.907,41.907,0,0,0,9.448,11.719,18.528,18.528,0,0,0,12.231,4.467A23.946,23.946,0,0,0,243.6,195.41a31.249,31.249,0,0,0,9.228-8.2l1.318.586A37.706,37.706,0,0,1,240.967,203.1a34.184,34.184,0,0,1-19.336,5.639,25.472,25.472,0,0,1-15.967-5.42,51.3,51.3,0,0,1-12.378-14.209,98.914,98.914,0,0,1-9.082-19.848,198.642,198.642,0,0,1-6.152-22.486,212,212,0,0,1-3.516-22.046,183.173,183.173,0,0,1-1.1-18.53q0-9.667,1.025-21.24A218.479,218.479,0,0,1,177.832,61.6a185.835,185.835,0,0,1,6.079-22.925,92.894,92.894,0,0,1,9.082-19.7A49.291,49.291,0,0,1,205.371,5.2,26.4,26.4,0,0,1,221.484,0q.285,0,.564.006l-.564,12.318c-.192-.013-.388-.019-.586-.019q-5.568,0-9.741,5.493a51.29,51.29,0,0,0-7.178,13.989A130.527,130.527,0,0,0,199,50.537q-1.977,10.256-3.149,19.7t-1.612,16.919q-.44,7.471-.439,10.254-.149,3.225-.073,7.91t.439,10.327q.364,5.641,1.1,12.085t1.9,13.184q.285-.256.569-.514Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-6' transform='translate(5.102 7.858)'>
                  <path
                    id='i1-p1-clip'
                    d='M327.539,182.959a53.637,53.637,0,0,1-7.983,10.181,57.234,57.234,0,0,1-10.108,8.056,48.939,48.939,0,0,1-11.719,5.347,43.624,43.624,0,0,1-12.817,1.9,36.115,36.115,0,0,1-14.575-2.783,29.992,29.992,0,0,1-10.693-7.69,33.7,33.7,0,0,1-6.592-11.573,44.9,44.9,0,0,1-2.271-14.575,51.516,51.516,0,0,1,2.49-16.113,59.377,59.377,0,0,1,6.885-14.282A68.347,68.347,0,0,1,270.483,129.2a91.74,91.74,0,0,1,12.671-9.961l1.758,1.319A74.021,74.021,0,0,0,273.267,139.6a55.748,55.748,0,0,0-4.468,21.972,51.478,51.478,0,0,0,1.538,12.671,32.275,32.275,0,0,0,4.834,10.767,24.273,24.273,0,0,0,8.423,7.47,25.756,25.756,0,0,0,12.451,2.784,38.463,38.463,0,0,0,16.479-3.662,58.737,58.737,0,0,0,14.136-9.229Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-7' transform='translate(5.102 7.858)'>
                  <path
                    id='i1-p2-clip'
                    d='M286.523,85.693a14.165,14.165,0,0,1-1.318,5.86,18.927,18.927,0,0,1-3.442,5.2,18.391,18.391,0,0,1-4.908,3.735,12.113,12.113,0,0,1-5.712,1.465,7.817,7.817,0,0,1-6.08-2.49,8.98,8.98,0,0,1-2.27-6.3,13.686,13.686,0,0,1,1.318-5.786,18.246,18.246,0,0,1,8.277-8.643,12.2,12.2,0,0,1,5.639-1.391,8.327,8.327,0,0,1,6.153,2.344A8.138,8.138,0,0,1,286.523,85.693Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-8' transform='translate(5.102 7.858)'>
                  <path
                    id='s1-p1-clip'
                    d='M350.977,129.785a69.039,69.039,0,0,1-2.93,18.164,97.221,97.221,0,0,1-7.544,18.457,110.393,110.393,0,0,1-10.913,16.7,74.774,74.774,0,0,1-13.037,13.038l-1.172-2.051a47.532,47.532,0,0,0,8.2-12.451,97.557,97.557,0,0,0,5.786-15.747,123.888,123.888,0,0,0,3.369-16.626,117.492,117.492,0,0,0,1.1-15.235,35.134,35.134,0,0,0-.733-7.178,33.634,33.634,0,0,1-.732-6.884,8.083,8.083,0,0,1,2.417-6.3,8.894,8.894,0,0,1,6.226-2.2,7.627,7.627,0,0,1,4.687,1.318,14.681,14.681,0,0,1,3.223,3.442,53.35,53.35,0,0,1,2.929,4.834Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-9' transform='translate(5.102 7.858)'>
                  <path
                    id='s1-p2-clip'
                    d='M350.984,119.512q.436.753.871,1.557a38.081,38.081,0,0,0,3.736,5.567A34.357,34.357,0,0,0,361.3,132.2a33.274,33.274,0,0,0,8.862,4.761,108.355,108.355,0,0,1,12.085,5.347,47.451,47.451,0,0,1,10.254,7.1,29.713,29.713,0,0,1,9.741,23,37.251,37.251,0,0,1-2.783,14.356,35.6,35.6,0,0,1-7.764,11.718,37.866,37.866,0,0,1-11.645,7.911,35.484,35.484,0,0,1-14.429,2.929,33.313,33.313,0,0,1-19.263-6.225,31.881,31.881,0,0,1-7.251-7.251,27.516,27.516,0,0,1-4.394-9.375l3.369-.879a34.331,34.331,0,0,0,8.862,7.763,22.849,22.849,0,0,0,21.533.733,25.74,25.74,0,0,0,7.911-6.153,27.976,27.976,0,0,0,5.127-8.862,30.138,30.138,0,0,0,1.831-10.327,27.125,27.125,0,0,0-1.758-10.474,21.731,21.731,0,0,0-4.614-7.031,33.461,33.461,0,0,0-6.373-4.98q-3.514-2.123-7.1-4.322a55.653,55.653,0,0,1-6.885-4.98,24.03,24.03,0,0,1-5.639-7.178l-.933-.59Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-10' transform='translate(5.102 7.858)'>
                  <path
                    id='s2-p1-clip'
                    d='M444.727,129.785a69.039,69.039,0,0,1-2.93,18.164,97.221,97.221,0,0,1-7.544,18.457,110.393,110.393,0,0,1-10.913,16.7A74.774,74.774,0,0,1,410.3,196.143l-1.172-2.051a47.532,47.532,0,0,0,8.2-12.451,97.557,97.557,0,0,0,5.786-15.747,123.888,123.888,0,0,0,3.369-16.626,117.492,117.492,0,0,0,1.1-15.235,35.134,35.134,0,0,0-.733-7.178,33.634,33.634,0,0,1-.732-6.884,8.083,8.083,0,0,1,2.417-6.3,8.894,8.894,0,0,1,6.226-2.2,7.627,7.627,0,0,1,4.687,1.318,14.681,14.681,0,0,1,3.223,3.442,53.35,53.35,0,0,1,2.929,4.834Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-11' transform='translate(5.102 7.858)'>
                  <path
                    id='s2-p2-clip'
                    d='M444.734,119.512q.436.753.871,1.557a38.081,38.081,0,0,0,3.736,5.567,34.357,34.357,0,0,0,5.713,5.566,33.274,33.274,0,0,0,8.862,4.761A108.355,108.355,0,0,1,476,142.31a47.451,47.451,0,0,1,10.254,7.1,29.713,29.713,0,0,1,9.741,23,37.251,37.251,0,0,1-2.783,14.356,35.6,35.6,0,0,1-7.764,11.718A37.866,37.866,0,0,1,473.8,206.4a35.484,35.484,0,0,1-14.429,2.929,33.313,33.313,0,0,1-19.263-6.225,31.881,31.881,0,0,1-7.251-7.251,27.5,27.5,0,0,1-4.394-9.375l3.369-.879a34.331,34.331,0,0,0,8.862,7.763,22.849,22.849,0,0,0,21.533.733,25.725,25.725,0,0,0,7.911-6.153,27.976,27.976,0,0,0,5.127-8.862A30.138,30.138,0,0,0,477.1,168.75a27.125,27.125,0,0,0-1.758-10.474,21.717,21.717,0,0,0-4.615-7.031,33.423,33.423,0,0,0-6.372-4.98q-3.514-2.123-7.1-4.322a55.653,55.653,0,0,1-6.885-4.98,24.03,24.03,0,0,1-5.639-7.178l-.933-.59Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-12' transform='translate(5.102 7.858)'>
                  <path
                    id='f1-p1-clip'
                    d='M544.043,135.352q.144,19.335-.147,38.671t-1.831,38.6q-1.538,19.261-4.687,38.159a273.4,273.4,0,0,1-8.862,37.061h-3.662V119.678q0-10.4.512-22.925a219.8,219.8,0,0,1,2.49-25.122,162.082,162.082,0,0,1,5.787-24.463,73.624,73.624,0,0,1,10.473-21.021,51.231,51.231,0,0,1,16.626-14.721q9.96-5.565,24.17-5.567A31.148,31.148,0,0,1,598.1,8.5a26.623,26.623,0,0,1,9.521,7.251,31.145,31.145,0,0,1,5.713,10.84,45.144,45.144,0,0,1,1.9,13.257,41.769,41.769,0,0,1-2.783,14.941,62.226,62.226,0,0,1-7.324,13.77,70.46,70.46,0,0,1-10.474,11.792,73.405,73.405,0,0,1-12.231,9.009l-1.465-3.37a40.84,40.84,0,0,0,7.4-8.862,56.313,56.313,0,0,0,5.2-10.767,65.056,65.056,0,0,0,3-11.645,73.629,73.629,0,0,0,.952-11.646,47.291,47.291,0,0,0-1.172-10.253,33.843,33.843,0,0,0-3.662-9.6,20.738,20.738,0,0,0-6.592-7.031,17.678,17.678,0,0,0-9.961-2.71,21.6,21.6,0,0,0-13.989,4.541,34.694,34.694,0,0,0-9.229,11.718A66.863,66.863,0,0,0,547.412,46a155.16,155.16,0,0,0-2.71,18.091Q543.9,73.1,543.823,81.3t-.073,13.769v13.184q0,6.593.146,13.184Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-13' transform='translate(5.102 7.858)'>
                  <path
                    id='f1-p2-clip'
                    d='M543.9,121.436q10.109,0,20.875-.806a94.483,94.483,0,0,0,20.434-3.735l1.465,2.05a33.175,33.175,0,0,1-7.178,4.615,103.453,103.453,0,0,1-10.254,4.394q-5.712,2.126-12.231,4.028t-12.964,3.37l-19.189,3.662q-3.665.587-6.739.8t-5.42.22a41.907,41.907,0,0,1-5.639-.366,12.8,12.8,0,0,1-4.834-1.611,9.674,9.674,0,0,1-3.443-3.443,11.651,11.651,0,0,1-1.318-6.006,8.948,8.948,0,0,1,2.93-7.1,10.514,10.514,0,0,1,7.177-2.564q4.247,0,8.57.367t8.716.805l1.19.078Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-14' transform='translate(5.102 7.858)'>
                  <path
                    id='u1-p1-clip'
                    d='M637.793,193.066a54.581,54.581,0,0,1-12.6,9.449,31.429,31.429,0,0,1-15.234,3.735,30.923,30.923,0,0,1-13.257-2.71,26.749,26.749,0,0,1-9.595-7.4,33,33,0,0,1-5.786-10.84,42.851,42.851,0,0,1-1.977-13.184,54.984,54.984,0,0,1,2.2-15.454A64.35,64.35,0,0,1,587.7,142.31a71.456,71.456,0,0,1,9.375-12.671,78.471,78.471,0,0,1,11.719-10.4l1.758,1.319a77.905,77.905,0,0,0-9.815,19.409,65.84,65.84,0,0,0-3.662,21.606,52.152,52.152,0,0,0,1.026,9.961,36.283,36.283,0,0,0,3.369,9.815,22.313,22.313,0,0,0,6.225,7.544,15.435,15.435,0,0,0,9.742,3,27.142,27.142,0,0,0,9.521-1.685,39.871,39.871,0,0,0,8.789-4.614Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-15' transform='translate(5.102 7.858)'>
                  <path
                    id='u1-p2-clip'
                    d='M634.544,186.7l1.2-1.1q-.3-1.758-.439-3.443t-.147-3.442a62.985,62.985,0,0,1,2.051-15.234,115.936,115.936,0,0,1,5.42-16.333,127.466,127.466,0,0,1,7.69-15.528,85.336,85.336,0,0,1,8.863-12.671l1.758,1.319a218.483,218.483,0,0,0-5.567,23.291,131.669,131.669,0,0,0-2.2,23.73,76.5,76.5,0,0,0,.659,10.181,25.063,25.063,0,0,0,2.783,8.789,15.912,15.912,0,0,0,5.933,6.152q3.807,2.272,10.107,2.271a25.73,25.73,0,0,0,13.184-3.589,45.954,45.954,0,0,0,10.84-8.716l.879.586a41.976,41.976,0,0,1-6.739,9.814A58.2,58.2,0,0,1,681.3,201.2a48.961,48.961,0,0,1-11.133,5.933,32.8,32.8,0,0,1-11.572,2.2,18.672,18.672,0,0,1-13.111-4.761,28.924,28.924,0,0,1-7.69-11.5q-.452.451-.91.891Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-16' transform='translate(5.102 7.858)'>
                  <path
                    id='l2-p1-clip'
                    d='M735.351,0q7.762,0,12.6,4.541a32.129,32.129,0,0,1,7.617,11.206A54.491,54.491,0,0,1,759.3,29.883a106.984,106.984,0,0,1,.952,13.33,130.79,130.79,0,0,1-3.736,31.128A146.375,146.375,0,0,1,746.264,103.2a129.843,129.843,0,0,1-15.307,24.61,100.813,100.813,0,0,1-18.9,18.53l-1.025-5.42a95.554,95.554,0,0,0,16.7-19.482,111.07,111.07,0,0,0,11.279-23.072,135.676,135.676,0,0,0,6.373-26.074A199.276,199.276,0,0,0,747.363,43.8q0-1.9-.073-4.981t-.513-6.591a71.089,71.089,0,0,0-1.245-7.032,29.727,29.727,0,0,0-2.2-6.372,14.474,14.474,0,0,0-3.516-4.687,7.492,7.492,0,0,0-5.054-1.831Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
                <clipPath id='clip-path-17' transform='translate(5.102 7.858)'>
                  <path
                    id='l2-p2-clip'
                    d='M712.762,145.813q-.349.266-.7.525,2.051,9.816,4.908,19.116a82.972,82.972,0,0,0,6.958,16.553,41.907,41.907,0,0,0,9.448,11.719,18.528,18.528,0,0,0,12.231,4.467,23.946,23.946,0,0,0,11.866-2.783,31.249,31.249,0,0,0,9.228-8.2l1.318.586A37.706,37.706,0,0,1,754.834,203.1,34.184,34.184,0,0,1,735.5,208.74a25.472,25.472,0,0,1-15.967-5.42,51.3,51.3,0,0,1-12.378-14.209,98.914,98.914,0,0,1-9.082-19.848,198.642,198.642,0,0,1-6.152-22.486,212,212,0,0,1-3.516-22.046,183.173,183.173,0,0,1-1.1-18.53q0-9.667,1.025-21.24A218.479,218.479,0,0,1,691.7,61.6a185.835,185.835,0,0,1,6.079-22.925,92.894,92.894,0,0,1,9.082-19.7A49.291,49.291,0,0,1,719.238,5.2,26.4,26.4,0,0,1,735.351,0q.285,0,.564.006l-.564,12.318c-.192-.013-.388-.019-.586-.019q-5.568,0-9.741,5.493a51.29,51.29,0,0,0-7.178,13.989,130.527,130.527,0,0,0-4.98,18.75q-1.977,10.256-3.149,19.7t-1.612,16.919q-.439,7.471-.439,10.254-.149,3.225-.073,7.91t.439,10.327q.364,5.641,1.1,12.085t1.9,13.184q.285-.256.569-.514Z'
                    style={{ fill: 'none' }}
                  />
                </clipPath>
              </defs>
              <g id='b1'>
                <g id='b1-p1'>
                  <g style={{ clipPath: 'url(#clip-path)' }}>
                    <path
                      id='b1-p1-stroke'
                      className='animate-b1-p1'
                      ref={b1P1Ref}
                      d='M69.044,26.2c0,7.421-12.848,18.283-16,25-2.452,5.226-5.632,16.393-7,22-1.744,7.147-4.137,21.694-5,29-.911,7.713-1.75,23.238-2,31-.29,9-.243,27,0,36,.25,9.26,1.273,27.765,2,37,.572,7.267,1.88,21.8,3,29,.942,6.056,5,24,5,24'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
                <g id='b1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-2)' }}>
                    <path
                      id='b1-p2-stroke'
                      className='animate-b1-p2'
                      ref={b1P2Ref}
                      d='M16.044,88.2c0-6.324-7.316-17.712-8-24-.517-4.748.378-14.507,2-19,1.836-5.087,8.34-14.018,12-18,3.217-3.5,10.84-9.336,14.879-11.844,4.36-2.708,13.613-7.445,18.583-8.728C60.731,5.274,71.651,5.008,77.044,5.2c5.548.193,16.664,1.471,22,3a100.21,100.21,0,0,1,20,9,98.857,98.857,0,0,1,17,15,84.258,84.258,0,0,1,10,17c1.689,4.289,3.321,13.441,4,18a88.731,88.731,0,0,1,1,13,93.383,93.383,0,0,1-3,17,112.523,112.523,0,0,1-8,18,132.359,132.359,0,0,1-12,16c-3.2,3.55-10.11,10.228-14,13-3.461,2.467-11.181,6.136-15,8-4.425,2.16-13.344,6.4-18,8a153.886,153.886,0,0,1-16,4c-3.716.71-11.218,2.073-15,2-7.356-.14-22.468-1.615-29-5a18.85,18.85,0,0,1-6-6,11.808,11.808,0,0,1-1-6,10.379,10.379,0,0,1,3-4c2.144-1.682,7.388-3.589,10.024-4.277,3.887-1.015,15.976-1.723,15.976-1.723'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '26px' }}
                    />
                  </g>
                </g>
                <g id='b1-p3'>
                  <g style={{ clipPath: 'url(#clip-path-3)' }}>
                    <path
                      id='b1-p3-stroke'
                      className='animate-b1-p3'
                      ref={b1P3Ref}
                      d='M36.044,140.2s12.759-.281,17,0a141.437,141.437,0,0,1,15,2,173.969,173.969,0,0,1,17,5,124.029,124.029,0,0,1,14,6c4.541,2.539,13.247,8.4,17,12,2.958,2.84,8.167,9.332,10,13,2.087,4.178,4.369,13.373,5,18,.641,4.707,1.232,14.413,0,19-1.424,5.3-7.3,14.949-11,19-3.51,3.84-12.142,10.139-17,12-4,1.531-12.752,2.516-17,2s-12.177-4.093-16-6a94.7,94.7,0,0,1-11-7c-2.4-1.814-9-4.989-9-8'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '26px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='l1'>
                <g id='l1-p1'>
                  <g style={{ clipPath: 'url(#clip-path-4)' }}>
                    <path
                      id='l1-p1-stroke'
                      className='animate-l1-p1'
                      ref={l1P1Ref}
                      d='M194.044,144.2a20.176,20.176,0,0,0,5-2,20.9,20.9,0,0,0,5-4,144.621,144.621,0,0,0,11-13c2.168-2.881,6.135-8.914,8-12a118.553,118.553,0,0,0,6-11c1.952-4.583,4.645-14.206,6-19,1.121-3.967,3.258-11.944,4-16,.77-4.209,1.75-12.728,2-17a101.06,101.06,0,0,0,0-13,76.992,76.992,0,0,0-3-13c-1.135-3.156-3.936-9.356-6-12-1.419-1.816-4.838-5.2-7-6-1.641-.607-7,0-7,0h0'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '17px' }}
                    />
                  </g>
                </g>
                <g id='l1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-5)' }}>
                    <path
                      id='l1-p2-stroke'
                      className='animate-l1-p2'
                      ref={l1P2Ref}
                      d='M227.044,6.2s-8.338-.689-11,0a27.394,27.394,0,0,0-9,5c-3.806,3.651-8.777,13.218-11,18-2.333,5.019-5.627,15.639-7,21-1.387,5.416-3.276,16.457-4,22-.812,6.218-1.973,18.73-2,25a251.163,251.163,0,0,0,2,28c1,6.842,4.377,20.279,6,27,1.395,5.777,3.722,17.512,6,23a90.819,90.819,0,0,0,10,17c2.127,2.605,6.961,7.559,10,9,2.971,1.409,9.715,2.152,13,2a30,30,0,0,0,8-2,42.94,42.94,0,0,0,6-4,57.647,57.647,0,0,0,6-5c1.463-1.576,5-4.849,5-7'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '24px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='i1'>
                <g id='i1-p1'>
                  <g style={{ clipPath: 'url(#clip-path-6)' }}>
                    <path
                      id='i1-p1-stroke'
                      className='animate-i1-p1'
                      ref={i1P1Ref}
                      d='M287.044,116.2s-8.352,8.91-11,12c-2.083,2.432-6.374,7.242-8,10a94.436,94.436,0,0,0-7,17,60.064,60.064,0,0,0-2,13c.086,3.824,1.337,11.556,3,15,1.851,3.834,7.519,10.549,11,13s11.74,5.685,16,6c3.57.264,10.576-1.956,14-3a58.03,58.03,0,0,0,10-4c2.467-1.494,1.8-1.843,7-6,2.06-1.645,3.669-2.82,6-5,1.309-1.224,2.333-2.286,3-3'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '23px' }}
                    />
                  </g>
                </g>
                <g id='i1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-7)' }}>
                    <line
                      id='i1-p2-stroke'
                      className='animate-i1-p2'
                      ref={i1P2Ref}
                      x1='263.146'
                      y1='97.053'
                      x2='296.146'
                      y2='97.053'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '26px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='s1'>
                <g id='s1-p1'>
                  <g style={{ clipPath: 'url(#clip-path-8)' }}>
                    <path
                      id='s1-p1-stroke'
                      className='animate-s1-p1'
                      ref={s1P1Ref}
                      d='M314.044,196.2s6.3-4.961,8-7c1.87-2.237,4.558-7.466,6-10,1.825-3.208,5.536-9.611,7-13,1.254-2.9,3.084-8.973,4-12,.826-2.728,2.5-8.193,3-11,.523-2.964.875-8.992,1-12,.048-1.149.034-1.081.016-2.282-.023-1.549.129-5.029-.016-7.718-.142-2.615-.226-4.17-1-6a12.351,12.351,0,0,0-4-5l-3-3'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
                <g id='s1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-9)' }}>
                    <path
                      id='s1-p2-stroke'
                      className='animate-s1-p2'
                      ref={s1P2Ref}
                      d='M348.044,123.2s6.629,6.878,9,9a95.408,95.408,0,0,0,10,8c2.574,1.581,8.434,3.406,11,5,3.018,1.876,8.984,6.075,11,9,1.346,1.953,2.514,6.679,3,9,.565,2.7,1.286,8.254,1,11a48.8,48.8,0,0,1-4,13,38.086,38.086,0,0,1-7,9,36.273,36.273,0,0,1-10,5,46.523,46.523,0,0,1-13,1,29.182,29.182,0,0,1-18-9,49.863,49.863,0,0,1-4-6c-.78-1.231-3-3.542-3-5'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='s2'>
                <g id='s2-p1'>
                  <g style={{ clipPath: 'url(#clip-path-10)' }}>
                    <path
                      id='s2-p1-stroke'
                      className='animate-s2-p1'
                      ref={s2P1Ref}
                      d='M407.794,196.2s6.3-4.961,8-7c1.87-2.237,4.558-7.465,6-10,1.825-3.208,5.536-9.611,7-13,1.254-2.9,3.084-8.973,4-12,.826-2.728,2.5-8.193,3-11,.523-2.964.875-8.992,1-12,.048-1.149.034-1.081.016-2.282-.023-1.549.129-5.029-.016-7.718-.142-2.615-.226-4.17-1-6a12.351,12.351,0,0,0-4-5l-3-3'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
                <g id='s2-p2'>
                  <g style={{ clipPath: 'url(#clip-path-11)' }}>
                    <path
                      id='s2-p2-stroke'
                      className='animate-s2-p2'
                      ref={s2P2Ref}
                      d='M441.794,123.2s6.629,6.878,9,9a95.408,95.408,0,0,0,10,8c2.574,1.581,8.434,3.406,11,5,3.018,1.876,8.984,6.075,11,9,1.346,1.953,2.514,6.679,3,9,.565,2.7,1.286,8.254,1,11a48.8,48.8,0,0,1-4,13,38.086,38.086,0,0,1-7,9,36.273,36.273,0,0,1-10,5,46.523,46.523,0,0,1-13,1,29.182,29.182,0,0,1-18-9,49.863,49.863,0,0,1-4-6c-.78-1.231-3-3.542-3-5'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='f1'>
                <g id='f1-p1'>
                  <g style={{ clipPath: 'url(#clip-path-12)' }}>
                    <polyline
                      id='f1-p1-stroke'
                      className='animate-f1-p1'
                      ref={f1P1Ref}
                      points='583.146 97.053 591.146 92.053 597.146 86.053 604.146 75.053 610.146 64.053 613.146 49.053 610.146 35.053 602.146 23.053 592.146 18.053 580.146 18.053 569.146 21.053 558.146 29.053 551.146 39.053 547.146 49.053 543.146 65.053 540.146 87.053 539.146 107.053 539.146 122.053 539.146 159.053 539.146 206.053 537.146 245.053 535.146 268.053 533.146 287.053 531.146 301.053'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
                <g id='f1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-13)' }}>
                    <polyline
                      id='f1-p2-stroke'
                      className='animate-f1-p2'
                      ref={f1P2Ref}
                      points='498.146 136.053 550.146 136.053 576.146 131.053 594.146 124.053'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '25px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='u1'>
                <g id='u1-p1'>
                  <g style={{ clipPath: 'url(#clip-path-14)' }}>
                    <polyline
                      id='u1-p1-stroke'
                      className='animate-u1-p1'
                      ref={u1P1Ref}
                      points='617.146 124.053 609.146 134.053 600.146 148.053 596.146 157.053 594.146 168.053 594.146 180.053 596.146 191.053 602.146 200.053 610.146 205.053 622.146 206.053 632.146 203.053 640.146 199.053 646.146 195.053'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '22px' }}
                    />
                  </g>
                </g>
                <g id='u1-p2'>
                  <g style={{ clipPath: 'url(#clip-path-15)' }}>
                    <polyline
                      id='u1-p2-stroke'
                      className='animate-u1-p2'
                      ref={u1P2Ref}
                      points='667.146 124.053 661.146 135.053 655.146 151.053 649.146 172.053 649.146 185.053 652.146 199.053 660.146 209.053 671.146 210.053 683.146 206.053 694.146 199.053 705.146 188.053'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '25px' }}
                    />
                  </g>
                </g>
              </g>
              <g id='l2'>
                <g id='l2-p1'>
                  <g style={{ clipPath: 'url(#clip-path-16)' }}>
                    <path
                      id='l2-p1-stroke'
                      className='animate-l2-p1'
                      ref={l2P1Ref}
                      d='M707.911,144.2a20.176,20.176,0,0,0,5-2,20.9,20.9,0,0,0,5-4,144.621,144.621,0,0,0,11-13c2.168-2.881,6.135-8.914,8-12a118.553,118.553,0,0,0,6-11c1.952-4.583,4.645-14.206,6-19,1.121-3.967,3.258-11.944,4-16,.77-4.209,1.75-12.728,2-17a101.06,101.06,0,0,0,0-13,76.992,76.992,0,0,0-3-13c-1.135-3.156-3.936-9.356-6-12-1.419-1.816-4.838-5.2-7-6-1.641-.607-7,0-7,0h0'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '17px' }}
                    />
                  </g>
                </g>
                <g id='l2-p2'>
                  <g style={{ clipPath: 'url(#clip-path-17)' }}>
                    <path
                      id='l2-p2-stroke'
                      className='animate-l2-p2'
                      ref={l2P2Ref}
                      d='M740.911,6.2s-8.338-.689-11,0a27.394,27.394,0,0,0-9,5c-3.806,3.651-8.777,13.218-11,18-2.333,5.019-5.627,15.639-7,21-1.387,5.416-3.276,16.457-4,22-.812,6.218-1.973,18.73-2,25a251.163,251.163,0,0,0,2,28c1,6.842,4.377,20.279,6,27,1.4,5.777,3.722,17.512,6,23a90.819,90.819,0,0,0,10,17c2.127,2.605,6.961,7.559,10,9,2.971,1.409,9.715,2.152,13,2a30,30,0,0,0,8-2,42.94,42.94,0,0,0,6-4,57.647,57.647,0,0,0,6-5c1.463-1.576,5-4.849,5-7'
                      transform='translate(5.102 7.858)'
                      style={{ fill: 'none', stroke: '#000', strokeLinejoin: 'round', strokeWidth: '24px' }}
                    />
                  </g>
                </g>
              </g>
            </svg>
          </div>
          <div className='booking-confirmation' ref={bookingConfirmationRef}>Massage Booked!</div>
        </div>
      </div>
    </div>
  );
};

BookingConfirmation.propTypes = {
  resetBookingInformation: PropTypes.func.isRequired,
  resetPaymentInformation: PropTypes.func.isRequired,
};

export default connect(null, { resetBookingInformation, resetPaymentInformation })(BookingConfirmation);
