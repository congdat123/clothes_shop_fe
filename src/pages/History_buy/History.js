import classNames from 'classnames/bind';
import styles from './History_Order.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const cx = classNames.bind(styles);

function History() {
    const [userName, setUserName] = useState();
    const [items, setItem] = useState([]);
    const [detailProduct, setDetailProduct] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('username');
        if (storedData) {
            setUserName(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Bills/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setItem(response.data);
            });
    }, [userName]);
    useEffect(() => {
        items.forEach((obj) => {
            axios
                .create({
                    baseURL: `https://localhost:44387/api/CartDetails/SearchBill?BillId=${obj.billId}`,
                })
                .get()
                .then((response) => {
                    setDetailProduct([...detailProduct, response.data]);
                });
        });
    }, []);

    // console.log(detailProduct);

    return (
        <div className={cx('wrapper')}>
            {/* <h2 className={cx('title')}>Lịch sử mua hàng</h2> */}
            {items.map((item) => (
                <div className={cx('bill')}>
                    <div className={cx('bill-item')}>
                        <div className={cx('item')}>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>Tên người nhận</p>{' '}
                                <p className={cx('content')}>{item.customerName}</p>
                            </div>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>Địa chỉ nhận hàng</p>
                                <p className={cx('content')}>{item.address}</p>
                            </div>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>SĐT người nhận </p>
                                <p className={cx('content')}>{item.phone}</p>
                            </div>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>Ngày đặt</p>
                                <p className={cx('content')}>
                                    <Moment format="DD/MM/YYYY">{item.dayOrder}</Moment>
                                </p>
                            </div>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>Tổng giá tiền</p>
                                <p className={cx('content')}>{item.total}VNĐ</p>
                            </div>
                            <div className={cx('item-title')}>
                                <p className={cx('title-content')}>Trạng thái</p>
                                <p className={cx('content')}>{item.status}</p>
                            </div>
                        </div>
                        <div className={cx('item-2')}>
                            <img className={cx('item-avatar')} src={item.avatar} />
                        </div>
                    </div>
                    <Link to={`/detail/bill/${item.billId}`} className={cx('link-to-bill')}>
                        Chi tiết đơn hàng
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default History;
