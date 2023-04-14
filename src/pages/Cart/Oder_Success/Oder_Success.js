import classNames from 'classnames/bind';
import styles from './Oder_Success.module.scss';

const cx = classNames.bind(styles);

function Oder_Success() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đặt hàng thành công</div>
        </div>
    );
}

export default Oder_Success;
