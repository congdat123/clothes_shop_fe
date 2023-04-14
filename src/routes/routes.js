import config from '~/config';

// Layouts

import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Profile from '~/pages/Profile';
import About from '~/pages/About';
import Contact from '~/pages/Contact/Contact';
import Detail from '~/pages/Detail_Product';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import EditProfile from '~/pages/EditProfile';
import Cart from '~/pages/Cart';
import LogOut from '~/pages/Logout';
import History from '~/pages/History_buy';
import DetailBill from '~/pages/History_buy/DetailBill';
import Check_Out from '~/pages/Cart/Check_Out';
import Oder_Success from '~/pages/Cart/Oder_Success';
import Payment_Transfer from '~/pages/Cart/Payment_Transfer';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.product, component: Product },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.about, component: About },
    { path: config.routes.contact, component: Contact },
    { path: config.routes.detail, component: Detail },
    { path: config.routes.login, component: Login },
    { path: config.routes.register, component: Register },
    { path: config.routes.editProfile, component: EditProfile },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.logout, component: LogOut },
    { path: config.routes.history, component: History },
    { path: config.routes.detailBill, component: DetailBill },
    { path: config.routes.checkout, component: Check_Out },
    { path: config.routes.orderSuccess, component: Oder_Success },
    { path: config.routes.paymentTransfer, component: Payment_Transfer },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
