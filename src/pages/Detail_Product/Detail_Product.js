import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import images from '~/assets/images';
import Button from '~/components/Button';
import config from '~/config';

import styles from './Detail_Product.module.scss';
import Moment from 'react-moment';
import ReactStars from 'react-stars';
import Money from '~/components/Money/Money';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { Rating } from 'react-simple-star-rating';

const cx = classNames.bind(styles);

function Detail_Product() {
    const { productId } = useParams();
    const [data, setData] = useState([]);
    const [userName, setUserName] = useState();
    const [dataAddCart, setDataAddCart] = useState({
        size: 28,
        quantity: '1',
    });
    const [productReviews, setProductReviews] = useState([]);
    const [productReview1Stars, setProductReview1Stars] = useState([]);
    const [productReview2Stars, setProductReview2Stars] = useState([]);
    const [productReview3Stars, setProductReview3Stars] = useState([]);
    const [productReview4Stars, setProductReview4Stars] = useState([]);
    const [productReview5Stars, setProductReview5Stars] = useState([]);
    const [totalStart, setTotalStart] = useState(0);

    const [isTabDisabled1, setIsTabDisable1] = useState(false);
    const [isTabDisabled2, setIsTabDisable2] = useState(false);
    const [isTabDisabled3, setIsTabDisable3] = useState(false);
    const [isTabDisabled4, setIsTabDisable4] = useState(false);
    const [isTabDisabled5, setIsTabDisable5] = useState(false);

    const [str, setStr] = useState([]);
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Products/${productId}`,
            })
            .get()
            .then((response) => {
                setData(response.data);
                setStr(response.data.description.split('.'));
            });
    }, [productId]);

    useEffect(() => {
        const storedData = localStorage.getItem('username');
        if (storedData) {
            setUserName(JSON.parse(storedData));
        }
        const fetchApi = async () => {
            axios
                .create({
                    baseURL: `https://localhost:44387/api/ProductReviews/viaProductId?ProductId=${productId}`,
                })
                .get()
                .then((response) => {
                    setProductReviews(response.data);
                    setTotalStart(response.data.reduce((accumulator, item) => accumulator + item.star, 0));
                });
        };
        fetchApi();
    }, [productId]);

    console.log((totalStart / productReviews.length).toFixed(1));
    //Lấy đánh giá theo từ loại sao đánh giá
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/ProductReviews/viaStar?Star=1&ProductId=${productId}`,
            })
            .get()
            .then((response) => {
                setProductReview1Stars(response.data);
            });
        axios
            .create({
                baseURL: `https://localhost:44387/api/ProductReviews/viaStar?Star=2&ProductId=${productId}`,
            })
            .get()
            .then((response) => {
                setProductReview2Stars(response.data);
            });
        axios
            .create({
                baseURL: `https://localhost:44387/api/ProductReviews/viaStar?Star=3&ProductId=${productId}`,
            })
            .get()
            .then((response) => {
                setProductReview3Stars(response.data);
            });
        axios
            .create({
                baseURL: `https://localhost:44387/api/ProductReviews/viaStar?Star=4&ProductId=${productId}`,
            })
            .get()
            .then((response) => {
                setProductReview4Stars(response.data);
            });
        axios
            .create({
                baseURL: `https://localhost:44387/api/ProductReviews/viaStar?Star=5&ProductId=${productId}`,
            })
            .get()
            .then((response) => {
                setProductReview5Stars(response.data);
            });
    }, []);
    // Kiểm tra loại sao đánh giá có hay không
    useEffect(() => {
        const checkRate = async () => {
            if (productReview1Stars.length === 0) {
                setIsTabDisable1((isTabDisabled1) => !isTabDisabled1);
            }
            if (productReview2Stars.length === 0) {
                setIsTabDisable2((isTabDisabled2) => !isTabDisabled2);
            }
            if (productReview3Stars.length === 0) {
                setIsTabDisable3((isTabDisabled3) => !isTabDisabled3);
            }
            if (productReview4Stars.length === 0) {
                setIsTabDisable4((isTabDisabled4) => !isTabDisabled4);
            }
            if (productReview5Stars.length === 0) {
                setIsTabDisable5((isTabDisabled5) => !isTabDisabled5);
            }
        };
        checkRate();
    }, [
        productReview1Stars.length,
        productReview2Stars.length,
        productReview3Stars.length,
        productReview4Stars.length,
        productReview5Stars.length,
    ]);

    function handle(e) {
        const newdata = { ...dataAddCart };
        newdata[e.target.id] = e.target.value;
        setDataAddCart(newdata);
        console.log(newdata);
    }
    // Xử lý thêm vào giỏ hàng
    const handleAddCart = () => {
        axios
            .post(`https://localhost:44387/api/Carts`, {
                productId: productId,
                productName: data.productName,
                avatar: data.avatar,
                price: data.price * dataAddCart.quantity,
                size: dataAddCart.size,
                quantity: dataAddCart.quantity,
                userName: userName,
            })
            .then((res) => {
                console.log(res.data);
            });
    };

    return (
        <div className={cx('wrapper')}>
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
                    <div className={cx('product-review')}>
                        <div className={cx('description-title')}>Đánh giá sản phẩm</div>
                        <div className={cx('rate-total')}>
                            <div className={cx('rate-total-number')}>
                                <div className={cx('top')}>
                                    <p className={cx('rate-total-number-first')}>
                                        {(totalStart / productReviews.length).toFixed(1)}
                                    </p>
                                    <p className={cx('rate-total-number-last')}> trên 5</p>
                                </div>
                                <div className={cx('bot')}>
                                    {/* <ReactStars
                                        edit={false}
                                        count={5}
                                        value={(totalStart / productReviews.length).toFixed(1)}
                                        size={30}
                                        half={true}
                                        color2={'red'}
                                    /> */}
                                    <Rating
                                        initialValue={(totalStart / productReviews.length).toFixed(1)}
                                        allowFraction={true}
                                        // allowHover={false}
                                        // disableFillHover={true}
                                        fillColor="#ee4d2d"
                                        size={30}
                                        readonly={true}
                                    />
                                </div>
                            </div>
                            <Tabs size="lg" defaultValue={0}>
                                <TabList variant="soft" color="neutral" className={cx('rate-title')}>
                                    <Tab className={cx('rate-filter')}>Tất cả</Tab>
                                    <Tab className={cx('rate-filter')} disabled={isTabDisabled5}>
                                        5 Sao ({productReview5Stars.length})
                                    </Tab>
                                    <Tab className={cx('rate-filter')} disabled={isTabDisabled4}>
                                        4 Sao ({productReview4Stars.length})
                                    </Tab>
                                    <Tab className={cx('rate-filter')} disabled={isTabDisabled3}>
                                        3 Sao ({productReview3Stars.length})
                                    </Tab>
                                    <Tab className={cx('rate-filter')} disabled={isTabDisabled2}>
                                        2 Sao ({productReview2Stars.length})
                                    </Tab>
                                    <Tab className={cx('rate-filter')} disabled={isTabDisabled1}>
                                        1 Sao ({productReview1Stars.length})
                                    </Tab>
                                </TabList>
                                <TabPanel value={0}>
                                    {productReviews.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReviews.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'#ee4d2d'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào!</p>
                                    )}
                                </TabPanel>
                                <TabPanel value={1}>
                                    {productReview5Stars.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReview5Stars.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'red'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào 5 sao</p>
                                    )}
                                </TabPanel>
                                <TabPanel value={2}>
                                    {productReview4Stars.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReview4Stars.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'red'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào 4 sao</p>
                                    )}
                                </TabPanel>
                                <TabPanel value={3}>
                                    {productReview3Stars.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReview3Stars.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'red'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào 3 sao</p>
                                    )}
                                </TabPanel>
                                <TabPanel value={4}>
                                    {productReview2Stars.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReview2Stars.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'red'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào 2 sao</p>
                                    )}
                                </TabPanel>
                                <TabPanel value={1}>
                                    {productReview1Stars.length !== 0 ? (
                                        <div className={cx('review')}>
                                            {productReview1Stars.map((item) => (
                                                <div className={cx('review-item')}>
                                                    <div className={cx('review-left')}>
                                                        <img src={item.avatar} className={cx('avatar')} />
                                                    </div>
                                                    <div className={cx('review-right')}>
                                                        <p className={cx('username')}>{item.userName}</p>
                                                        <ReactStars
                                                            edit={false}
                                                            count={5}
                                                            value={item.star}
                                                            size={16}
                                                            color2={'red'}
                                                        />
                                                        <Moment format="lll" className={cx('date-rate')}>
                                                            {item.dateRate}
                                                        </Moment>
                                                        <p className={cx('content')}>{item.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Sản phẩm chưa có đánh giá nào 1 sao</p>
                                    )}
                                </TabPanel>
                            </Tabs>
                        </div>

                        {/* <Button outline>Đánh giá sản phẩm</Button> */}
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
                        <p value={dataAddCart.price}>
                            {' '}
                            <Money value={data.price} />
                        </p>
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
                            <option selected value="28">
                                28
                            </option>
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
        </div>
    );
}

export default Detail_Product;
