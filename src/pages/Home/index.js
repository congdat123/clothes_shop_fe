import axios from 'axios';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import styles from './Home.module.scss';
import Money from '~/components/Money/Money';
import Footer from '~/layouts/components/Footer/Footer';

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
                                        <div className={cx('product-price')}>
                                            Giá <Money value={item.hpPrice} />
                                        </div>
                                        {/* <div className={cx('product-description')}>
                                            <div className={cx('description-title')}>Đặc tính nổi bậc</div>
                                            <div className={cx('description-bottom')}>{item.hpDescription}</div>
                                        </div> */}
                                    </div>
                                </div>
                            ))}
                        </Fade>
                        <Footer />
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className={cx('news')}>
                        <div className={cx('row1')}>
                            <div className={cx('row1-column1')}>
                                <div className={cx('row1-column1-header')}>
                                    <a href="https://www.elle.vn/tin-thoi-trang/co-gi-thu-vi-ben-trong-phong-gym-xa-xi-cua-hermes-tai-singapore">
                                        {' '}
                                        <img
                                            src="https://www.elle.vn/wp-content/uploads/2023/04/18/525176/KYAT0958-1024x1280.jpg"
                                            className={cx('row1-column1-img')}
                                        />
                                    </a>
                                    <h2 className={cx('row1-column1-title')}>Tin thời trang</h2>
                                </div>
                                <a
                                    href="https://www.elle.vn/tin-thoi-trang/co-gi-thu-vi-ben-trong-phong-gym-xa-xi-cua-hermes-tai-singapore"
                                    className={cx('row1-column1-footer')}
                                >
                                    <h1 className={cx('row1-column2-title')}>
                                        Có gì thú vị bên trong “phòng gym xa xỉ” của Hermès tại Singapore?
                                    </h1>
                                </a>
                            </div>
                            <div className={cx('row1-column2')}>
                                <div className={cx('row1-column2-item')}>
                                    <div className={cx('row1-column2-item1')}>
                                        <a href="https://www.elle.vn/tin-thoi-trang/quynh-anh-shyn-va-anh-tu-dien-thiet-ke-kenzo-khoe-phong-cach-cung-dan-sao-chau-a">
                                            <img
                                                className={cx('row1-column2-item1-img')}
                                                src="https://www.elle.vn/wp-content/uploads/2023/04/17/524986/thumb-kenzo-2-490x276.png"
                                            />
                                        </a>
                                    </div>
                                    <div className={cx('row1-column2-item2')}>
                                        <a
                                            className={cx('row1-column2-item2-title')}
                                            href="https://www.elle.vn/tin-thoi-trang/quynh-anh-shyn-va-anh-tu-dien-thiet-ke-kenzo-khoe-phong-cach-cung-dan-sao-chau-a"
                                        >
                                            Quỳnh Anh Shyn và Anh Tú diện thiết kế KENZO, khoe phong cách cùng dàn sao
                                            châu Á
                                        </a>
                                        <p className={cx('row1-column2-item2-content')}>
                                            Mặc áo “Voi - Hổ”, Quỳnh Anh Shyn và Anh Tú khoe phong cách thời trang đậm
                                            chất đường phố tại sự...{' '}
                                        </p>
                                    </div>
                                </div>
                                <hr className={cx('hr-border')} />
                                <div className={cx('row1-column2-item')}>
                                    <div className={cx('row1-column2-item1')}>
                                        <a href="https://www.elle.vn/tin-thoi-trang/hoa-hoi-rich-kid-voi-bo-suu-tap-ket-hop-giua-uniqlo-va-jw-anderson">
                                            <img
                                                className={cx('row1-column2-item1-img')}
                                                src="https://www.elle.vn/wp-content/uploads/2023/04/12/524301/01-UNIQLO-Ket-Hop-Cung-JW-ANDERSON-Ra-Mat-BST-Dac-Biet-tu-30_03-in-dam-dau-an-phong-cach-co-dien-dac-trung-cua-cac-Truong-Dai-Hoc-Anh-Quoc.--490x392.png"
                                            />
                                        </a>
                                    </div>
                                    <div className={cx('row1-column2-item2')}>
                                        <a
                                            className={cx('row1-column2-item2-title')}
                                            href="https://www.elle.vn/tin-thoi-trang/hoa-hoi-rich-kid-voi-bo-suu-tap-ket-hop-giua-uniqlo-va-jw-anderson"
                                        >
                                            Hoá hội "rich kid" với bộ sưu tập kết hợp giữa UNIQLO và JW ANDERSON
                                        </a>
                                        <p className={cx('row1-column2-item2-content')}>
                                            Làm mới những bộ trang phục học đường cổ điển đặc trưng thông qua góc nhìn
                                            tươi vui và thanh...
                                        </p>
                                    </div>
                                </div>
                                <hr className={cx('hr-border')} />

                                <div className={cx('row1-column2-item')}>
                                    <div className={cx('row1-column2-item1')}>
                                        <a href="https://www.elle.vn/tin-thoi-trang/jimin-bts-trong-chien-dich-this-is-tiffany-cua-tiffany-co">
                                            <img
                                                className={cx('row1-column2-item1-img')}
                                                src="https://www.elle.vn/wp-content/uploads/2023/04/11/524128/Untitled-design-490x276.png"
                                            />
                                        </a>
                                    </div>
                                    <div className={cx('row1-column2-item2')}>
                                        <a
                                            className={cx('row1-column2-item2-title')}
                                            href="https://www.elle.vn/tin-thoi-trang/jimin-bts-trong-chien-dich-this-is-tiffany-cua-tiffany-co"
                                        >
                                            Jimin (BTS) đồng hành cùng Zoë Kravitz và Gal Gadot trong chiến dịch quảng
                                            cáo "This is Tiffany"
                                        </a>
                                        <p className={cx('row1-column2-item2-content')}>
                                            Tiffany & Co. ra mắt chiến dịch quảng cáo “This Is Tiffany” với sự tham gia
                                            của các gương mặt...
                                        </p>
                                    </div>
                                </div>
                                <hr className={cx('hr-border')} />

                                <div className={cx('row1-column2-item')}>
                                    <div className={cx('row1-column2-item1')}>
                                        <a href="https://www.elle.vn/tin-thoi-trang/anne-hathaway-hoa-thien-nga-den-trong-bst-moi-nhat-cua-versace-versace-icons">
                                            <img
                                                className={cx('row1-column2-item1-img')}
                                                src="https://www.elle.vn/wp-content/uploads/2023/04/05/523462/versace-icons-490x276.png"
                                            />
                                        </a>
                                    </div>
                                    <div className={cx('row1-column2-item2')}>
                                        <a
                                            className={cx('row1-column2-item2-title')}
                                            href="https://www.elle.vn/tin-thoi-trang/anne-hathaway-hoa-thien-nga-den-trong-bst-moi-nhat-cua-versace-versace-icons"
                                        >
                                            Anne Hathaway hoá "thiên nga đen" trong BST mới nhất của Versace - Versace
                                            Icons
                                        </a>
                                        <p className={cx('row1-column2-item2-content')}>
                                            Kỷ nguyên thời trang của "yêu nữ hàng hiệu" Anne Hathaway vừa bước sang một
                                            trang mới.
                                        </p>
                                    </div>
                                </div>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>
                        <div className={cx('row2')}>
                            <a
                                className={cx('row2-column1')}
                                href="https://www.elle.vn/tin-thoi-trang/co-gi-thu-vi-ben-trong-phong-gym-xa-xi-cua-hermes-tai-singapore"
                            >
                                <img
                                    className={cx('row2-column1-img')}
                                    src="https://www.elle.vn/wp-content/uploads/2023/04/18/525176/hermesfit-2-445x250.png"
                                />
                            </a>
                            <div className={cx('row2-column2')}>
                                <a
                                    className={cx('row2-column2-title')}
                                    href="https://www.elle.vn/tin-thoi-trang/co-gi-thu-vi-ben-trong-phong-gym-xa-xi-cua-hermes-tai-singapore"
                                >
                                    Có gì thú vị bên trong “phòng gym xa xỉ” của Hermès tại Singapore?
                                </a>
                                <p className={cx('row2-column2-content')}>
                                    Hermès có lẽ là một trong số những thương hiệu xa xỉ “chiều khách” bậc nhất khi
                                    thường xuyên tổ...
                                </p>
                                <p className={cx('row2-column2-from')}>ELLE FASHION TEAM</p>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>
                        <div className={cx('row2')}>
                            <a
                                className={cx('row2-column1')}
                                href="https://www.elle.vn/tin-thoi-trang/quynh-anh-shyn-va-anh-tu-dien-thiet-ke-kenzo-khoe-phong-cach-cung-dan-sao-chau-a"
                            >
                                <img
                                    className={cx('row2-column1-img')}
                                    src="https://www.elle.vn/wp-content/uploads/2023/04/17/524986/thumb-kenzo-2-445x250.png"
                                />
                            </a>
                            <div className={cx('row2-column2')}>
                                <a
                                    className={cx('row2-column2-title')}
                                    href="https://www.elle.vn/tin-thoi-trang/quynh-anh-shyn-va-anh-tu-dien-thiet-ke-kenzo-khoe-phong-cach-cung-dan-sao-chau-a"
                                >
                                    Quỳnh Anh Shyn và Anh Tú diện thiết kế KENZO, khoe phong cách cùng dàn sao châu Á
                                </a>
                                <p className={cx('row2-column2-content')}>
                                    Mặc áo “Voi - Hổ”, Quỳnh Anh Shyn và Anh Tú khoe phong cách thời trang đậm chất
                                    đường phố tại sự...
                                </p>
                                <p className={cx('row2-column2-from')}>ELLE FASHION TEAM</p>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>

                        <div className={cx('row2')}>
                            <a
                                className={cx('row2-column1')}
                                href="https://www.elle.vn/tin-thoi-trang/hoa-hoi-rich-kid-voi-bo-suu-tap-ket-hop-giua-uniqlo-va-jw-anderson"
                            >
                                <img
                                    className={cx('row2-column1-img')}
                                    src="https://www.elle.vn/wp-content/uploads/2023/04/12/524301/01-UNIQLO-Ket-Hop-Cung-JW-ANDERSON-Ra-Mat-BST-Dac-Biet-tu-30_03-in-dam-dau-an-phong-cach-co-dien-dac-trung-cua-cac-Truong-Dai-Hoc-Anh-Quoc.--490x392.png"
                                />
                            </a>
                            <div className={cx('row2-column2')}>
                                <a
                                    className={cx('row2-column2-title')}
                                    href="https://www.elle.vn/tin-thoi-trang/hoa-hoi-rich-kid-voi-bo-suu-tap-ket-hop-giua-uniqlo-va-jw-anderson"
                                >
                                    Hoá hội "rich kid" với bộ sưu tập kết hợp giữa UNIQLO và JW ANDERSON
                                </a>
                                <p className={cx('row2-column2-content')}>
                                    Làm mới những bộ trang phục học đường cổ điển đặc trưng thông qua góc nhìn tươi vui
                                    và thanh...
                                </p>
                                <p className={cx('row2-column2-from')}>ELLE FASHION TEAM</p>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>
                        <div className={cx('row2')}>
                            <a
                                className={cx('row2-column1')}
                                href="https://www.elle.vn/tin-thoi-trang/jimin-bts-trong-chien-dich-this-is-tiffany-cua-tiffany-co"
                            >
                                <img
                                    className={cx('row2-column1-img')}
                                    src="https://www.elle.vn/wp-content/uploads/2023/04/11/524128/Untitled-design-490x276.png"
                                />
                            </a>
                            <div className={cx('row2-column2')}>
                                <a
                                    className={cx('row2-column2-title')}
                                    href="https://www.elle.vn/tin-thoi-trang/jimin-bts-trong-chien-dich-this-is-tiffany-cua-tiffany-co"
                                >
                                    Jimin (BTS) đồng hành cùng Zoë Kravitz và Gal Gadot trong chiến dịch quảng cáo "This
                                    is Tiffany"
                                </a>
                                <p className={cx('row2-column2-content')}>
                                    Tiffany & Co. ra mắt chiến dịch quảng cáo “This Is Tiffany” với sự tham gia của các
                                    gương mặt...
                                </p>
                                <p className={cx('row2-column2-from')}>ELLE FASHION TEAM</p>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>
                        <div className={cx('row2')}>
                            <a
                                className={cx('row2-column1')}
                                href="https://www.elle.vn/tin-thoi-trang/anne-hathaway-hoa-thien-nga-den-trong-bst-moi-nhat-cua-versace-versace-icons"
                            >
                                <img
                                    className={cx('row2-column1-img')}
                                    src="https://www.elle.vn/wp-content/uploads/2023/04/05/523462/versace-icons-445x250.png"
                                />
                            </a>
                            <div className={cx('row2-column2')}>
                                <a
                                    className={cx('row2-column2-title')}
                                    href="https://www.elle.vn/tin-thoi-trang/anne-hathaway-hoa-thien-nga-den-trong-bst-moi-nhat-cua-versace-versace-icons"
                                >
                                    Anne Hathaway hoá "thiên nga đen" trong BST mới nhất của Versace - Versace Icons
                                </a>
                                <p className={cx('row2-column2-content')}>
                                    Kỷ nguyên thời trang của "yêu nữ hàng hiệu" Anne Hathaway vừa bước sang một trang
                                    mới.
                                </p>
                                <p className={cx('row2-column2-from')}>ELLE FASHION TEAM</p>
                                <hr className={cx('hr-border')} />
                            </div>
                        </div>
                    </div>
                    <Footer />
                </TabPanel>
            </Tabs>
        </div>
    );
}

export default Home;
