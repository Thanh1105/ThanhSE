
export const changeFormatNumber = (phone) => {
    let rs = phone;
    if (phone) {
        rs = phone.slice(1, phone.length);
    }
    return `+84 ${rs}`;
}