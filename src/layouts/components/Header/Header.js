import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';

import config from '~/config';
import styles from './Header.module.scss';
import images from '~/assets/images';
import Menu from '~/components/Popper/Menu/Menu';
import { CircleQuestion, LogOut, UserIcon } from '~/components/Icons';
import Image from '~/components/Image/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { MenuItem } from '../Sidebar/Menu';
import { useEffect } from 'react';
import Button from '~/components/Button';
import axios from 'axios';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <AiOutlineLogin />,
        title: 'Log In',
        to: '/login',
    },
    {
        icon: <AiOutlineLogout />,
        title: 'Register',
        to: '/register',
    },
];

function Header() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userName, setUserName] = useState();
    const [data, setData] = useState();
    const [items, setItems] = useState([]);
    const [numberItem, setNumberItem] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem('username');
        const storedData2 = localStorage.getItem('currentUser');
        if (storedData) {
            setData(JSON.parse(storedData));
            setUserName(JSON.parse(storedData));
        }
        if (storedData2) {
            setCurrentUser(true);
        }
    }, []);

    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Account/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setItems(response.data);
            });
    }, [userName]);
    useEffect(() => {
        axios
            .create({
                baseURL: `https://localhost:44387/api/Carts/viaUserName?UserName=${userName}`,
            })
            .get()
            .then((response) => {
                setNumberItem(response.data);
            })
            .catch((error) => console.error(error));
    });

    // Handle login
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                // Handle changel language
                break;
            default:
        }
    };
    const handleLogout = () => {
        let item = localStorage.getItem('token');
        if (item) {
            localStorage.clear();
            setCurrentUser(false);
        }
    };

    const userMenu = [
        {
            icon: <UserIcon />,
            title: 'Thông tin cá nhân',
            to: `/profile/${userName}`,
        },
        {
            icon: <CircleQuestion />,
            title: 'Lịch sử mua hàng',
            to: '/history/order',
        },
        {
            icon: <LogOut />,
            title: 'Đăng xuất',
            to: '/logout',
        },
    ];

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo1} alt="Shop" className={cx('logo-img')} />
                </Link>
                <div className={cx('menu')}>
                    <Tippy delay={(0, 200)} content="Home" placement="bottom">
                        <MenuItem title="Home" to={config.routes.home}></MenuItem>
                    </Tippy>
                    <Tippy delay={(0, 200)} content="Product" placement="bottom">
                        <MenuItem title="Product" to={config.routes.product} />
                    </Tippy>
                    <Tippy delay={(0, 200)} content="About" placement="bottom">
                        <MenuItem title="About" to={config.routes.about} />
                    </Tippy>
                    <Tippy delay={(0, 200)} content="Contact" placement="bottom">
                        <MenuItem title="Contact" to={config.routes.contact} />
                    </Tippy>
                </div>

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Link to={config.routes.cart}>
                                <Tippy delay={(0, 200)} content="Cart" placement="bottom">
                                    <button className={cx('action-btn')}>
                                        <AiOutlineShoppingCart />
                                        {/* Số lượng đơn hàng trong giỏ hàng */}
                                        <span className={cx('badge')}>{numberItem.length}</span>
                                    </button>
                                </Tippy>
                            </Link>
                        </>
                    ) : (
                        <Tippy delay={(0, 200)} content="Not Log In" placement="bottom">
                            <button className={cx('action-btn')}>
                                <AiOutlineShoppingCart />
                            </button>
                        </Tippy>
                    )}
                    {currentUser ? (
                        <>
                            {items.map((item) => (
                                <Menu items={userMenu}>
                                    <Image src={item.avatar} className={cx('user-avatar')} alt="Nguyen Van A" />
                                </Menu>
                            ))}
                        </>
                    ) : (
                        <Menu items={MENU_ITEMS}>
                            <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faUserCircle} />
                            </button>
                        </Menu>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
