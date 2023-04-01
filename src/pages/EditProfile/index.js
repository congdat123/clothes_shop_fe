import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './EditProfile.module.scss';

const cx = classNames.bind(styles);

function EditProfile() {
    const { userId } = useParams();
    const [dataEdit, setDataEdit] = useState({
        userId: '',
        userName: '',
        password: '',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        dayCreated: '',
    });
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Users/${userId}`,
            })
            .get()
            .then((response) => {
                setDataEdit(response.data);
            });
    }, []);

    const handleEdit = (userId) => {
        axios
            .put(`https://localhost:44387/api/Users/${userId}`, {
                userId: dataEdit.userId,
                userName: dataEdit.userName,
                password: dataEdit.password,
                fullName: dataEdit.fullName,
                email: dataEdit.email,
                phone: dataEdit.phone,
                address: dataEdit.address,
                avatar: dataEdit.avatar,
                dayCreated: dataEdit.dayCreated,
            })
            .then((res) => {
                console.log(res.dataEdit);
            });
    };

    function handle2(e) {
        const newdataEdit = { ...dataEdit };
        newdataEdit[e.target.id] = e.target.value;
        setDataEdit(newdataEdit);
        console.log(newdataEdit);
    }

    return (
        <div className={cx('product')}>
            <h2 className={cx('item')}>Chỉnh sửa Thông tin người dùng</h2>
            <form>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>User ID:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="userId"
                            value={dataEdit.userId}
                            placeholder="User ID"
                            type="number"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>User Name:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="userName"
                            value={dataEdit.userName}
                            placeholder="UserName Name"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="password"
                            value={dataEdit.password}
                            placeholder="Password"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>Full Name:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="fullName"
                            value={dataEdit.fullName}
                            placeholder="Full Name"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>Email:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="email"
                            value={dataEdit.email}
                            placeholder="Email"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>Phone:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="phone"
                            value={dataEdit.phone}
                            placeholder="Phone"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>User Name:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="address"
                            value={dataEdit.address}
                            placeholder="Address"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>User Name:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="avatar"
                            value={dataEdit.avatar}
                            placeholder="Avatar"
                            type="text"
                        ></input>
                    </div>
                </div>
                <div className={cx('form-edit')}>
                    <div className={cx('name')}>
                        <label>User Name:</label>
                    </div>
                    <div>
                        <input
                            onChange={(e) => handle2(e)}
                            id="dayCreated"
                            value={dataEdit.dayCreated}
                            placeholder="DayCreated"
                            type="text"
                        ></input>
                    </div>
                </div>

                <button onClick={() => handleEdit(dataEdit.categoryId)} type="submit" className={cx('btn-edit')}>
                    Edit
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
