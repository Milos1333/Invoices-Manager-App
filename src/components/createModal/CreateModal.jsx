import { Modal, Form, Input, InputNumber, Switch, Select, message } from "antd";
import { useEffect } from "react";
import DateValidator from "../dateValidator/dateValidator";
import "./createModal.style.css";

const CreateModal = ({ isVisible, onClose, onCreate, type, data }) => {
  const [form] = Form.useForm();

  const handleModalClose = () => {
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (!isVisible) {
      form.resetFields();
    }
  }, [isVisible, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const sellers = data.sellers;
  const customers = data.customers;

  const renderFormFields = () => {
    switch (type) {
      case "invoice":
        return (
          <>
            <Form.Item
              name="sellerName"
              label="Seller Name"
              rules={[{ required: true, message: "Please enter seller name!" }]}
            >
              <Select placeholder="Select seller">
                {sellers
                  .filter((seller) => seller.isActive) // Filter to show only active sellers
                  .map((seller) => (
                    <Select.Option key={seller.id} value={seller.companyName}>
                      {seller.companyName}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="customerName"
              label="Customer Name"
              rules={[
                { required: true, message: "Please enter customer name!" },
              ]}
            >
              <Select placeholder="Select customer">
                {customers.map((customer) => (
                  <Select.Option key={customer.id} value={customer.name}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <DateValidator form={form} />
            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: true, message: "Please enter amount!" },
                {
                  validator: (_, value) => {
                    if (value <= 0) {
                      return Promise.reject("Amount must be greater than 0!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter amount"
              />
            </Form.Item>
          </>
        );
      case "seller":
        return (
          <>
            <Form.Item
              name="companyName"
              label="Company Name"
              rules={[
                { required: true, message: "Please enter company name!" },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item
              name="hqAddress"
              label="HQ Address"
              rules={[{ required: true, message: "Please enter address!" }]}
            >
              <Input placeholder="Enter HQ address" />
            </Form.Item>
            <Form.Item name="isActive" label="Active" valuePropName="checked">
              <Switch />
            </Form.Item>
          </>
        );
      case "customer":
        return (
          <>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please enter customer name!" },
              ]}
            >
              <Input placeholder="Enter customer's first name" />
            </Form.Item>
            <Form.Item
              name="surname"
              label="Surname"
              rules={[
                { required: true, message: "Please enter customer surname!" },
              ]}
            >
              <Input placeholder="Enter customer's surname" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter address!" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: "Please enter age!" },
                {
                  validator: (_, value) => {
                    if (value < 18) {
                      return Promise.reject("Age must be 18 or older!");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="Enter age"
              />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      title={`Create an ${type}`}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleModalClose}
      okText="Create"
      cancelText="Discard"
      wrapClassName="create-wrap"
    >
      <Form form={form} layout="vertical">
        {renderFormFields()}
      </Form>
    </Modal>
  );
};

export default CreateModal;
