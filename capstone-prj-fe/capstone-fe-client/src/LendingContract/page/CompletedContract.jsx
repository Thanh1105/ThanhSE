import React from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../helper/constant";

const CompletedContract = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="d-flex">
                <div className="w-100 text-center">
                    <img
                        src="https://res.cloudinary.com/da0i1amaa/image/upload/v1653641595/70653wqqs42_lit4nd.png"
                        width="80px"
                        height="80px"
                        alt=""
                        className=""
                    ></img>
                    <div className="w-100">
                        <p className="text-center">
                            You do not have a current loan agreement.
                        </p>
                    </div>
                </div>
            </div>
            <div
                className="history-item"
                onClick={() => navigate(PATH.LENDDETAIL_PATH)}
            >
                <div className="d-flex justify-content-between">
                    <div>
                        <div className="d-flex">
                            <Icon
                                icon="majesticons:money-hand-line"
                                width="20px"
                                height="20px"
                            />
                            <p className="text-center fw-bold ms-2">
                                Transaction code:
                            </p>
                        </div>
                        <p>
                            <b>BSN-1559734-2022-04-26</b>
                        </p>
                        <p>
                            Transaction date: <b>29/06/2022</b>
                        </p>
                    </div>
                    <div className="text-right float-end ">
                        <h5>xx,xxx,xxx,xxx VND</h5>
                        <p>
                            <b>Loan</b>
                        </p>
                        <div className="text-uppercase item-status_done text-center">done</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CompletedContract;
