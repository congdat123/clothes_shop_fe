import classNames from 'classnames/bind';
import { MdOutlineDescription, MdDescription } from 'react-icons/md';

import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { FollowActiveIcon, FollowIcon, HomeActiveIcon, HomeIcon, LiveActiveIcon, LiveIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Sidebar() {
    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Product"
                    to={config.routes.product}
                    icon={<FollowIcon />}
                    activeIcon={<FollowActiveIcon />}
                />
                <MenuItem
                    title="Category"
                    to={config.routes.category}
                    icon={<LiveIcon />}
                    activeIcon={<LiveActiveIcon />}
                />
                <MenuItem
                    title="About"
                    to={config.routes.about}
                    icon={<MdOutlineDescription />}
                    activeIcon={<MdDescription />}
                />
            </Menu>
        </aside>
    );
}

export default Sidebar;
