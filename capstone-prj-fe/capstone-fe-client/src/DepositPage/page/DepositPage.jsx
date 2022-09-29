import React from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";

const DepositPage = () => {
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-lg-9">
                        <HeaderTitle title="Deposit" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepositPage;
