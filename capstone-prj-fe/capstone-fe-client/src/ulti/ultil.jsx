export const currency = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
});
export const formatPhoneNumberDisplay = (phoneNum) => {
    let split = 3;
    const chunk = [];
    const str = phoneNum.replaceAll(' ', '');
    for (let i = 0, len = str.length; i < len; i += split) {
        split = i >= 0 && i < 3 ? 3 : 4;
        chunk.push(str.substr(i, split));
    }
    return chunk.join(' ');
}