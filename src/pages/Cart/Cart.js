/* eslint-disable jsx-a11y/alt-text */
import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userName, setUserName] = useState();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem('currentUser');
        if (storedData) {
            setCurrentUser(true);
            setUserName(JSON.parse(localStorage.getItem('username')));
        }
    }, []);

    useEffect(() => {
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
    }, [userName]);

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

    return (
        <div>
            {currentUser ? (
                <div className={cx('wrapper')}>
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
                        Tổng tiền
                        <div>{total}đ</div>
                    </div>
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
