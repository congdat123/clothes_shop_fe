/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Cart() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userName, setUserName] = useState();
    const [dataUser, setDataUser] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [bill, setBill] = useState();
    const [fullName, setFullName] = useState('');
    useEffect(() => {
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Bills',
            })
            .get()
            .then((response) => {
                setBill(response.data.length);
            });
    });
    useEffect(() => {
        const storedData = localStorage.getItem('currentUser');
        if (storedData) {
            setCurrentUser(true);
            setUserName(JSON.parse(localStorage.getItem('username')));
        }
    }, []);

    useEffect(() => {
        // lấy giỏ hàng của user qua username
        axios
            .create({
                baseURL: `https://localhost:44387/api/Carts/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setItems(response.data);
                setTotal(response.data.reduce((accumulator, item) => accumulator + item.price, 0));
            })
            .catch((error) => console.error(error));
        // lấy thông tin user qua username

        axios
            .create({
                baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setDataUser(response.data);
            });
    });

    const handleDeleteItem = (cartId) => {
        if (window.confirm('Bạn muốn xóa!')) {
            axios.delete(`https://localhost:44387/api/Carts/${cartId}`);
            setItems(
                items.filter((item) => {
                    return item.cartId !== cartId;
                }),
            );
        } else {
        }
    };

    const handleBuyItem = () => {
        try {
            dataUser.forEach((obj) => {
                axios.post(`https://localhost:44387/api/Bills`, {
                    customerName: obj.fullName,
                    userName: userName,
                    phone: obj.phone,
                    address: obj.address,
                    total: total,
                    status: 'Chờ xác nhận',
                });
            });
            items.forEach((obj) => {
                axios.post(`https://localhost:44387/api/CartDetails`, {
                    productName: obj.productName,
                    avatar: obj.avatar,
                    size: obj.size,
                    quantity: obj.quantity,
                    price: obj.price,
                    billId: bill + 1,
                    productId: obj.productId,
                });
                axios.delete(`https://localhost:44387/api/Carts/${obj.cartId}`);
                setItems(
                    items.filter((item) => {
                        return item.cartId !== obj.cartId;
                    }),
                );
            });
        } catch (error) {}
    };

    return (
        <div>
            {currentUser ? (
                <div className={cx('wrapper')}>
                    {items.length != 0 ? (
                        <p>
                            <div className={cx('item-title')}>
                                <div className={cx('item-title-name')}>Sản phẩm</div>
                                <div className={cx('item-title-price')}>Giá</div>
                                <div className={cx('item-title-size')}>Size</div>
                                <div className={cx('item-title-quantity')}>Số lượng</div>
                                <div className={cx('item-title-action')}>Thao tác</div>
                            </div>
                            <div className={cx('item-cart')}>
                                {items.map((item) => (
                                    <div className={cx('cart-item')}>
                                        <div>
                                            <img className={cx('item-avatar')} src={item.avatar} />
                                        </div>
                                        <div className={cx('item-name')}>
                                            <p>{item.productName}</p>
                                        </div>
                                        <div className={cx('item-price')}>{item.price}</div>
                                        <div className={cx('item-size')}>{item.size}</div>
                                        <div className={cx('item-quantity')}>{item.quantity}</div>
                                        <div className={cx('item-action')}>
                                            <div
                                                className={cx('item-action-type')}
                                                onClick={() => handleDeleteItem(item.cartId)}
                                            >
                                                Xóa
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={cx('item-total')}>
                                <div className={cx('item-total-name')}>Tổng tiền</div>
                                <div className={cx('item-total-price')}>{total}đ</div>
                                <div className={cx('item-total-action')} onClick={handleBuyItem}>
                                    Mua
                                </div>
                            </div>
                        </p>
                    ) : (
                        <>
                            <div className={cx('not-item')}>
                                <h3>Bạn chưa có đơn hàng nào!!!</h3>
                            </div>
                            <Link to={config.routes.product} className={cx('action-to-product')}>
                                {' '}
                                Mua sắm ngay
                            </Link>
                        </>
                    )}
                </div>
            ) : (
                <>
                    <div>Not Login</div>
                </>
            )}
        </div>
    );
}

export default Cart;
