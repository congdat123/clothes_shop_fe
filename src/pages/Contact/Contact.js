import classNames from 'classnames/bind';
import styles from './Contact.module.scss';
import Footer from '~/layouts/components/Footer/Footer';
import { useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function Contact() {
    const [dataInput, setDataInput] = useState({
        fullName: '',
        email: '',
        content: '',
    });
    function handle(e) {
        const newdata = { ...dataInput };
        newdata[e.target.id] = e.target.value;
        setDataInput(newdata);
        console.log(newdata);
    }
    const handleSubmit = async () => {
        if (dataInput.fullName.length <= 0 && dataInput.email.length <= 0 && dataInput.content.length <= 0) {
            alert('Vui lòng điền thông tin cho hợp lệ!');
        } else {
            try {
                const response = await axios.post(`https://localhost:44387/api/Contacts`, {
                    fullName: dataInput.fullName,
                    email: dataInput.email,
                    content: dataInput.content,
                });
                if (response.data.fullName === dataInput.fullName) {
                    alert('Liên hệ thành công!');
                    window.location.href = '/';
                }
            } catch (error) {
                alert(error);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <h2 className={cx('title')}>Liên hệ - Hỗ trợ khách hàng</h2>
                <div className={cx('content')}>
                    <div className={cx('content-title')}>
                        <div className={cx('item')}>
                            <div className={cx('icon')}></div>
                            <div className={cx('item-content')}>
                                <h4 className={cx('item-title')}>Địa chỉ:</h4>
                                <p className={cx('item-content-i')}>Công ty cổ phần Thời trang </p>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}></div>
                            <div className={cx('item-content')}>
                                <h4 className={cx('item-title')}>Gửi thắc mắc:</h4>
                                <p className={cx('item-content-i')}>
                                    <a href="mailto:chamsockhachhang@shop.vn">chamsockhachhang@shop.vn</a>
                                </p>
                            </div>
                        </div>
                        <div className={cx('item')}>
                            <div className={cx('icon')}></div>
                            <div className={cx('item-content')}>
                                <h4 className={cx('item-title')}>Điện thoại:</h4>
                                <p className={cx('item-content-i')}>
                                    <a href="tel:18008080">18008080</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <form className={cx('form-contact')}>
                        <div className={cx('row1')}>
                            <div className={cx('column1')}>
                                <label className={cx('col1-title')}>
                                    Họ và tên<em>*</em>
                                </label>

                                <input
                                    onChange={(e) => {
                                        handle(e);
                                    }}
                                    id="fullName"
                                    value={dataInput.fullName}
                                    className={cx('input-form1')}
                                    type="text"
                                    required
                                />
                            </div>
                            <div className={cx('column2')}>
                                <label className={cx('col1-title')}>
                                    Email<em>*</em>
                                </label>

                                <input
                                    onChange={(e) => {
                                        handle(e);
                                    }}
                                    id="email"
                                    value={dataInput.email}
                                    className={cx('input-form1')}
                                    type="email"
                                    required
                                />
                            </div>
                        </div>
                        <div className={cx('row2')}>
                            <label className={cx('col1-title')}>
                                Nội dung<em>*</em>
                            </label>

                            <input
                                onChange={(e) => {
                                    handle(e);
                                }}
                                id="content"
                                value={dataInput.content}
                                className={cx('input-form')}
                                type="text"
                                required
                            />
                        </div>
                        <button className={cx('btn-submit')} type="submit" onClick={handleSubmit}>
                            Gửi liên hệ
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;
