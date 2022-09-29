import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const VerifyPhoneNumber = (props) => {
    const { visible, setVisible, otpID, setOtpID, setVisibleModal } = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navi = useNavigate();
    const [otp, setOtp] = useState('');
    const [reSend, setReSend] = useState(false);
    const [count, setCount] = useState(60);
    const cookies = new Cookies();
    const [validation, setValidation] = useState(
        {
            otp: {
                valid: false,
                msg: ''
            }

        }
    )
    const valid = () => {
        const temp = {
            otp: { valid: false, msg: "" }
        }
        if (!otp) {
            temp.otp.valid = true;
            temp.otp.msg = "Please enter OTP"
        } else if (otp.length > 4) {
            temp.otp.valid = true;
            temp.otp.msg = "OTP is a 4-digit sequence"
        }
        else {
            temp.otp.valid = false;
            temp.otp.msg = ""
        }
        setValidation(temp);
        return !temp.otp.valid;
    }
    const handleCancel = () => {
        setVisible(false);
        setVisibleModal(false);
        Modal.destroyAll();
    };



    const verifyOTP = () => {
        const body = {
            otp_id: otpID,
            code: otp
        }
        axiosService.post('otp/verify_otp', body).then((res) => {
            if (res.status === 200) {
                setOtpID(res.data);
                setConfirmLoading(false);
                setVisibleModal(false);
                navi('/profile');
                Modal.success({
                    title: 'Successfully',
                    content: 'You have verified your phone Successfully',
                    okText: 'OK',
                    closable: true,
                    maskClosable: true,
                })
            }
        }).catch(err => {
            setConfirmLoading(false);
            setVisibleModal(false);
            setVisible(false);
            Modal.error({
                title: 'Your phone has verify'
            })
        })
    }

    const countDown = () => {
        let rs = count;
        const interval =
            setInterval(() => {
                if (rs > 0) {
                    rs = rs - 1;
                    setCount(rs);
                } else {
                    clearInterval(interval);
                    setReSend(false);
                    setCount(60);
                }
            }, 1000);
    }

    const resendOTP = () => {
        const body = {
            otp_id: otpID,
            user_id: Number(cookies.get('userID')),
        }
        axiosService.post('otp/resend_otp', body).then((res) => {
            if (res.status === 200) {
                setReSend(true);
                countDown();
            }
        })
    }


    const handleOk = () => {
        const validation = valid();
        if (validation) {
            setConfirmLoading(true);
            verifyOTP();
        }
    };
    return (
        <>
            <Modal
                title="Edit phone number"
                closable={false}
                visible={visible}
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
                        value={otp}
                        placeholder="Enter OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={12}
                    />
                    <Button className="resend_OTP" onClick={() => resendOTP()} disabled={reSend}>
                        {`${!reSend ? 'Resend OTP' : count}`}
                    </Button>
                </Input.Group>
                {
                    validation.otp.valid && <div className="text-danger">{validation.otp.msg}</div>
                }
            </Modal>
        </>
    );
};

export default VerifyPhoneNumber;
