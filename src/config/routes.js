const routes = {
    home: '/',
    product: '/product',
    profile: '/profile/:userName',
    about: '/about',
    contact: '/contact',
    detail: '/detail/:productId',
    login: '/login',
    register: 'register',
    editProfile: '/edit/:userId',
    cart: '/cart',
    logout: '/logout',
    history: '/history/order',
    detailBill: '/detail/bill/:billId',
    checkout: '/checkout',
    orderSuccess: '/order/success',
    paymentTransfer: '/payment/transfer',
};

export default routes;
