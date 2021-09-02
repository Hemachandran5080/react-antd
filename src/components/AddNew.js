import React from 'react'
import { Modal, Button } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import EmployeeForm from './EmployeeForm';
import "./AddNew.css";

function AddNew() {
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Content of the modal');
  
    const showModal = () => {
      setVisible(true);
    };
  
    const handleOk = () => {
      setModalText('Adding...');
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 2000);
    };
  
    const handleCancel = () => {
      console.log('Clicked cancel button');
      setVisible(false);
    };
  
    return (
      <>
        <Button style={{background: "orange", marginRight: 50}} type="primary" onClick={showModal}>
        <UserAddOutlined /> Add 
        </Button>
        <Modal
          title="Employee Form"
          visible={visible}
          // onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={null}
        >
          <EmployeeForm />
        </Modal>
      </>
    );
}

export default AddNew
