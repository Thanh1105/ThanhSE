import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { BsCircle } from "react-icons/bs";
import SideBar from "../../components/sideBar/sideBar";
import HeaderTitle from "../../UserLimit/container/header-title_userlimit";
import "../styleComponent/profileDetail.css";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../helper/constant";
const ProfileDetail = () => {
    const navigate = useNavigate();
    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account" />
                        <div className="profile_list">
                            <div
                                className="d-flex w-100 m-auto align-items-center list_profile_item px-3 mt-3"
                                onClick={() =>
                                    navigate(PATH.PROFILEIDCARD_PATH)
                                }
                            >
                                <BsCircle className="profile_check" />
                                <div className="profile ms-4 my-2">
                                    <h5 className="mb-0 text-uppercase">
                                        ID card
                                    </h5>
                                    <p className="mb-0">
                                        Please update the required fields
                                        correctly
                                    </p>
                                </div>
                                <FaAngleRight />
                            </div>

                            <div
                                className="d-flex w-100 m-auto align-items-center list_profile_item px-3 mt-3"
                                onClick={() =>
                                    navigate(PATH.PROFILEBANKACCOUNT_PATH)
                                }
                            >
                                <BsCircle className="profile_check" />
                                <div className="profile ms-4 my-2">
                                    <h5 className="mb-0 text-uppercase">
                                        DECLARATION FACEBOOK
                                    </h5>
                                    <p className="mb-0">
                                        Please update the required fields
                                        correctly
                                    </p>
                                </div>
                                <FaAngleRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetail;
