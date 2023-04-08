import classNames from 'classnames/bind';
import styles from './DetailBill.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function DetailBill() {
    const { billId } = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/CartDetails/SearchBill?BillId=${billId}`,
            })
            .get()
            .then((response) => {
                setItems(response.data);
            });
    });

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
                        <p className={cx('product-price')}>Giá: {item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default DetailBill;
