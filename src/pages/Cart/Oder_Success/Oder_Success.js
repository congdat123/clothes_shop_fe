import classNames from 'classnames/bind';
import styles from './Oder_Success.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);

function Oder_Success() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Đặt hàng thành công</div>

            <FontAwesomeIcon
                className={cx('loader-success')}
                icon={faCircleCheck}
                beatFade
                size="2xl"
                style={{ color: '#eed6cf' }}
            />
            <div className={cx('custom-loader')}></div>
        </div>
    );
}

export default Oder_Success;
