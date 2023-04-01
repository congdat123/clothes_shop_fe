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
    const [str, setStr] = useState([]);
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Products/${productId}`,
            })
            .get()
            .then((response) => {
                setData(response.data);
                console.log(response.data);
                setStr(response.data.description.split('.'));
            });
    }, []);

    return (
        <div className={cx('product')}>
            <div className={cx('product-left')}>
                <div className={cx('product-item')}>
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
                    <h3>{data.productName}</h3>
                </div>
                <div className={cx('product-instock')}>
                    <p>Số lượng còn lại: {data.inStocks}</p>
                </div>
                <div className={cx('product-price')}>
                    Giá:
                    <p> {data.price}đ</p>
                </div>
                <div className={cx('product-bst')}>
                    <img src={images.bst} />
                </div>
                <div className={cx('product-size')}>
                    Size:
                    <select>
                        <option value="X">X</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="2XL">2XL</option>
                        <option value="3XL">3XL</option>
                    </select>
                </div>
                <div className={cx('product-size')}>
                    Số lượng:
                    {/* <input value="total" type="number"></input> */}
                    <input type="number" placeholder="0" step="1" min="0" id="number" autocomplete="off" />
                </div>
                <div className={cx('add-cart')}>
                    <Link to={config.routes.cart}>
                        <Button className={cx('btn-add')} outline>
                            Thêm vào giỏ hàng
                        </Button>
                    </Link>
                    <Link to={config.routes.home}>
                        <Button className={cx('btn-buy')} primary>
                            Mua
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Detail_Product;
