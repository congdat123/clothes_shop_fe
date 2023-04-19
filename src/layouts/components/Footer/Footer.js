import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('item1')}>
                <img src={images.logo2} className={cx('logo')} />
                <p className={cx('after-logo')}>By CLOTHES SHOP &copy; ALL RIGHTS REVERVED</p>
            </div>
            <div className={cx('item1')}>
                <div className={cx('content')}>
                    <h3>Thương hiệu cửa hàng</h3>
                    <Link to={config.routes.home}>Hệ thống cửa hàng</Link>
                </div>
            </div>
            <div className={cx('item1')}>
                <div className={cx('content')}>
                    <h3>Chính sách</h3>
                    <Link to={config.routes.policyPayment}> Hình thức thanh toán</Link>
                    <Link to={config.routes.policySecurity}> Chính sách bảo mật</Link>
                    <Link to={config.routes.policyShipping}> Chính sách giao hàng</Link>
                </div>
            </div>
            <div className={cx('item1')}>
                <div className={cx('content')}>
                    <h3>Các nền tảng khác</h3>
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faYoutube} className={cx('icon-item')} />
                        <FontAwesomeIcon icon={faFacebook} className={cx('icon-item')} />
                        <FontAwesomeIcon icon={faInstagram} className={cx('icon-item')} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
