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
        newdata[e.target.id] = e.target.value.replace(/\s/g, '');
        setData(newdata);
        console.log(newdata);
    }

    const handleAdd = async () => {
        if (data.userName.length < 6) {
            alert('Tên tài khoảng phải ít nhất 6 kí tự!');
        }
        if (data.password.length < 8) {
            alert('Mật khẩu phải ít nhất 8 kí tự!');
        }
        if ((data.userName.length >= 6) & (data.password.length >= 8)) {
            try {
                const response = await axios.post(`https://localhost:44387/api/Account`, {
                    userName: data.userName,
                    password: data.password,
                });
                if (response.data.userName === data.userName) {
                    alert('Đăng kí thành công!');
                    window.location.href = '/login';
                }
            } catch (error) {
                alert('Tên tài khoản đã tồn tại!!!');
                console.log(error);
            }
        }
    };

    return (
        <form className={cx('form')}>
            <span className={cx('signup')}>Đăng kí</span>
            <input
                onChange={(e) => handle(e)}
                id="userName"
                value={data.userName}
                type="text"
                pattern="[a-zA-Z0-9]+$"
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
                required
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
