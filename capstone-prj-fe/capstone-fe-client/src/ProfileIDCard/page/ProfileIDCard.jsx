import { DatePicker, Input, Select } from "antd";
import React from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import "../styleComponent/ProfileIDCard.css";

const ProfileIDCard = () => {
    const { Option } = Select;
    return (
        <div>
            <div className="body-page">
                <div className="container bg-light">
                    <div className="row flex-nowrap">
                        <SideBar />
                        <div className="col-9 container">
                            <HeaderTitle title="id card" />
                            <div className="id_detail mt-3">
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Select
                                        profile type
                                    </p>
                                    <Select
                                        className="start-0 w-100"
                                        defaultValue="Identity Card"
                                    >
                                        <Option value="idcard">
                                            Identity Card
                                        </Option>
                                        <Option value="citizenid">
                                            Citizen Identification
                                        </Option>
                                    </Select>
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Full
                                        Name
                                    </p>
                                    <Input
                                        className="id_infor "
                                        placeholder="Your Full Name"
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Date of birth
                                    </p>
                                    <DatePicker className="w-100 id_infor " />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Sex
                                    </p>
                                    <Select
                                        className="position-relative start-0 w-100 rounded-3"
                                        defaultValue="Man"
                                    >
                                        <Option value="man">Man</Option>
                                        <Option value="women">Women</Option>
                                        <Option value="other">Other</Option>
                                    </Select>
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b> ID
                                        Card
                                    </p>
                                    <Input
                                        className="id_infor "
                                        placeholder="Enter ID Card"
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Issued
                                        by
                                    </p>
                                    <Input
                                        className="id_infor"
                                        placeholder="Issued by"
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Date
                                        issued
                                    </p>
                                    <DatePicker className="w-100 id_infor " />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Domicile
                                    </p>
                                    <Input
                                        className="id_infor"
                                        placeholder="Domicile"
                                    />
                                </div>
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>
                                        Permanent address
                                    </p>
                                    <Input
                                        className="id_infor"
                                        placeholder="Permanent address"
                                    />
                                </div>
                                <div className="d-flex text-center col-12 mt-3">
                                    <div className="col-6">
                                        <p>
                                            <b className="text-danger">*</b>
                                            Photo of the front of the ID card
                                        </p>
                                        <input type="file"></input>
                                        <img
                                            src="https://res.cloudinary.com/da0i1amaa/image/upload/v1657787531/Untisastled-1_tusjce.png"
                                            width="160px"
                                            height="120px"
                                            className="me-2"
                                            alt=""
                                        ></img>
                                    </div>
                                    <div className="col-6">
                                        <p>
                                            <b className="text-danger">*</b>
                                            Photo of the front of the ID card
                                        </p>
                                        <input type="file"></input>
                                        <div></div>
                                    </div>
                                </div>
                                <div className="d-flex text-center col-12 my-3">
                                    <div className="col-6">
                                        <p>
                                            <b className="text-danger">*</b>
                                            Photo of your real face (No:
                                            glasses, hats, masks)
                                        </p>
                                        <input type="file"></input>
                                        <div></div>
                                    </div>
                                    <div className="col-6">
                                        <p>
                                            <b className="text-danger">*</b>
                                            Additional photos (optional)
                                        </p>
                                        <input type="file"></input>
                                        <div></div>
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

export default ProfileIDCard;
