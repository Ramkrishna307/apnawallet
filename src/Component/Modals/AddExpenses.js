import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
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
          <Input type="number" className="custom-input" />
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
         
         <DatePicker className="custom-input" />
        </Form.Item>
        <Form.Item label="Status" name="status">
        <Select
    showSearch
    style={{
      width: 200,
    }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'Travelling expense',
        label: 'Travelling expense',
      },
      {
        value: 'Rent, rates and taxes',
        label: 'Rent, rates and taxes',
      },
      {
        value: 'Shopping',
        label: 'Shopping',
      },
      {
        value: 'Electricity Bill',
        label: 'Electricity Bill',
      },
      {
        value: 'Insurence Bill',
        label: 'Insurence Bill',
      },
      {
        value: 'EMI',
        label: 'EMI',
      },
    ]}
  ></Select>
</Form.Item>

        <Form.Item>
        <Button   htmlType="submit">Submit</Button>
             
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default AddExpenses;
