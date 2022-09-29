import React from "react";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../components/container/header-title";
import "../styleComponent/BorrowPage.css";
import { FiAlertTriangle } from "react-icons/fi";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../helper/constant";
import { currency } from "../../ulti/ultil";

const BorrowPage = () => {
    const navigate = useNavigate();
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Borrow" />
                        <div className="w-100 mt-2 justify-content-around borrow_detail">
                            <div className="borrow_limit d-block text-center">
                                <Icon
                                    icon="uil:money-insert"
                                    color="white"
                                    height="24px"
                                    width="24px"
                                />
                                <p className="text-light">Limit can borrow</p>
                                <p className="fw-bold text-light">
                                    {currency.format(0)}
                                </p>
                            </div>
                            <div className="borrow_borrowing d-block text-center">
                                <Icon
                                    icon="uil:money-insert"
                                    color="white"
                                    height="24px"
                                    width="24px"
                                />
                                <p className="text-light">Borrowing</p>
                                <p className="fw-bold text-light">
                                    {currency.format(0)}
                                </p>
                            </div>
                            <button
                                className="btn-borrow d-flex justify-content-center m-auto py-2"
                                onClick={() => navigate(PATH.BORROWCREATE_PATH)}
                            >
                                Borrow Now
                            </button>
                        </div>
                        <div className="borrow_alert d-flex align-items-center my-2">
                            <FiAlertTriangle className="text-light icon_alert ms-4" />
                            <p className="text-light m-3 ">
                                Complete your profile to increase your limit!
                            </p>
                        </div>
                        <div>
                            <h3 className="fw-bold text-uppercase">
                                list of borrow contract
                            </h3>
                        </div>
                        <div
                            className="item-lend"
                            onClick={() => navigate(PATH.BORROWDETAIL_PATH)}
                        >
                            <div className="d-flex justify-content-between">
                                <div>
                                    <div className="d-flex">
                                        <Icon
                                            icon="majesticons:money-hand-line"
                                            width="20px"
                                            height="20px"
                                        />
                                        <p className="text-center day-lend ms-2">
                                            xx Months
                                        </p>
                                    </div>
                                    <p>
                                        <b>Consumer Loan</b>
                                    </p>
                                    <p>xx %/year</p>
                                </div>

                                <div className="text-right float-end">
                                    <h5>xx,xxx,xxx,xxx VND</h5>
                                    <p>
                                        <b>x</b>/xx Days Remaining
                                    </p>
                                    <p className="fw-bold">
                                        <b className="text-danger">x</b>/xx
                                        Investors
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowPage;
