import { DatePicker, Form, Input, Modal, Button, Select} from 'antd';
import React from 'react';


const AddIncome = ({ isIncomeModalVisible, handleIncomeCancel, onFinish }) => {
  const [form] = Form.useForm();
  console.log(" Add Income Modal");
  return (
    <>
      <Modal
        title="Add Income"
        visible={isIncomeModalVisible} 
        onCancel={handleIncomeCancel}
        footer={null}
      >

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => {
          console.log('Form values:', values);
          onFinish(values, "Income");
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
        value: 'Interest',
        label: 'Interest',
      },
      {
        value: 'Rent',
        label: 'Rent',
      },
      {
        value: 'Salaries',
        label: 'Salaries',
      },
      {
        value: '4',
        label: 'Identified',
      },
      {
        value: '5',
        label: 'Resolved',
      },
      {
        value: '6',
        label: 'Cancelled',
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

export default AddIncome;