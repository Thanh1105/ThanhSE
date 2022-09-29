import React from "react";
import "./InvestorHomePage.css";
import "antd/dist/antd.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, notification } from "antd";
import SideBar from "../components/sideBar/sideBar";
import { AiFillEye } from "react-icons/ai";
import { MenuRole } from "./container/menuComponent";
import { FaAngleDown } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";

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

const InvestorHomePage = () => {
    const navi = useNavigate();
    const location = useLocation();

      console.log(location);

    return (
        <div className="container">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col py-3 bg-light">
                    <div className="body-block position-relative">
                        <Dropdown overlay={MenuRole}>
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
                        <div className="body-board position-absolute">
                            <div className="d-flex body-board-surplus my-3">
                                <p className="surplus-text fs-5 flex-grow-1 px-5">
                                    Surplus
                                </p>
                                <p className="surplus-number fs-5 px-3">****</p>
                                <AiFillEye className="surplus-visible me-5 my-1" />
                            </div>
                            <div className="d-flex">
                                <hr class="dropdown-divider-invetor"></hr>
                                <FaAngleDown
                                    className="button-userLimit"
                                    onClick={() => navi("/userlimit")}
                                />
                            </div>

                            <div className="d-flex body-board-surplus my-3">
                                <p className="surplus-text fs-5 flex-grow-1 px-5">
                                    Total limit
                                </p>
                                <p className="surplus-number fw-bold fs-5 px-3">
                                    0 VND
                                </p>
                            </div>
                            <hr class="dropdown-divider-invetor"></hr>

                            <div class="row d-flex justify-content-around align-items-center mt-2">
                                <div className="col-3 text-center">
                                    <div className="body-board-feature"></div>
                                    {location.pathname === '/borrower' ? <p>Borrow</p>  : <p>Lend</p>}
                                </div>
                                <div className="col-3 text-center">
                                    <div className="body-board-feature"></div>
                                    <p>Deposit</p>
                                </div>
                                <div className="col-3 text-center">
                                    <div className="body-board-feature"></div>
                                    <p>Withdraw</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestorHomePage;
