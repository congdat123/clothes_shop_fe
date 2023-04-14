import classNames from 'classnames/bind';
import styles from './Check_Out.module.scss';
import Money from '~/components/Money/Money';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button/Button';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

function Check_Out() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userName, setUserName] = useState();
    const [dataUser, setDataUser] = useState([]);
    const [editForm, setEditForm] = useState(false);
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
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [bill, setBill] = useState();
    const [totalProduct, setTotalProduct] = useState(0);
    const [paymentMoney, setPaymentMoney] = useState(true);
    const [paymentTransfer, setPaymentTransfer] = useState(false);
    const fee = 30000;
    // Lấy username qua localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('currentUser');
        if (storedData) {
            setCurrentUser(true);
            setUserName(JSON.parse(localStorage.getItem('username')));
        }
    }, []);
    // lấy thông tin user qua username
    useEffect(() => {
        const axiosAPI = async () => {
            axios
                .create({
                    baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
                })
                .get()
                .then((response) => {
                    setDataUser(response.data);
                });
        };
        axiosAPI();
    }, [userName]);

    useEffect(() => {
        // lấy giỏ hàng của user qua username
        const axiosAPI = async () => {
            axios
                .create({
                    baseURL: `https://localhost:44387/api/Carts/viaUserName?UserName=${userName}`,
                })
                .get()
                .then((response) => {
                    setItems(response.data);
                    setTotal(response.data.reduce((accumulator, item) => accumulator + item.price, 0));
                    setTotalProduct(response.data.reduce((accumulator, item) => accumulator + item.quantity, 0));
                })
                .catch((error) => console.error(error));
        };
        axiosAPI();
    });

    // console.log(totalProduct);

    // Chỉnh sửa thông tin người dùng
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

    // Chỉnh sửa địa chỉ nhận hàng
    const handleEditAddress = () => {
        setEditForm((editForm) => !editForm);
    };
    function handleChange(e) {
        const newdataEdit = { ...dataEdit };
        newdataEdit[e.target.id] = e.target.value;
        setDataEdit(newdataEdit);
        console.log(newdataEdit);
    }
    const handleSubmitEditAddress = async (userId) => {
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
                // console.log(res.dataEdit);
            });
    };

    const handlePaymentMoney = () => {
        setPaymentMoney(true);
        setPaymentTransfer(false);
    };
    const handlePaymentTransfer = () => {
        setPaymentMoney(false);
        setPaymentTransfer(true);
    };
    // Lấy số lượng bill
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

    // Xử lý thanh toán sau khi nhận hàng
    const handlePaymentMoneySubmit = () => {
        try {
            dataUser.forEach((obj) => {
                axios.post(`https://localhost:44387/api/Bills`, {
                    customerName: obj.fullName,
                    userName: userName,
                    phone: obj.phone,
                    address: obj.address,
                    avatar: 'https://baabrand.com/wp-content/uploads/2018/12/icon-thiet-ke-linh-vuc-logo-thuong-hieu-thoi-trang-my-pham-lam-dep-spa-baa-brand-1.png',
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
    const handlePaymentTransferSubmit = () => {};
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thanh toán</div>
            <div className={cx('content')}>
                <div className={cx('address')}>
                    <div className={cx('address-title')}>
                        <FontAwesomeIcon icon={faLocationDot} className={cx('icon')} />
                        Địa Chỉ Nhận Hàng
                    </div>
                    {dataUser.map((item) => (
                        <div className={cx('address-content')}>
                            <p className={cx('address-name')}>{item.fullName}</p>
                            <p className={cx('address-phone')}>{item.phone}</p>
                            <p className={cx('address-address')}>{item.address}</p>
                            <button className={cx('address-action')} onClick={handleEditAddress}>
                                Thay Đổi
                            </button>
                            {editForm ? (
                                <div className={cx('form')}>
                                    <div className={cx('form-edit')}>
                                        <div className={cx('form-edit-title')}>Cập nhật địa chỉ </div>
                                        <form className={cx('form-edit-form')}>
                                            <div className={cx('form-edit-form-row')}>
                                                <div className={cx('form-edit-column')}>
                                                    <div className={cx('form-item')}>
                                                        <div className={cx('form-edit-title')}>Họ và tên</div>
                                                        <input
                                                            className={cx('edit-input')}
                                                            onChange={(e) => handleChange(e)}
                                                            id="fullName"
                                                            value={dataEdit.fullName}
                                                            placeholder="Họ và tên"
                                                            type="text"
                                                        ></input>
                                                    </div>
                                                </div>
                                                <div className={cx('form-edit-column')}>
                                                    <div className={cx('form-item')}>
                                                        <div className={cx('form-edit-title')}>Số điện thoại</div>
                                                        <input
                                                            className={cx('edit-input')}
                                                            onChange={(e) => handleChange(e)}
                                                            id="phone"
                                                            value={dataEdit.phone}
                                                            placeholder="Phone"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cx('form-edit-form-row')}>
                                                <div className={cx('form-edit-column')}>
                                                    <div className={cx('form-item')}>
                                                        <div className={cx('form-edit-title')}>Địa chỉ cụ thể</div>
                                                        <input
                                                            className={cx('edit-input')}
                                                            onChange={(e) => handleChange(e)}
                                                            id="address"
                                                            value={dataEdit.address}
                                                            placeholder="Address"
                                                            type="text"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <div className={cx('form-button')}>
                                            <Button onClick={handleEditAddress} className={cx('btn-back')}>
                                                Trở lại
                                            </Button>
                                            <Link to="#">
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmitEditAddress(dataEdit.userId)}
                                                    className={cx('btn-submit')}
                                                >
                                                    Hoàn thành
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </div>
                <div className={cx('product')}>
                    <div className={cx('product-title')}>
                        <div className={cx('product-title-main')}>Sản phẩm</div>
                        <div className={cx('product-title-second')}>Đơn giá</div>
                        <div className={cx('product-title-second')}>Số lượng</div>
                        <div className={cx('product-title-second')}>Thành tiền</div>
                    </div>
                    <div className={cx('product-center')}>
                        {items.map((item) => (
                            <div className={cx('product-content')}>
                                <div className={cx('product-content-main')}>
                                    <div className={cx('product-content-main-avatar')}>
                                        <img src={item.avatar} className={cx('product-content-main-avatar')} />
                                    </div>
                                    <div className={cx('product-content-main-product-name')}>{item.productName}</div>
                                    <div className={cx('product-content-main-product-size')}>Size:{item.size}</div>
                                </div>
                                <div className={cx('product-content-second')}>
                                    <Money value={item.price / item.quantity} />
                                </div>
                                <div className={cx('product-content-second')}>{item.quantity}</div>
                                <div className={cx('product-content-second')}>
                                    <Money value={item.price} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('shipping')}>
                        <div className={cx('shipping-title')}>Phí vận chuyển:</div>
                        <div className={cx('shipping-fee')}>
                            <Money value={fee}></Money>
                        </div>
                    </div>
                    <div className={cx('product-total-price')}>
                        <div className={cx('product-total-price-title')}>Tổng số tiền({totalProduct} sản phẩm):</div>
                        <div className={cx('product-total-price-total')}>
                            <Money value={total} />
                        </div>
                    </div>
                </div>
                <div className={cx('payment')}>
                    <div className={cx('payment-title')}>
                        <div className={cx('payment-title-name')}>Phương thức thanh toán</div>
                        <div className={cx('payment-type')}>
                            <button onClick={handlePaymentMoney} className={cx('btn-action')}>
                                {paymentMoney ? (
                                    <p className={cx('payment-type-not-hide')}>Thanh toán khi nhận hàng</p>
                                ) : (
                                    <p className={cx('payment-type-hide')}>Thanh toán khi nhận hàng</p>
                                )}{' '}
                            </button>
                            <button onClick={handlePaymentTransfer} className={cx('btn-action')}>
                                {paymentTransfer ? (
                                    <p className={cx('payment-type-not-hide')}>Chuyển khoản ngân hàng</p>
                                ) : (
                                    <p className={cx('payment-type-hide')}>Chuyển khoản ngân hàng</p>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className={cx('payment-money-title')}>
                        {paymentMoney ? (
                            <div className={cx('payment-money-title-content')}>
                                <p className={cx('payment-money-title-content-title')}>Thanh toán khi nhận hàng</p>
                                <p className={cx('payment-money-title-content-title2')}>
                                    Phí thu hộ: ₫0 VNĐ. Ưu đãi về phí vận chuyển (nếu có) áp dụng cả với phí thu hộ.
                                </p>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>
                    <div className={cx('payment-money-content')}>
                        <div className={cx('payment-money-content1')}>
                            <p className={cx('payment-money-content1-left1')}>Tổng tiền hàng</p>
                            <p className={cx('payment-money-content1-left1')}>Phí vận chuyển</p>
                            <p className={cx('payment-money-content1-left2')}>Tổng thanh toán:</p>
                        </div>
                        <div className={cx('payment-money-content2')}>
                            <p className={cx('payment-money-content2-right1')}>
                                <Money value={total} />
                            </p>
                            <p className={cx('payment-money-content2-right1')}>
                                <Money value={fee} />
                            </p>
                            <p className={cx('payment-money-content2-right2')}>
                                <Money value={total + fee} />
                            </p>
                        </div>
                    </div>
                    <div className={cx('action-payment')}>
                        <div className={cx('action-payment-rules')}>
                            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo{' '}
                            <a href="#" className={cx('rule')}>
                                Điều khoản của hệ thống
                            </a>
                        </div>
                        {paymentMoney ? (
                            <Link to={config.routes.orderSuccess}>
                                <button onClick={handlePaymentMoneySubmit} className={cx('btn-action-buy')}>
                                    Đặt hàng
                                </button>
                            </Link>
                        ) : (
                            <></>
                        )}
                        {paymentTransfer ? (
                            <Link to={config.routes.paymentTransfer}>
                                <button onClick={handlePaymentTransferSubmit} className={cx('btn-action-buy')}>
                                    Đặt hàng
                                </button>
                            </Link>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Check_Out;
