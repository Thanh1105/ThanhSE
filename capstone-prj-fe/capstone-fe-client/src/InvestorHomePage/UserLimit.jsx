import React from "react";
import "antd/dist/antd.css";
import "./UserLimit.css";

import { DownOutlined, UserOutlined } from "@ant-design/icons";
import {
    Button,
    Dropdown,
    Menu,
    message,
    Space,
    notification,
    Carousel,
} from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import SideBar from "../components/sideBar/sideBar";
const handleMenuClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
};

const menu = (
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

const openNotification = () => {
    notification.open({
        message: "Notification Title",
        description:
            "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
        onClick: () => {
            console.log("Notification Clicked!");
        },
    });
};

const UserLimit = () => {
    return (
        <div className="container">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col-9">
                    <div className="header-lending position-relative">
                        <h4 className="text-white text-center py-2">Lend</h4>
                        <Dropdown overlay={menu}>
                            <Button className="position-absolute rounded-3">
                                <Space>
                                    Select Role
                                    <DownOutlined className="pb-1" />
                                </Space>
                            </Button>
                        </Dropdown>
                        <Button
                            onClick={openNotification}
                            className="position-absolute notification"
                        >
                            <IoIosNotificationsOutline className="noti-icon" />
                        </Button>
                    </div>
                    <div className="row mt-2">
                        <div className="col-6 body-balance">
                            <p className="text-white">Account balance</p>
                            <p className="fw-bold text-white">0 VND</p>
                        </div>
                        <div className="col-6 body-lending">
                            <p className="text-white">Lending</p>
                            <p className="fw-bold text-white">0 VND</p>
                        </div>
                    </div>
                    <Carousel autoplay>
                        <div>
                            <div className="contentStyle">
                                <div className="d-flex pt-3">
                                    <img
                                        src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                                        width="30px"
                                        height="30px"
                                        alt="web-logo"
                                        className="mx-2"
                                    ></img>
                                    <h4 className="text-white fw-bold">
                                        Consumer Loan
                                    </h4>
                                </div>
                                <div className="ml-auto d-flex text-left m-3">
                                    <h5 className="text-white me-2">
                                        xx,xxx,xxx
                                    </h5>
                                    <h5 className="text-white">VND</h5>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="contentStyle">
                                <div className="d-flex pt-3">
                                    <img
                                        src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                                        width="30px"
                                        height="30px"
                                        alt="web-logo"
                                        className="mx-2"
                                    ></img>
                                    <h4 className="text-white fw-bold">
                                        Business Loan
                                    </h4>
                                </div>
                                <div className="ml-auto d-flex text-left m-3">
                                    <h5 className="text-white me-2">
                                        xx,xxx,xxx
                                    </h5>
                                    <h5 className="text-white">VND</h5>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default UserLimit;
