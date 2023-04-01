import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { useState } from 'react';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const [currentUser, setCurrentUser] = useState(false);
    const [userName, setUserName] = useState();

    useEffect(() => {
        const storedData = localStorage.getItem('currentUser');
        if (storedData) {
            setCurrentUser(true);
        }
    }, []);

    return (
        <div>
            {currentUser ? (
                <>
                    <div>Login</div>
                </>
            ) : (
                <>
                    <div>Not Login</div>
                </>
            )}
        </div>
    );
}

export default Cart;
