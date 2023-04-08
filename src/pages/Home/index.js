import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const [item, setItem] = useState([]);
    const [str, setStr] = useState([]);
    const [arr, setArr] = useState([[]]);
    useEffect(() => {
        axios
            .create({
                baseURL: 'https://localhost:44387/api/HotProducts',
            })
            .get()
            .then((response) => {
                setItem(response.data);
                setStr(response.data);
            });
    }, []);

    useEffect(() => {
        str.map((item) => setArr([...arr, item.hpDescription]));
    }, [str]);
    useEffect(() => {
        arr.map((item) => console.log(item));
    }, [arr]);

    return (
        <div className={cx('wrapper')}>
            <Tabs>
                <TabList className={cx('title-item')}>
                    <Tab className={cx('item')}>Hot Product</Tab>
                    <Tab className={cx('item')}>News</Tab>
                </TabList>

                <TabPanel>
                    <div className={cx('slide-container')}>
                        <Fade>
                            {item.map((item, index) => (
                                <div className={cx('slide-item')}>
                                    <div className={cx('each-fade')} key={index}>
                                        <div className={cx('image-container')}>
                                            <img src={item.hpAvatar} className={cx('image-item')} />
                                        </div>
                                    </div>
                                    <div className={cx('caption-slide')}>
                                        <div className={cx('product-name')}>{item.hotProductName}</div>
                                        <div className={cx('product-price')}>Giá {item.hpPrice} VNĐ</div>
                                        {/* <div className={cx('product-description')}>
                                            <div className={cx('description-title')}>Đặc tính nổi bậc</div>
                                            <div className={cx('description-bottom')}>{item.hpDescription}</div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </Fade>
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Home;
