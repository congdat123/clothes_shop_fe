import axios from 'axios';
import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://localhost:44387/api/Account/login', {
                userName,
                password,
            });
            localStorage.setItem('token', JSON.stringify(response.data.access_token));
            localStorage.setItem('username', JSON.stringify(response.data.name));
            localStorage.setItem('currentUser', 'true');
            if (response.data.name === userName) {
                alert('Đăng nhập thành công!');
                console.log(response.data);
                window.location.href = '/product';
            }
        } catch (error) {
            alert('Sai tài khoản hoặc mật khẩu!');
            console.log(error);
        }
    };
    return (
        <form className={cx('form')} onSubmit={handleSubmit}>
            <span className={cx('signup')}>Sign In</span>
            <input
                onChange={(e) => setUserName(e.target.value)}
                id="userName"
                value={userName}
                type="text"
                placeholder="User Name"
                className={cx('form--input')}
                autoComplete="off"
                minLength="6"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                value={password}
                type="password"
                placeholder="Password"
                className={cx('form--input')}
            />

            <button className={cx('form--submit')} type="submit">
                Sign in
            </button>

            <p>
                Don't have an account?
                <a href="./register">Sign Up</a>
            </p>
        </form>
    );
}

export default Login;
