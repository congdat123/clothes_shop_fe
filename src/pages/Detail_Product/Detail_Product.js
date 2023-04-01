import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import config from '~/config';

import styles from './Detail_Product.module.scss';

const cx = classNames.bind(styles);

function Detail_Product() {
    const { productId } = useParams();
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState();
    const [dataAddCart, setDataAddCart] = useState({
        quantity: '1',
    });
    const [str, setStr] = useState([]);
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Products/${productId}`,
            })
            .get()
            .then((response) => {
                setData(response.data);
                // console.log(response.data);
                setStr(response.data.description.split('.'));
            });
    }, []);
    useEffect(() => {
        const storedData = localStorage.getItem('username');
        if (storedData) {
            setUserName(JSON.parse(storedData));
        }
    });

    function handle(e) {
        const newdata = { ...dataAddCart };
        newdata[e.target.id] = e.target.value;
        setDataAddCart(newdata);
        console.log(newdata);
    }
    const handleAddCart = () => {
        axios
            .post(`https://localhost:44387/api/Carts`, {
                productId: productId,
                productName: data.productName,
                avatar: data.avatar,
                price: data.price,
                size: dataAddCart.size,
                quantity: dataAddCart.quantity,
                userName: userName,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className={cx('product')}>
            <div className={cx('product-left')}>
                <div className={cx('product-item')}>
                    <div>
                        <img className={cx('product-image')} src={data.avatar} value={dataAddCart.avatar} />
                    </div>
                    <div>
                        <img className={cx('product-image')} src={data.img1} />
                    </div>
                    <div>
                        <img className={cx('product-image')} src={data.img2} />
                    </div>
                    <div>
                        <img className={cx('product-image')} src={data.img3} />
                    </div>
                    <div>
                        <img className={cx('product-image')} src={data.img4} />
                    </div>
                </div>
                <div className={cx('product-description')}>
                    <div className={cx('description-title')}>Đặc tính nổi bậc</div>
                    <div className={cx('description-bottom')}>
                        {str.map((item, index) => (
                            <p className={cx('description-dd')} key={index}>
                                {item.trim()}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('product-right')}>
                <div className={cx('product-name')}>
                    <h3 value={dataAddCart.productName}>{data.productName}</h3>
                </div>
                <div className={cx('product-instock')}>
                    <p>Số lượng còn lại: {data.inStocks}</p>
                </div>
                <div className={cx('product-price')}>
                    Giá:
                    <p value={dataAddCart.price}> {data.price}đ</p>
                </div>
                <div className={cx('product-bst')}>
                    <img src={images.bst} />
                </div>
                <div className={cx('product-size')}>
                    Size:
                    <select
                        onChange={(e) => {
                            handle(e);
                        }}
                        id="size"
                        value={dataAddCart.size}
                    >
                        <option value="28">28</option>
                        <option value="29">29</option>
                        <option value="30">30</option>
                        <option value="31">31</option>
                        <option value="32">32</option>
                    </select>
                </div>
                <div className={cx('product-quantity')}>
                    Số lượng:
                    {/* <input value="total" type="number"></input> */}
                    <input
                        onChange={(e) => {
                            handle(e);
                        }}
                        type="number"
                        placeholder="1"
                        step="1"
                        min="1"
                        id="quantity"
                        value={dataAddCart.quantity}
                    />
                </div>
                <div className={cx('add-cart')}>
                    <Link to={config.routes.cart}>
                        <Button className={cx('btn-add')} outline onClick={handleAddCart}>
                            Thêm vào giỏ hàng
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Detail_Product;
