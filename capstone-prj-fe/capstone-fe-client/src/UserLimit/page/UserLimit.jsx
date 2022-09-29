import React, { useState } from "react";
import "antd/dist/antd.css";
import "../styleComponent/UserLimit.css";
import { Carousel } from "antd";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../container/header-title_userlimit";
import { Cookies } from "react-cookie";
import { currency } from "../../ulti/ultil";
import { useParams } from "react-router-dom";
const UserLimit = () => {
    const cookies = new Cookies();
    const { role } = useParams();
    return (
        <div className="body_page">
            <div className="container">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9">
                        <HeaderTitle
                            title={`${
                                role === "borrower" ? "Borrow" : "Invest"
                            }`}
                        />
                        <div className="col-12 row mt-2 justify-content-around">
                            <div className="col-6 body-balance">
                                <p className="text-white">Account balance</p>
                                <p className="fw-bold text-white">
                                    {currency.format(cookies.get("balance_1"))}
                                </p>
                            </div>
                            {role === "borrower" ? (
                                <div className="col-6 body-lending">
                                    <p className="text-white">Borrowing</p>
                                    <p className="fw-bold text-white">{currency.format(0)}</p>
                                </div>
                            ) : (
                                <div className="col-6 body-lending">
                                    <p className="text-white">Investing</p>
                                    <p className="fw-bold text-white">{currency.format(0)}</p>
                                </div>
                            )}
                        </div>
                        <h4 className="fw-bold text-dark mt-3">
                            Service Limit
                        </h4>
                        <Carousel autoplay>
                            <div>
                                <div className="contentStyle bg_consumer_loan">
                                    <div className="p-3">
                                        <h4 className="text-white fw-bold">
                                            Consumer Loan
                                        </h4>
                                        <h5 className="text-white pt-4">
                                            {currency.format(0)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="contentStyle bg_business_loan">
                                    <div className="p-3">
                                        <h4 className="text-white fw-bold">
                                            business Loan
                                        </h4>
                                        <h5 className="text-white pt-4">
                                            {currency.format(0)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLimit;
