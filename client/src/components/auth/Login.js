import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import axios from 'axios';

import { login } from '../../actions/auth';

const Login = ({ login, history }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const token = await login(email, password);
            console.log(token);
            if (token) {
                history.push('/entry');
            }
        } catch (err) {
            console.log(err);
        }

        // console.log('SUCCESS');
        // const newUser = {
        //     email,
        //     password
        // };

        // try {
        //     const config = {
        //         headers: {
        //             'Content-Type': 'Application/json'
        //         }
        //     };

        //     const body = JSON.stringify(newUser);

        //     const res = await axios.post('/api/auth', body, config);
        //     console.log(res.data);
        //     if (res.data.token) {
        //         history.push('/entry');
        //     }
        // } catch (err) {
        //     console.log(err.response.data);
        // }
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Sign Into Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        minLength='6'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                </div>
                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/signup'>Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(
    null,
    { login }
)(Login);