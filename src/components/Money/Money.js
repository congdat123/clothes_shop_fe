function Money({ value }) {
    const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    const formattedValue = formatter.format(value);

    return <span>{formattedValue}</span>;
}

export default Money;
