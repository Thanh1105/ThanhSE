import { Menu, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
};
export const MenuRole = (
    <Menu
        onClick={handleMenuClick}
        items={[
            {
                label: "Investor",
                key: "1",
                icon: <UserOutlined />,
            },
            {
                label: "Borrower",
                key: "2",
                icon: <UserOutlined />,
            },
        ]}
    />
);