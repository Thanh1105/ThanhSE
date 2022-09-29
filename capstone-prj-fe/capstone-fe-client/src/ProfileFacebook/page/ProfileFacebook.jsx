import { Input } from "antd";
import React from "react";
import HeaderTitle from "../../components/container/header-title";
import SideBar from "../../components/sideBar/sideBar";
import '../styleComponent/ProfileFacebook.css'


const ProfileFacebook = () => {
    return (
        <div>
            <div className="body-page">
                <div className="container bg-light">
                    <div className="row flex-nowrap">
                        <SideBar />
                        <div className="col-9 container">
                            <HeaderTitle title="DECLARATION FACEBOOK" />
                            <div className="bank_detail mt-3">
                                <div>
                                    <p>
                                        <b className="text-danger">* </b>Facebook Link
                                    </p>
                                    <Input
                                        className="facebook_link"
                                        placeholder="Facebook link"
                                    />
                                    <div className="btn_submit mt-3 px-3">Submit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileFacebook;
