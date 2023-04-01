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
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
