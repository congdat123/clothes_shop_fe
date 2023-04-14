import classNames from 'classnames/bind';
import styles from './Payment_Transfer.module.scss';

const cx = classNames.bind(styles);

function Payment_Transfer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Thanh toán chuyển khoản</div>
        </div>
    );
}

export default Payment_Transfer;
