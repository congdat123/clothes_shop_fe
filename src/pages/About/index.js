import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Rating from 'react-rating';
import ReactStars from 'react-stars';

function About() {
    const [rating, setRating] = useState(0);

    function handleRatingChange(value) {
        setRating(value);
    }

    return (
        <div>
            <h2>Đánh giá sản phẩm</h2>
            <Rating emptySymbol={faStar} fullSymbol={faStar} initialRating={rating} onChange={handleRatingChange} />
            <ReactStars count={5} value={2} onChange={handleRatingChange} size={40} color2={'#ffd700'} />
            <p>Đánh giá của bạn: {rating}</p>
        </div>
    );
}
export default About;
