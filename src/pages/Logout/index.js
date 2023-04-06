import { useEffect } from 'react';

function LogOut() {
    useEffect(() => {
        let item = localStorage.getItem('token');
        if (item) {
            localStorage.clear();
            // setCurrentUser(false);
            window.location.href = '/';
        }
    });
    return <div></div>;
}

export default LogOut;
