import classNames from 'classnames/bind';
import styles from './DetailBill.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '~/components/Button/Button';
import ReactStars from 'react-stars';
import Money from '~/components/Money/Money';

const cx = classNames.bind(styles);

function DetailBill() {
    const { billId } = useParams();
    const [items, setItems] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [itemSelects, setItemSelects] = useState([]);
    const [hideFormRate, setHideFormRate] = useState(false);
    const [rating, setRating] = useState(0);
    const [userName, setUserName] = useState(null);
    const [dataUser, setDataUser] = useState({});
    const [rate, setRate] = useState({ content: '' });

    // console.log(rating);
    useEffect(() => {
        const storedData = localStorage.getItem('username');
        if (storedData) {
            setUserName(JSON.parse(storedData));
        }
    });

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/CartDetails/SearchBill?BillId=${billId}`,
            })
            .get()
            .then((response) => {
                setItems(response.data);
            });
        axios
            .create({
                baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setDataUser(response.data);
            });
    });

    // console.log('AAAAAAAA' + dataUser);

    const handleRate = (productId) => {
        setSelectedItemId(productId);
    };
    const handleRate2 = () => {
        setHideFormRate((hideFormRate) => !hideFormRate);
    };
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Products/${selectedItemId}`,
            })
            .get()
            .then((response) => {
                setItemSelects(response.data);
            });
    }, [selectedItemId]);
    // console.log(itemSelects.productName);
    function handleRatingChange(value) {
        setRating(value);
    }

    const handleRateSubmit = () => {
        dataUser.forEach((obj) => {
            axios
                .post(`https://localhost:44387/api/ProductReviews`, {
                    customerName: obj.fullName,
                    userName: obj.userName,
                    avatar: obj.avatar,
                    star: rating,
                    content: rate.content,
                    productId: itemSelects.productId,
                    userId: obj.userId,
                })
                .then((response) => {
                    // console.log(response.data);
                });
        });
    };
    function handle(e) {
        const newdata = { ...rate };
        newdata[e.target.id] = e.target.value;
        setRate(newdata);
        // console.log(newdata);
    }
    return (
        <div className={cx('wrapper')}>
            {items.map((item) => (
                <div className={cx('detail-bill')}>
                    <div className={cx('product-left')}>
                        <img src={item.avatar} className={cx('avatar')} />
                    </div>
                    <div className={cx('product-right')}>
                        <p className={cx('product-name')}>{item.productName}</p>
                        <p className={cx('product-size')}>Size: {item.size}</p>
                        <p className={cx('product-quantity')}>Số lượng: {item.quantity}</p>
                        <p className={cx('product-price')}>
                            Giá: <Money value={item.price} />
                        </p>
                        <Button
                            outline
                            className={cx('btn-rate')}
                            onClick={() => {
                                handleRate(item.productId);
                                handleRate2();
                            }}
                        >
                            Đánh giá
                        </Button>
                    </div>
                </div>
            ))}
            {hideFormRate ? (
                <div className={cx('rate-form')}>
                    <div className={cx('form')}>
                        <h2 className={cx('form-title')}>Đánh giá sản phẩm</h2>
                        <div className={cx('product-content')}>
                            <img src={itemSelects.avatar} className={cx('product-avatar')} />
                            <div className={cx('form-product-name')}>{itemSelects.productName}</div>
                        </div>
                        <p className={cx('form-product-rate')}>
                            <p className={cx('form-rate-title')}>Chất lượng sản phẩm </p>
                            <ReactStars
                                count={5}
                                value={rating}
                                onChange={handleRatingChange}
                                size={40}
                                color1={'gray'}
                                color2={'#ffd700'}
                                half={false}
                                className={cx('star')}
                            />
                            {rating === 1 ? (
                                <p>Tệ</p>
                            ) : rating === 2 ? (
                                <p>Không hài lòng</p>
                            ) : rating === 3 ? (
                                <p>Bình thường</p>
                            ) : rating === 4 ? (
                                <p>Hài lòng</p>
                            ) : (
                                <p>Tuyệt vời</p>
                            )}
                        </p>
                        <input
                            onChange={(e) => {
                                handle(e);
                            }}
                            id="content"
                            type="text"
                            placeholder="Nội dung đánh giá"
                            value={rate.content}
                            className={cx('form-rate-input')}
                        />
                        <div className={cx('btn-action')}>
                            <Button onClick={handleRate2} className={cx('btn-back')}>
                                TRỞ LẠI
                            </Button>
                            <Link to={`/detail/${itemSelects.productId}`}>
                                <Button primary onClick={handleRateSubmit}>
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
    );
}

export default DetailBill;
