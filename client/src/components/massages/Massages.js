import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMassages } from '../../actions/massage';

import MassageLink from './MassageLink';
import Loader from '../layout/Loader';

import '../../css/Massages.css';

const Massages = ({ match, getMassages, massage: { massages, loading } }) => {
  useEffect(() => {
    getMassages();
  }, [getMassages]);

  return loading ? (
    <Loader/>
  ) : (
    <>
      <div className='massages-hero-image-wrapper'>
        <div className='hero-image'>
          <h1 className=''>Massages</h1>
          <p className=''>
            Each experience is personalized for you and includes your choice of
            music, aromatherapy, luxurious linens, soothing hot towels, a face
            and scalp massage and pain relieving products.
          </p>
        </div>
      </div>

      <div className='massages'>
        {massages.map((massage) => (
          <Link
            key={massage.id}
            to={{pathname: `${match.url}/${massage.name.toLowerCase().replace(/ /g, '-')}`, slug: massage.name.toLowerCase().replace(/ /g, '-')}}
            className='massage-link'
          >
            <MassageLink key={massage.id} massage={massage} />
          </Link>
        ))}
      </div>
    </>
  );
};

Massages.propTypes = {
  getMassages: PropTypes.func.isRequired,
  massage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  massage: state.massage,
});

export default connect(mapStateToProps, { getMassages })(Massages);
