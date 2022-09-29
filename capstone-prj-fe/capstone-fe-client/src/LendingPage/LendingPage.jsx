import React from "react";
import "antd/dist/antd.css";
import "./LendingPage.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message, Space, notification } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import SideBar from "../components/sideBar/sideBar";
import { useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
const handleTimeClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
};

const handleAmountClick = (e) => {
    message.info("Click on menu item.");
    console.log("click", e);
};

const time = (
    <Menu
        onClick={handleTimeClick}
        items={[
            {
                label: "1 months",
                key: "1",
                icon: <UserOutlined />,
            },
            {
                label: "3 months",
                key: "2",
                icon: <UserOutlined />,
            },
            {
                label: "6 months",
                key: "3",
                icon: <UserOutlined />,
            },
            {
                label: "1 year",
                key: "4",
                icon: <UserOutlined />,
            },
        ]}
    />
);

const amount = (
    <Menu
        onClick={handleAmountClick}
        items={[
            {
                label: "Under 10 millions",
                key: "1",
                icon: <UserOutlined />,
            },
            {
                label: "10 millions - 50 millions",
                key: "2",
                icon: <UserOutlined />,
            },
            {
                label: "50 millions - 100 millions",
                key: "3",
                icon: <UserOutlined />,
            },
            {
                label: "Over 100 millions",
                key: "4",
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

const LendingPage = () => {
    const naviagate = useNavigate();
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <div className="header-lending position-relative">
                            <h4 className="text-white text-center py-2">Lend</h4>
                            <Button
                                onClick={openNotification}
                                className="position-absolute notification"
                            >
                                <IoIosNotificationsOutline className="noti-icon" />
                            </Button>
                        </div>
                        <div className="row mt-2 justify-content-around">
                            <div className="col-5 body-balance">
                                <p className="text-white">Account balance</p>
                                <p className="fw-bold text-white">0 VND</p>
                            </div>
                            <div className="col-5 body-lending">
                                <p className="text-white">Lending</p>
                                <p className="fw-bold text-white">0 VND</p>
                            </div>
                        </div>
                        <div className="body-search">
                            <h4 className="text-white text-center search">Search</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                <Dropdown overlay={time}>
                                    <Button className="button-select">
                                        <Space>
                                            Select Role
                                            <span className="select"> <FaAngleDown /> </span>
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                            <div className="col-6 mb-3">
                                <Dropdown overlay={amount}>
                                    <Button className="button-select">
                                        <Space>
                                            Select Role
                                            <span className="select"> <FaAngleDown /> </span>
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>
                        </div>


                        <div className="item-lend" onClick={() => naviagate("/lendingdetail")}>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <p className="text-center bg-light">xx Days</p>
                                    <p>
                                        <b>Consumer Loan</b>
                                    </p>
                                    <p>xx %/year</p>
                                </div>

                                <div className="text-right">
                                    <h5>xx,xxx,xxx VND</h5>
                                    <button
                                        className="btn btn-sm button-lend mt-4"
                                        type="submit"
                                    >
                                        Lend
                                    </button>
                                </div>
                            </div>
                        </div>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination justify-content-center">
                                <li class="page-item">
                                    <Link
                                        class="page-link"
                                        to='/'
                                        aria-label="Previous"
                                    >
                                        <span aria-hidden="true">&laquo;</span>
                                    </Link>
                                </li>
                                <li class="page-item">
                                    <Link class="page-link" to='/'>
                                        1
                                    </Link>
                                </li>
                                <li class="page-item">
                                    <Link class="page-link" to='/'>
                                        2
                                    </Link>
                                </li>
                                <li class="page-item">
                                    <Link class="page-link" to='/'>
                                        3
                                    </Link>
                                </li>
                                <li class="page-item">
                                    <Link
                                        class="page-link"
                                        to='/'
                                        aria-label="Next"
                                    >
                                        <span aria-hidden="true">&raquo;</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div >
        </div>
    );
};

export default LendingPage;
