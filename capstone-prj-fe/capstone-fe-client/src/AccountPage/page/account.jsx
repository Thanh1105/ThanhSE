import React from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/account.css";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../login/fire";
import { FaAngleRight } from "react-icons/fa";
import { PATH } from "../../helper/constant";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Cookies } from 'react-cookie';
const Account = () => {
    const app = initializeApp(firebaseConfig);
    const navigate = useNavigate();
    const cookie = new Cookies();
    const auth = getAuth(app);

    const logout = () => {
        signOut(auth);
        cookie.remove('token');
        localStorage.clear();
        window.location.reload();
    };
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account" />
                        <div className="account_list mt-3 ">
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="fw-bold text-uppercase px-3 mt-3">
                                account
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div
                                className="d-flex w-100 m-auto align-items-center list_item px-3"
                                onClick={() =>
                                    navigate(PATH.ACCOUNTPROFILE_PATH)
                                }
                            >
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untisastled-1_tusjce.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">My profile</div>
                                <FaAngleRight />
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="d-flex w-100 m-auto align-items-center list_item px-3" onClick={() => navigate(PATH.BORROWLIMIT_PATH)}>
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657788652/293469610_426577486113760_2992466712973871076_n_tloap1.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">
                                    Balance and limit
                                </div>
                                <FaAngleRight />
                            </div>
                        </div>
                        <div className="account_list mt-3 ">
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="fw-bold text-uppercase px-3 mt-3">
                                setting
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="d-flex w-100 m-auto align-items-center list_item px-3">
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untitlesasd-1_umhkpo.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">
                                    Receive email notifications
                                </div>
                                <FaAngleRight />
                            </div>
                        </div>
                        <div className="account_list mt-3 ">
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="fw-bold text-uppercase px-3 mt-3">
                                About us
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="d-flex w-100 m-auto align-items-center list_item px-3">
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787532/Untitled-as1_eh3f7d.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">Contact</div>
                                <FaAngleRight />
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="d-flex w-100 m-auto align-items-center list_item px-3">
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untitled-1_zsl32e.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">
                                    Terms, policy
                                </div>
                                <FaAngleRight />
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                            <div className="d-flex w-100 m-auto align-items-center list_item px-3" onClick={() => logout()}>
                                <img
                                    src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787525/ic-account_jpu2dl.png"
                                    width="24px"
                                    height="24px"
                                    className="me-2"
                                    alt=""
                                ></img>
                                <div className="list_item_text">Log out</div>
                                <FaAngleRight />
                            </div>
                            <div className="px-3">
                                <hr className="dropdown-divider"></hr>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
