import React, { useState } from "react";
import ModalConfirm from "./modal";
import { axiosService } from "../../axiosService";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie"; const ButtonLend = (props) => {
    const { title, idDetail, data } = props;
    const cookies = new Cookies();
    const [visibleModal, setVisibleModal] = useState(false);
    const [otpID, setOtpID] = useState(0);

    const getType = () => {
        if (data?.type_of_lending === 1) {
            return data.expected_money;
        } else if (data?.type_of_lending === 2) {
            return data.amount_of_packet;
        } else {
            return data.amount_of_packet;
        }
    }
    const saveInvest = () => {
        axiosService.post('/lending/invest_request/create', {
            user_id: cookies.get('userID'),
            borrow_request_id: idDetail,
            amount_of_money: getType(),
        }).then((res) => {
            setOtpID(res.data.otp_id);
            setVisibleModal(true);
        }).catch((err) => {
            Modal.error({
                title: err.response.data,
                maskClosable: true,
            })
        })
    }

    return (
        <>
            <div className="lend_accept" onClick={() => {
                saveInvest();
            }}>
                <h4 className="text-white text-center search">{title} </h4>
            </div>
            <ModalConfirm visibleModal={visibleModal} setVisibleModal={setVisibleModal} otpID={otpID} />
        </>
    );
};

export default ButtonLend;
