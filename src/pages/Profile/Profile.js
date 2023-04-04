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
    const [bills, setBills] = useState([]);
    const [total, setTotal] = useState(0);

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

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Bills/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setBills(response.data);
                setTotal(response.data.reduce((accumulator, item) => accumulator + item.total, 0));
            });
    }, []);

    return (
        <div className={cx('wrapper')}>
            {dataUser.map((item) => (
                <div className={cx('info-component')}>
                    <div className={cx('info')}>
                        <Image className={cx('info-content-img')} src={item.avatar} />
                        <div className={cx('info-content-component')}>
                            <p className={cx('info-name')}>{item.fullName}</p>
                            <div>
                                <p className={cx('info-rank')}>Bảng xếp hạng</p>
                                <p className={cx('info-rank-current')}>
                                    {bills.length >= 0 && bills.length < 5
                                        ? `Thành viên mới`
                                        : bills.length >= 5 && bills.length < 10
                                        ? 'Thành viên bạc'
                                        : 'Thành viên vàng'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <Tabs size="lg" defaultValue={0} className={cx('tabs')}>
                        <TabList variant="soft" color="neutral" className={cx('tab-list')}>
                            <Tab>
                                <p className={cx('item-tab')}>Thông tin tài khoản của bạn</p>
                            </Tab>
                            <Tab>
                                <p className={cx('item-tab')}>Thông tin mua hàng</p>
                            </Tab>
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
                        <TabPanel value={1}>
                            <div className={cx('info')}>
                                <div className={cx('info-title')}>Số đơn hàng đã mua:</div>
                                <div className={cx('info-content')}>
                                    <p>{bills.length}</p>
                                </div>
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('info-title')}>Tổng tiền đã mua:</div>
                                <div className={cx('info-content')}>
                                    <p>{total} VNĐ</p>
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            ))}
        </div>
    );
}

export default Profile;
