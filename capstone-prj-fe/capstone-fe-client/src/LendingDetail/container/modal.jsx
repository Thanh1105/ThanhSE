import React, { useState, useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { axiosService } from "../../axiosService";
import { Cookies } from "react-cookie";
const ModalConfirm = (props) => {
  const { visibleModal, setVisibleModal, otpID } = props;
  const cookies = new Cookies();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [reSend, setReSend] = useState(false);
  const [count, setCount] = useState(60);

  const handleCancel = () => {
    setVisibleModal(false);
    setConfirmLoading(false);
    Modal.destroyAll();
  };
  const resetDataUser = () => {
    const id = cookies.get('userID')
    axiosService.get(`/user/${id}/get_detail`).then((res) => {
      if (res.data) {
        const rs = res.data;
        cookies.set("balance_1", rs.user.limit_money);
      }
    }).catch(err => {
      Modal.error({
        title: err.response.data,
        maskClosable: true,
      })
    })
  }
  const handleOk = async () => {
    setConfirmLoading(true);
    axiosService.post('/otp/verify_otp',
      {
        otp_id: otpID,
        code: otp
      }
    ).then((res) => {
      if (res.status === 200) {
        resetDataUser();
        Modal.success({
          title: 'Successfully',
          content: 'You have invested successfully',
          okText: 'OK',
          closable: true,
          maskClosable: true,
          onOk: handleCancel()
        })

      } else {
        setConfirmLoading(false);
        Modal.error({
          title: 'Somethings wrong, please try agian',
          maskClosable: true,
        })
      }
    }).catch((err) => {
      Modal.error({
        title: err.response.data,
        maskClosable: true,
      })
    })

  };

  const resendOTP = () => {
    setReSend(true);
    countDown();
    axiosService.post('/otp/resend_otp',
      {
        otp_id: 1,
        user_id: Number(cookies.get('userID'))
      }
    ).then((res) => {
      if (res.status === 200) {
        return true;
      }
    }).catch((err) => {
      Modal.error({
        title: err.response.data,
        maskClosable: true,
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

  return (
    <>
      <Modal
        title="VERIFICATION OTP CODE"
        closable={false}
        visible={visibleModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        maskClosable={true}
        cancelText="Cancel"
        okText="Confirm"
      >
        <Input.Group compact className="d-flex align-items-center justify-content-center col-12 ">
          <Input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />
          <Button disabled={reSend} className="resend_OTP" onClick={() => resendOTP()}>{`${!reSend ? 'Resend OTP' : count}`}</Button>
        </Input.Group>
      </Modal>
    </>
  );
};

export default ModalConfirm;
