import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Image from '~/components/Image/Image';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
    return (
        <Link to={`/detail/${data.productId}`} className={cx('wrapper')}>
            <Image className={cx('avatar')} src={data.avatar} alt={data.productName}></Image>
            <div className={cx('info')}>
                <h4 className={cx('product-name')}>
                    <span>{data.productName}</span>
                    {/* {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />} */}
                </h4>
                <span className={cx('price')}>{data.price}đ</span>
            </div>
        </Link>
    );
}

ProductItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default ProductItem;
