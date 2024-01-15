import { Form, Input, Modal } from 'antd';
import React from 'react';

const AddExpenses = ({ isExpenseVisible, handleExpenseCancel, onFinish }) => {
  const [form] = Form.useForm();
  console.log(" Expense Modal");
  return (
    <>
      <Modal
        title="Add Expense"
        open={isExpenseVisible}
        onCancel={handleExpenseCancel}
        footer={null}
      >

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          onFinish(values, "expense");
          form.resetFields();
        }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default AddExpenses;
