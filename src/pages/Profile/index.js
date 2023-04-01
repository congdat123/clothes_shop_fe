import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';

import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

function Profile() {
    const { userName } = useParams();
    const [dataUser, setDataUser] = useState([]);
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setDataUser(response.data);
                console.log(response.data);
            });
    }, []);

    return (
        <div>
            {' '}
            <h2>Profile page</h2>
            <div>
                {dataUser.map((item) => (
                    <div>
                        <h3>Thông tin tài khoản của bạn</h3>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>UserName</div>
                            <div className={cx('info-conten')}>
                                <p>{item.userName}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Full Name</div>
                            <div className={cx('info-conten')}>
                                <p>{item.fullName}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Email</div>
                            <div className={cx('info-conten')}>
                                <p>{item.email}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Phone</div>
                            <div className={cx('info-conten')}>
                                <p>{item.phone}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Address</div>
                            <div className={cx('info-conten')}>
                                <p>{item.address}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Avatar</div>
                            <div className={cx('info-conten')}>
                                <p>{item.avatar}</p>
                            </div>
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-title')}>Day Create</div>
                            <div className={cx('info-conten')}>
                                <Moment format="DD/MM/YYYY">{item.dayCreated}</Moment>
                            </div>
                        </div>
                        <Link to={`/edit/${item.userId}`}>
                            <Button>Edit</Button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
