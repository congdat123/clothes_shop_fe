import * as React from 'react';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import axios from 'axios';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import Search from '~/layouts/components/Search';
import config from '~/config';
import { Link } from 'react-router-dom';
import Money from '~/components/Money/Money';
import Footer from '~/layouts/components/Footer/Footer';
// import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

const cx = classNames.bind(styles);

const client = axios.create({
    baseURL: 'https://localhost:44387/api/Products',
});

function Product() {
    const [totalItems, setToltalItems] = useState(0);
    const [items, setItems] = useState([]);
    const [item1s, setItem1s] = useState([]);
    const [item2s, setItem2s] = useState([]);
    const [item3s, setItem3s] = useState([]);
    const [item4s, setItem4s] = useState([]);
    const [item5s, setItem5s] = useState([]);
    const [item6s, setItem6s] = useState([]);
    const [item7s, setItem7s] = useState([]);
    const [itemPaginations, setItemPaginations] = useState([]);
    const [currentPages, setCurrentPages] = useState(1);
    const [checkDisablePrev, setDisablePrev] = useState(false);
    const [checkDisableNext, setDisableNext] = useState(false);

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Products/viaSortingAndPagination?Page_size=8&Current_page=${currentPages}&Sort=-productId`,
            })
            .get()
            .then((response) => {
                setItemPaginations(response.data);
            });
    }, [currentPages]);
    // Xử lý phân trang
    useEffect(() => {
        if (currentPages == 1) {
            setDisablePrev(true);
        } else if (currentPages > 1) {
            setDisablePrev(false);
        }
    });

    useEffect(() => {
        const roundedNumber = Math.ceil(totalItems / 8);
        if (currentPages == roundedNumber) {
            setDisableNext(true);
        } else if (currentPages < roundedNumber) {
            setDisableNext(false);
        }
    });

    useEffect(() => {
        client.get().then((response) => {
            setItems(response.data);
            setToltalItems(response.data.length);
        });
    }, []);

    useEffect(() => {
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=1',
            })
            .get()
            .then((response) => {
                setItem1s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=2',
            })
            .get()
            .then((response) => {
                setItem2s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=3',
            })
            .get()
            .then((response) => {
                setItem3s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=4',
            })
            .get()
            .then((response) => {
                setItem4s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=5',
            })
            .get()
            .then((response) => {
                setItem5s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=6',
            })
            .get()
            .then((response) => {
                setItem6s(response.data);
            });
        axios
            .create({
                baseURL: 'https://localhost:44387/api/Products/viaCategoryId?CategoryId=7',
            })
            .get()
            .then((response) => {
                setItem7s(response.data);
            });
    }, []);

    return (
        <div className={cx('container')}>
            {/* <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <Search />
                </div>
            </header> */}
            <div className={cx('tab')}>
                <Tabs size="lg" defaultValue={0}>
                    <TabList variant="soft" color="neutral">
                        <Tab className={cx('item')}>All</Tab>
                        <Tab className={cx('item')}>Polo</Tab>
                        <Tab className={cx('item')}>Áo thun</Tab>
                        <Tab className={cx('item')}>Áo Khoác</Tab>
                        <Tab className={cx('item')}>Quần Âu</Tab>
                        <Tab className={cx('item')}>Áo sơ mi</Tab>
                        <Tab className={cx('item')}>Quần Jean</Tab>
                        <Tab className={cx('item')}>Quẩn Kaki</Tab>
                        {/* {categoryItems.map((categoryItem) => (
                            <Tab className={cx('category')}>{categoryItem.categoryName}</Tab>
                        ))} */}
                    </TabList>
                    <TabPanel value={0}>
                        <div className={cx('pagination')}>
                            <Button
                                className={cx('btn-pagination')}
                                disable={checkDisablePrev}
                                onClick={() => setCurrentPages(currentPages - 1)}
                            >
                                Prev
                            </Button>
                            <Button
                                className={cx('btn-pagination')}
                                disable={checkDisableNext}
                                onClick={() => setCurrentPages(currentPages + 1)}
                            >
                                Next
                            </Button>
                        </div>
                        <div className={cx('product')}>
                            {itemPaginations.map((item) => (
                                <Link to={`/detail/${item.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button className={cx('btn-add')} outline>
                                                Thêm
                                            </Button>
                                            <Button className={cx('btn-buy')} primary>
                                                Mua
                                            </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={1}>
                        <div className={cx('product-viaCategoryId')}>
                            {item1s.map((item1) => (
                                <Link to={`/detail/${item1.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item1.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item1.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item1.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={2}>
                        <div className={cx('product-viaCategoryId')}>
                            {item2s.map((item2) => (
                                <Link to={`/detail/${item2.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item2.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item2.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item2.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={3}>
                        <div className={cx('product-viaCategoryId')}>
                            {item3s.map((item3) => (
                                <Link to={`/detail/${item3.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item3.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item3.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item3.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={4}>
                        <div className={cx('product-viaCategoryId')}>
                            {item4s.map((item) => (
                                <Link to={`/detail/${item.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={5}>
                        <div className={cx('product-viaCategoryId')}>
                            {item5s.map((item5) => (
                                <Link to={`/detail/${item5.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item5.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item5.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item5.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={6}>
                        <div className={cx('product-viaCategoryId')}>
                            {item6s.map((item6) => (
                                <Link to={`/detail/${item6.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item6.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item6.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item6.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                    <TabPanel value={7}>
                        <div className={cx('product-viaCategoryId')}>
                            {item7s.map((item7) => (
                                <Link to={`/detail/${item7.productId}`}>
                                    <div className={cx('product-item')}>
                                        <div>
                                            <img className={cx('product-avatar')} src={item7.avatar} />
                                        </div>
                                        <div>
                                            <h5 className={cx('product-name')}>{item7.productName}</h5>
                                        </div>
                                        <div>
                                            <p className={cx('product-price')}>
                                                <Money value={item7.price} />
                                            </p>
                                        </div>
                                        <div>
                                            <Button outline>Thêm</Button>
                                            <Button primary>Mua </Button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <Footer />
        </div>
    );
}

export default Product;
