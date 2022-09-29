
import React, {useState}  from 'react';
import {  Modal } from 'antd';
const ModalConfirm = (props) => {
    const {visible , setVisible} = props;
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');


    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
      };
      const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
          setVisible(false);
          setConfirmLoading(false);
        }, 2000);
      };
  return (
    <>
      <Modal
        title="Title"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        cancelText='OTP'
        okText='Email'
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default ModalConfirm;