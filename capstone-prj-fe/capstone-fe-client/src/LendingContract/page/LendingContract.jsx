import React from "react";
import { useState } from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/LendingContract.css";
import CompletedContract from "./CompletedContract";

const LendingContract = () => {
    const [option, setOption] = useState("lending");
    const [bgColor, setColor] = useState("lending_active");

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="List of invest contracts" />
                        <div className="w-100 my-3 d-flex text-center justify-content-around align-items-center history_filter">
                            <div
                                className={`col-6 ${
                                    option === "lending"
                                        ? "btn_contract_active"
                                        : "btn_contract"
                                }`}
                                onClick={() => setOption("lending")}
                            >
                                Investing
                            </div>

                            <div
                                className={`col-6 ${
                                    option === "complete"
                                        ? "btn_contract_active"
                                        : "btn_contract"
                                }`}
                                onClick={() => setOption("complete")}
                            >
                                Completed
                            </div>
                        </div>
                        {option === "lending" && <div>Hello Investor</div>}
                        {option === "complete" && (
                            <div>
                                <CompletedContract />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LendingContract;
