import classNames from 'classnames/bind';
import styles from './Security.module.scss';
import Footer from '~/layouts/components/Footer/Footer';

const cx = classNames.bind(styles);

function Security() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Chính sách bảo mật thông tin thanh toán</h2>
                <p className={cx('content1')}>
                    Luôn coi trọng việc bảo mật thông tin, vì vậy, Chúng tôi ưu tiên sử dụng các biện pháp tốt nhất để
                    bảo vệ thông tin cá nhân của khách hàng, đảm bảo cho quá trình thanh toán diễn ra an toàn nhất.
                </p>
                <h3 className={cx('title2')}>Trách nhiệm bảo mật thanh toán của chúng tôi</h3>
                <ul className={cx('content2')}>
                    <li>
                        Chúng tôi luôn coi trọng việc bảo mật thông tin vì vậy chúng tôi thưởng sử dụng các biện pháp
                        tốt nhất để bảo vệ thông tin cá nhân của khách hàng trong quá trình thanh toán.
                    </li>
                    <li>
                        Giảm thiểu và đảm bảo tốt nhất việc người ngoài sử dụng các chương trình, công cụ hay các hình
                        thức để can thiệp vào hệ thống và làm thay đổi cấu trúc dữ liệu
                    </li>
                    <li>
                        Cá nhân hay tổ chức có hành vi can thiệp, phá hoại hay xâm nhập vào dữ liệu của hệ thống sẽ bị
                        tước bỏ mọi quyền lợi cũng như bị truy tố trước pháp luật nếu cần thiết.
                    </li>
                    <li>
                        Tất cả thông tin giao dịch đều được bảo mật trừ trường hợp phải thực hiện theo yêu cầu của cơ
                        quan Nhà nước có thẩm quyền
                    </li>
                </ul>
                <h3 className={cx('title2')}>Mục đích áp dụng</h3>
                <ul className={cx('content2')}>
                    <li>
                        Hệ thống thanh toán thẻ trên website của chúng tôi đều được bảo mật theo tiêu chuẩn bảo mật
                        thanh toán theo quy định của các ngân hàng.
                    </li>
                    <li>
                        Ngoài ra, website của chúng tôi còn có các tiêu chuẩn bảo mật giao dịch thanh toán riêng, đảm
                        bảo an toàn các thông tin thanh toán của khách hàng.
                    </li>
                </ul>
                <h3 className={cx('title2')}>Quy định giao dịch thanh toán bằng thẻ nội địa</h3>
                <p>Chúng tôi đảm bảo tuân thủ các tiêu chuẩn bảo mật của các Đối Tác Cổng Thanh Toán gồm:</p>
                <ul className={cx('content2')}>
                    <li>
                        Thông tin tài chính của khách hàng được bảo vệ bằng giao thức SSL (Secure Sockets Layer). Giao
                        thức SSL sẽ mã hóa thông tin khách hàng cung cấp trong suốt quá trình giao dịch.
                    </li>
                    <li>
                        Hệ thống thanh toán đáp ứng chuẩn bảo mật thông tin của PCI Security Standards Council
                        (https://www.pcisecuritystandards.org).
                    </li>
                    <li>
                        Các nguyên tắc và quy định bảo mật thông tin trong ngành tài chính ngân hàng theo quy định của
                        Ngân hàng Nhà nước Việt Nam.
                    </li>
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Security;
