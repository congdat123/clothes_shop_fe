import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const [data, setData] = useState({
        userName: '',
        password: '',
    });

    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value;
        setData(newdata);
        console.log(newdata);
    }

    const handleAdd = () => {
        axios
            .post(`https://localhost:44387/api/Account`, {
                userName: data.userName,
                password: data.password,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <form className={cx('form')}>
            <span className={cx('signup')}>Sign Up</span>
            <input
                onChange={(e) => handle(e)}
                id="userName"
                value={data.userName}
                type="text"
                placeholder="User Name"
                className={cx('form--input')}
                autoComplete="off"
                minLength="6"
            />
            <input
                onChange={(e) => handle(e)}
                id="password"
                value={data.password}
                type="password"
                placeholder="Password"
                className={cx('form--input')}
            />

            <button className={cx('form--submit')} onClick={handleAdd}>
                Sign up
            </button>
            <p>
                Have an account?
                <a href="./login">Sign In</a>
            </p>
        </form>
    );
}

export default Register;
