import classNames from 'classnames/bind';
import styles from './Payment.module.scss';
import Footer from '~/layouts/components/Footer/Footer';

const cx = classNames.bind(styles);

function Payment() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('header')}>Hình thức thanh toán</h2>
                </div>
                <div className={cx('content')}>
                    <div className={cx('cod')}>
                        <h3 className={cx('cod-header')}>Thanh toán sau khi nhận hàng</h3>
                        <p className={cx('cod-content')}>
                            Khách hàng vui lòng thanh toán trước khi nhận hàng. Sau khi nhận hàng khách hàng có thể kiểm
                            tra hàng.
                        </p>
                    </div>
                    <div className={cx('payment')}>
                        <h3 className={cx('payment-header')}>Thanh toán qua ngân hàng</h3>
                        <p className={cx('payment-content')}>
                            Khách hàng vui lòng thanh toán quan ngân hàng với thông tin cần khách hàng cần chuyển như
                            sau:
                        </p>
                        <ul className={cx('payment-ul')}>
                            <li className={cx('payment-li')}>Chủ tài khoản: Nguyễn Văn A</li>
                            <li className={cx('payment-li')}>Số tài khoản: 2002220130853</li>
                            <li className={cx('payment-li')}>Ngân hàng nông nghiệp Agribank</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Payment;
