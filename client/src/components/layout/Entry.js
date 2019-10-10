import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Entry = ({ isAuthenticated }) => {
    const dbRequest = () => {
        console.log('HHH');
    };

    if (!isAuthenticated) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <button className='btn btn-primary' onClick={() => dbRequest()}>
                Register
            </button>
        </div>
    );
};

Entry.propTypes = {
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Entry);
