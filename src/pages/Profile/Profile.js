import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button';

import styles from './Profile.module.scss';
import Image from '~/components/Image/Image';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import Money from '~/components/Money/Money';
import EditProfile from '../EditProfile/EditProfile';

const cx = classNames.bind(styles);

function Profile() {
    const { userName } = useParams();
    const [dataUser, setDataUser] = useState([]);
    const [bills, setBills] = useState([]);
    const [total, setTotal] = useState(0);
    const [hideEditForm, setHideEditForm] = useState(false);
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
                baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setDataUser(response.data);
            });
    }, []);

    useEffect(() => {
        dataUser.forEach((obj) => {
            axios
                .create({
                    baseURL: `https://localhost:44387/api/Users/${obj.userId}`,
                })
                .get()
                .then((response) => {
                    setDataEdit(response.data);
                });
        });
    }, [dataUser]);
    const handleEdit = async (userId) => {
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

    const handleFormEdit = () => {
        setHideEditForm((handleEdit) => !handleEdit);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                                <Link className={cx('btn-edit')}>
                                    <Button onClick={handleFormEdit}>Edit</Button>
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
                                        <p>
                                            <Money value={total} />
                                        </p>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                ))}
            </div>
            {hideEditForm ? (
                <div className={cx('wrapper2')}>
                    <div className={cx('product')}>
                        <h2 className={cx('item')}>Chỉnh sửa Thông tin người dùng</h2>
                        <form>
                            <div className={cx('form-edit')}>
                                <div className={cx('name')}>
                                    <label>Họ và tên:</label>
                                </div>
                                <div>
                                    <input
                                        className={cx('form-input')}
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
                                        className={cx('form-input')}
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
                                    <label>Số điện thoại:</label>
                                </div>
                                <div>
                                    <input
                                        className={cx('form-input')}
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
                                    <label>Địa chỉ:</label>
                                </div>
                                <div>
                                    <input
                                        className={cx('form-input')}
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
                                    <label>Ảnh đại diện:</label>
                                </div>
                                <div>
                                    <input
                                        className={cx('form-input')}
                                        onChange={(e) => handle2(e)}
                                        id="avatar"
                                        value={dataEdit.avatar}
                                        placeholder="Avatar"
                                        type="text"
                                    ></input>
                                </div>
                            </div>

                            <div className={cx('btn-action')}>
                                <button
                                    onClick={handleEdit(dataEdit.userId)}
                                    type="submit"
                                    className={cx('btn-submit')}
                                >
                                    Edit
                                </button>
                                <button onClick={handleFormEdit} type="submit" className={cx('btn-back')}>
                                    Trở lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}

export default Profile;
