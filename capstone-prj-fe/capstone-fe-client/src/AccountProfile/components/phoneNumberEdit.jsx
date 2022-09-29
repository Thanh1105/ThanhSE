import React, { useState } from "react";
import { Input, Modal } from "antd";
import { formatPhoneNumberDisplay } from "../../ulti/ultil";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import VerifyPhoneNumber from "../components/verifyPhoneNumber";
const PhoneNumberEdit = (props) => {
    const { visibleModal, setVisibleModal, info } = props;
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState("Content of the modal");
    const [phone, setPhone] = useState(`0${((info.user.phone_number || '').slice(3, (info.user.phone_number || '').length))}`);
    const phoneRegExp = new RegExp("^[0-9]{9,25}$");
    const cookie = new Cookies();
    const [otpID, setOtpID] = useState('');

    const [validation, setValidation] = useState({
        phone: {
            valid: false,
            msg: "",
        },
    });
    const valid = () => {
        const temp = {
            phone: {
                valid: false,
                msg: "",
            },
        };
        if (!phone) {
            temp.phone.valid = true;
            temp.phone.msg = "Please input phone number";
        } else if (!phoneRegExp.test(phone.replaceAll(/\s/g, ""))) {
            temp.phone.valid = true;
            temp.phone.msg = "Phone number has to be digits";
        } else {
            temp.phone.valid = false;
            temp.phone.msg = "";
        }
        setValidation(temp);
        return !temp.phone.valid;
    };
    const handleCancel = () => {
        setTimeout(() => {
            setVisibleModal(false);
            Modal.destroyAll();
        }, 100);
    };
    const updateInfo = () => {
        console.log(phone.slice(1, phone.length).trim())
        const id = cookie.get('userID');
        const body = {
            user_id: cookie.get('userID'),
            first_name: info.user.first_name,
            last_name: info.user.last_name,
            birthday: info.user.birth,
            gender: info.user.gender,
            phone_number: `+84 ${phone.slice(1, phone.length).trim()}`,
            adress: info.user.adress
        }
        axiosService.post(`/user/${id}/update_information`, body).then((res) => {
            if (res.status === 200) {
                setVisible(true);
            }
        }).catch(err => {
            Modal.error({
                title: 'Error',
                content: 'Error',
            })
        })
    }

    const verifyPhone = () => {
        const body = {
            user_id: cookie.get('userID')
        }
        axiosService.post('otp/verify_phone', body).then((res) => {
            if (res.status === 200) {
                setOtpID(res.data);
            }
        }).catch(err => {
            console.log(err)
        })
    }


    const handleOk = () => {
        const validation = valid();
        if (validation) {
            updateInfo();
            verifyPhone();
            setVisible(true);
        }
    };
    return (
        <>
            <Modal
                title="Edit phone number"
                closable={false}
                visible={visibleModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                maskClosable={true}
                cancelText="Cancel"
                okText="Confirm"
            >
                <Input.Group
                    compact
                    className="d-flex align-items-center justify-content-center col-12 "
                >
                    <Input
                        value={`${formatPhoneNumberDisplay(phone)}`}
                        placeholder="Enter new phone number"
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={12}
                    />
                </Input.Group>
                {validation.phone.valid && (
                    <div className="text-danger">{validation.phone.msg}</div>
                )}
            </Modal>
            <VerifyPhoneNumber visible={visible} setVisible={setVisible} otpID={otpID} setOtpID={setOtpID} setVisibleModal={setVisibleModal} />

        </>
    );
};

export default PhoneNumberEdit;
