import classNames from 'classnames/bind';
import React, { useState } from 'react';
import axios from 'axios';
import FileBase64 from 'react-file-base64';

import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function ImageUpload() {
    const [image, setImage] = useState('');

    const handleImageUpload = (base64) => {
        setImage(base64);
    };
    const [data, setData] = useState({
        userName: '',
        password: '',
        email: '',
        avatar: '',
    });
    function handle(e) {
        const newdata = { ...data };
        newdata[e.target.id] = e.target.value.replace(/\s/g, '');
        setData(newdata);
        console.log(newdata);
    }
    const handleSubmit = () => {
        axios
            .post('https://localhost:44387/api/Users', {
                userName: data.userName,
                email: data.email,
                password: data.password,
                avatar: image,
            })
            .then((response) => console.log(response))
            .catch((error) => console.error(error));
    };

    return (
        <div>
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
                id="email"
                value={data.email}
                type="email"
                pattern="[a-zA-Z0-9]+$"
                placeholder="Email"
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
            <FileBase64 multiple={false} onDone={handleImageUpload} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}

export default ImageUpload;
