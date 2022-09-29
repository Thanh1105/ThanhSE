import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/accountProfile.css";
import { PATH } from "../../helper/constant";
import PhoneNumberEdit from "../components/phoneNumberEdit";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { Modal } from "antd";
const AccountProfile = () => {
    const navigate = useNavigate();
    const cookies = new Cookies();
    const [visibleModal, setVisibleModal] = useState(false);
    const [info, setInfo] = useState([]);
    const [count_completed, setCount_completed] = useState(0);
    const getData = async () => {
        const id = cookies.get('userID')
        await axiosService.get(`/user/${id}/get_detail`).then((res) => {
            if (res.data) {
                const rs = res.data;
                setInfo(rs);
                count(rs);
            }
        }).catch(err => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            })
        })
    }
    const count = (rs) => {
        let count = 0;
        if (rs.user.first_name && rs.user.last_name) {
            count++;
        }
        if (rs.user.birth) {
            count++;
        }
        if (rs.user.phone_number) {
            count++;
        }
        if (rs.user.email) {
            count++;
        }
        if (rs.user.account_informations[0].card_id) {
            count++;
        }
        setCount_completed(count)
    }
    useEffect(() => {
        getData();
    }, [])

    return (
        <div className="body-page">
            <div className="container bg-light">
                <div className="row flex-nowrap">
                    <SideBar />
                    <div className="col-9 container">
                        <HeaderTitle title="Account" />
                        <div
                            className="d-flex w-100 m-auto align-items-center basic_profile px-3 mt-3"
                            onClick={() => navigate(PATH.PROFILEDETAIL_PATH)}
                        >
                            <img
                                src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untisastled-1_tusjce.png"
                                width="36px"
                                height="36px"
                                className="me-2"
                                alt=""
                            ></img>
                            <div className="profile ms-2 my-2">
                                <h5 className="fw-bold mb-0 ">
                                    Basic Profile{" "}
                                </h5>
                                <p className="mb-0">{count_completed < 5 ? 'UnCompleted' : 'Completed'}</p>
                            </div>
                            <div className={`${count_completed < 5 ? 'profile_Uncompleted' : 'profile_completed'} text-light`}>
                                {count_completed}/5
                            </div>
                        </div>
                        <div className="d-flex w-100 m-auto align-items-center account_info px-3 mt-3">
                            <div className="account_info col-12 py-3 d-flex">
                                <div className="user_field ms-3 col-8">
                                    <p>Name:</p>
                                    <p>Day of birth:</p>
                                    <p>Phone:</p>
                                    <p>Email:</p>
                                    <p>ID Card:</p>
                                </div>
                                {info.user !== undefined &&
                                    <div className="user_infor col-8">
                                        <p>{info.user.first_name} {info.user.last_name}</p>
                                        <p>{info.user.birth || '-'}</p>
                                        <div className="phone_container">
                                            <p>{info.user.phone_number || '-'}
                                            </p>
                                            <p
                                                className="btn_submit"
                                                onClick={() => {
                                                    setVisibleModal(true);
                                                }}
                                            >
                                                Edit
                                                <PhoneNumberEdit
                                                    visibleModal={visibleModal}
                                                    setVisibleModal={setVisibleModal}
                                                    info={info}
                                                />
                                            </p>
                                        </div>
                                        <p>{info.user.email || '-'}</p>
                                        <p>{info.user.account_informations[0].card_id || '-'}</p>
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountProfile;
