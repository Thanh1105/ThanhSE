import React from "react";
import "antd/dist/antd.css";
import "./LendingDetail.css";
import "../index.css";
import SideBar from "../components/sideBar/sideBar";

const LendingDetail = () => {
    return (
        <div className="container">
            <div className="row flex-nowrap">
                <SideBar />
                <div className="col-9">
                    <div className="header-lending position-relative">
                        <h4 className="text-white text-center py-2">
                            Loan Detail
                        </h4>
                    </div>
                    <div>
                        <div className="lending-detail">
                            <hr class="dropdown-divider mt-2" />
                            <div className="row align-items-center justify-content-center">
                                <div className="col-10 text-primary">
                                    <p className="m-auto title">100% SAFETY GUARANTEE</p>
                                </div>
                                <div className="col-2 text-right">
                                    <img
                                        src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                                        width="40px"
                                        height="40px"
                                        alt="guarantee"
                                        className="float-end"
                                    ></img>
                                </div>
                            </div>
                            <hr class="dropdown-divider" />
                            <div className="container align-items-center justify-content-center d-flex">
                                <div className="col-6 border-end text-center">
                                    <p className="">Amount to borrow</p>
                                    <p className="text-primary">XXX VND</p>
                                </div>
                                <div className="col-6 text-center">
                                    <p className="">Total will receive</p>
                                    <p className="text-primary">XXX VND</p>
                                </div>
                            </div>
                            <hr class="dropdown-divider" />
                            <div className="container col-12">
                                <div className="col-12">
                                    <div className="row">
                                        <p>Borrower</p>
                                        <p className="text-uppercase fw-bold">
                                            Borrower's Name
                                        </p>
                                    </div>
                                    <hr class="dropdown-divider divider-primary" />
                                </div>
                                <div className="container d-flex">
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Loan purpose</p>
                                                <p className="fw-bold">
                                                    Consumer Loan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Borrowed time</p>
                                                <p className="fw-bold">
                                                    1 month
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container d-flex">
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Loan date</p>
                                                <p className="fw-bold">
                                                    dd/mm/yyyy
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Due date</p>
                                                <p className="fw-bold">
                                                    dd/mm/yyyy
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container d-flex">
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Interest rate</p>
                                                <p className="fw-bold">
                                                    xx %/year
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Interest</p>
                                                <p className="fw-bold">
                                                    XXX VND
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="container d-flex">
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Service charge</p>
                                                <p className="fw-bold">
                                                    XXX VND
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="jss467">
                                            <div className="container flex-column">
                                                <p>Type of contract</p>
                                                <p className="fw-bold">
                                                    1 month
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        <button className="btn_loanconfirm" type="button">
                            <span>Agree to lend</span>
                            <span className="ripple-root"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LendingDetail;
