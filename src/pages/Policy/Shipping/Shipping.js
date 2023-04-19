import classNames from 'classnames/bind';
import styles from './Shipping.module.scss';
import Footer from '~/layouts/components/Footer/Footer';

const cx = classNames.bind(styles);

function Shipping() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Chính sách giao nhận hàng</h2>
                <p className={cx('content1')}>
                    Để đảm bảo quyền lợi cho Quý khách hàng trong quá trình mua sắm, chúng tôi gửi bạn những thông tin
                    về chính sách giao nhận hàng & thanh toán online khi đặt mua qua các kênh: website, facebook,
                    zalo...như sau:
                </p>
                <ul className={cx('content2')}>
                    <li className={cx('title2')}>Chính sách chung về Giao - Nhận hàng</li>
                    <ul className={cx('content3')}>
                        <li className={cx('title3')}>Phí ship khi mua hàng online tại Yody</li>
                        <p className={cx('title4')}>Phí ship toàn quốc là 30.000đ</p>
                        <li className={cx('title3')}>Thời gian nhận hàng</li>
                        <p className={cx('title4')}>
                            Khách hàng khi đã được xác nhận đơn hàng đặt mua trên Website , Facebook, Zalo... và các
                            kênh thông tin chính thức khác của chúng tôi sẽ nhận được sản phẩm trong vòng từ 3-5 ngày
                            làm việc (tùy từng khu vực nhận hàng). Nhân viên chăm sóc khách hàng sẽ liên hệ với bạn
                            trong thời gian sớm nhất có thể để hoàn tất thủ tục liên quan.
                        </p>
                        <p className={cx('title4')}>
                            Đối với các đơn hàng đồng phục hoặc sản phẩm in ấn khác, thời gian sản xuất và giao hàng có
                            thể sẽ lâu hơn. Chúng tôi sẽ liên hệ và thông báo cụ thể về thời gian giao - nhận đến Quý
                            khách.
                        </p>
                    </ul>
                    <li className={cx('title2')}>Quyền lợi về việc Thử và Nhận đồ khi mua sắm Online</li>
                    <p className={cx('title4')}>
                        Để mang đến trải nghiệm mua sắm thuận lợi và thoải mái nhất cho khách hàng, Yody luôn xây dựng
                        những chính sách thân thiện nhất. Theo đó, tất cả khách hàng đặt mua sản phẩm của Yody bằng
                        phương thức mua hàng online đều được hưởng những quyền lợi như sau:
                    </p>
                    <ul className={cx('content4')}>
                        <li className={cx('title4')}>Khách hàng được xem và thử đồ trước khi thanh toán.</li>
                        <li className={cx('title4')}>
                            Nếu thấy sản phẩm không vừa, không ưng ý, khách hàng hoàn toàn có thể trả lại ngay cho bưu
                            tá và không cần thanh toán bất cứ chi phí phát sinh nào.
                        </li>
                    </ul>
                    <li className={cx('title2')}>Với khách hàng đã thanh toán và muốn đổi trả</li>

                    <ul className={cx('content4')}>
                        <li className={cx('title4')}>
                            Khách hàng có nhu cầu khiếu nại, đổi trả sản phẩm do lỗi của Yody có thể liên hệ qua Hotline
                            1800 2086 để được hỗ trợ sớm nhất.
                        </li>
                        <li className={cx('title4')}>
                            Tư vấn viên sẽ hướng dẫn khách hàng các bước cần thiết để tiến hành trả đổi trả.
                        </li>
                        <li className={cx('title4')}>
                            Lưu ý: Khách hàng được hỗ trợ đổi hàng với trường hợp thử đồ tại nhà mà không đúng với kích
                            cỡ cơ thể. Khách hàng có thể tiến hành đổi trả online hoặc đổi trả trực tiếp tại hệ thống
                            cửa hàng của Yody trên toàn quốc. Hàng hóa khi đổi trả cần được giữ nguyên tem mác và chưa
                            qua sử dụng, giặt tẩy.
                        </li>
                    </ul>
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default Shipping;
