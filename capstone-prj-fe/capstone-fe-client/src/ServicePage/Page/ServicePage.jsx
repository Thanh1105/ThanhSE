import React, { useState, useEffect } from "react";
import "../styleComponent/ServicePage.css";
import "antd/dist/antd.css";
import SideBar from "../../components/sideBar/sideBar";
import SelectRole from "../container/selectRole";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { PATH } from "../../helper/constant";
import { currency } from "../../ulti/ultil";
import { Cookies } from "react-cookie";

const InvestorHomePage = () => {
    const { type } = useParams();
    const cookies = new Cookies();
    const navi = useNavigate();
    const [roles, setRoles] = useState(type ? type : 'investor');
    const [showMoney, setShowMoney] = useState(false);
    useEffect(() => {
        localStorage.setItem('role', roles === 'investor' ? 2 : 1)
    }, [roles])
    return (
        <div className="body-page">
            <div className="container">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col py-3 bg-light">
                        <div className="body-block position-relative">
                            <SelectRole roles={roles} setRoles={setRoles} />
                            <div className="body-board position-absolute">
                                <div className="d-flex body-board-surplus my-3 ">
                                    <p className="surplus-text fs-5 flex-grow-1 px-5">
                                        Surplus
                                    </p>
                                    {showMoney ?
                                        <>
                                            <p className="surplus-number fs-5 px-3">
                                                {currency.format(cookies.get('balance_1'))}
                                            </p>
                                            <AiFillEye className="surplus-visible me-4 my-1" onClick={() => setShowMoney(false)} />
                                        </>
                                        :
                                        <>
                                            <p className="surplus-number fs-5 px-3">
                                                ********
                                            </p>
                                            <AiFillEyeInvisible className="surplus-visible me-4 my-1" onClick={() => setShowMoney(true)} />
                                        </>
                                    }
                                </div>
                                <div className="d-flex">
                                    <hr className="dropdown-divider-invetor"></hr>
                                    <FaAngleDown
                                        className="button-userLimit"
                                        onClick={() =>
                                            navi(`${PATH.LENDLIMIT_PATH}/${roles}`)
                                        }
                                    />
                                </div>

                                <div className="d-flex body-board-surplus my-3 me-3">
                                    <p className="surplus-text fs-5 flex-grow-1 px-5">
                                        {roles === 'investor' ? 'Investing' : 'Borrowing'}
                                    </p>
                                    <p className="surplus-number fw-bold fs-5 px-3">
                                        {currency.format(0)}
                                    </p>
                                </div>
                                <hr className="dropdown-divider-invetor"></hr>

                                <div className="row d-flex justify-content-around align-items-center mt-2">
                                    {roles === 'borrower' ? (
                                        <div className="col-3 text-center body-feature">
                                            <div
                                                className="body-board-feature d-flex justify-content-center align-items-center"
                                                onClick={() =>
                                                    navi(PATH.BORROW_PATH)
                                                }
                                            >
                                                <Icon
                                                    icon="fa6-solid:hand-holding-dollar"
                                                    color="white"
                                                    width="24px"
                                                    height="24px"
                                                />
                                            </div>
                                            <p>Borrow</p>
                                        </div>
                                    ) : (
                                        <div className="col-3 text-center body-feature">
                                            <div
                                                className="body-board-feature d-flex justify-content-center align-items-center"
                                                onClick={() =>
                                                    navi(PATH.LENDDING_PATH)
                                                }
                                            >
                                                <Icon
                                                    icon="majesticons:money-hand-line"
                                                    color="white"
                                                    width="24px"
                                                    height="24px"
                                                />
                                            </div>
                                            <p>Invest</p>
                                        </div>
                                    )}
                                    <div className="col-3 text-center body-feature" onClick={() => navi(PATH.DEPOSIT_PATH)}>
                                        <div className="body-board-feature d-flex justify-content-center align-items-center">
                                            <Icon
                                                icon="majesticons:money-plus"
                                                color="white"
                                                width="24px"
                                                height="24px"
                                            />
                                        </div>
                                        <p>Deposit</p>
                                    </div>
                                    <div className="col-3 text-center body-feature">
                                        <div className="body-board-feature d-flex justify-content-center align-items-center">
                                            <Icon
                                                icon="uil:money-withdraw"
                                                color="white"
                                                width="24px"
                                                height="24px"
                                            />
                                        </div>
                                        <p>Withdraw</p>
                                    </div>
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
