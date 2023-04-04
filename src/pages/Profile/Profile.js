import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import Moment from 'react-moment';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button';
import config from '~/config';

import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';

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
                console.log('ddddddddd' + response.data);
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            {dataUser.map((item) => (
                <div className={cx('info-component')}>
                    <div className={cx('info')}>
                        <Image className={cx('info-content-img')} src={item.avatar} />
                        <div className={cx('info-content')}>
                            <p>{item.fullName}</p>
                            <p>{item.userName}</p>
                        </div>
                    </div>
                    <Tabs size="lg" defaultValue={0}>
                        <TabList variant="soft" color="neutral">
                            <Tab className={cx('item')}>Thông tin tài khoản của bạn</Tab>
                            <Tab className={cx('item')}>Thông tin 2</Tab>
                        </TabList>
                        <TabPanel value={0}>
                            <div>
                                <div className={cx('info')}>
                                    <div className={cx('info-title')}>Họ và tên</div>
                                    <div className={cx('info-content')}>
                                        <p>{item.fullName}</p>
                                    </div>
                                </div>
                                <div className={cx('info')}>
                                    <div className={cx('info-title')}>UserName</div>
                                    <div className={cx('info-content')}>
                                        <p>{item.userName}</p>
                                    </div>
                                </div>
                                <div className={cx('info')}>
                                    <div className={cx('info-title')}>Email</div>
                                    <div className={cx('info-content')}>
                                        <p>{item.email}</p>
                                    </div>
                                </div>
                                <div className={cx('info')}>
                                    <div className={cx('info-title')}>Điện thoại</div>
                                    <div className={cx('info-content')}>
                                        <p>{item.phone}</p>
                                    </div>
                                </div>
                                <div className={cx('info')}>
                                    <div className={cx('info-title')}>Địa chỉ</div>
                                    <div className={cx('info-content')}>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                            </div>
                            <Link className={cx('btn-edit')} to={`/edit/${item.userId}`}>
                                <Button>Edit</Button>
                            </Link>
                        </TabPanel>
                        <TabPanel value={1}>Thông tin 2</TabPanel>
                    </Tabs>
                </div>
            ))}
        </div>
    );
}

export default Profile;
