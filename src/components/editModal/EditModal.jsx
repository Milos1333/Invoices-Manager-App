import { Modal, Form, Input, InputNumber, Switch, Select, message } from "antd";
import { useEffect } from "react";
import "./EditModal.style.css";

const EditModal = ({
  isVisible,
  onClose,
  onEdit,
  type,
  data,
  initialValues,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (isVisible && initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [isVisible, form, initialValues, data]);

  const handleModalClose = () => {
    form.resetFields();
    onClose();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedValues = { ...values };

        if (type === "invoice") {
          const seller = data.sellers.find(
            (s) => s.companyName === values.sellerName
          );
          const customer = data.customers.find(
            (c) => c.name === values.customerName
          );

          updatedValues.sellerId = seller ? seller.id : null;
          updatedValues.customerId = customer ? customer.id : null;
        }

        onEdit(updatedValues);
        form.resetFields();
        onClose();
      })
      .catch((info) => {
        console.log("Validation failed:", info);
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
              rules={[
                { required: true, message: "Please enter the seller's name!" },
              ]}
            >
              <Select placeholder="Select Seller">
                {sellers
                  .filter((seller) => seller.isActive)
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
                {
                  required: true,
                  message: "Please enter the customer's name!",
                },
              ]}
            >
              <Select placeholder="Select Customer">
                {customers.map((customer) => (
                  <Select.Option key={customer.id} value={customer.name}>
                    {customer.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="date"
              label="Invoice Date"
              rules={[
                { required: true, message: "Please select the invoice date!" },
                () => ({
                  validator(_, value) {
                    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
                    const today = new Date().setHours(0, 0, 0, 0);

                    if (!value || selectedDate <= today) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Invoice date must be today's date!")
                    );
                  },
                }),
              ]}
            >
              <Input type="date" placeholder="Select invoice date" />
            </Form.Item>

            <Form.Item
              name="amount"
              label="Amount"
              rules={[
                { required: true, message: "Please enter the amount!" },
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
                { required: true, message: "Please enter the company name!" },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item
              name="hqAddress"
              label="Headquarters Address"
              rules={[
                {
                  required: true,
                  message: "Please enter the headquarters address!",
                },
              ]}
            >
              <Input placeholder="Enter headquarters address" />
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
              label="First Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer's first name!",
                },
              ]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              name="surname"
              label="Last Name"
              rules={[
                {
                  required: true,
                  message: "Please enter the customer's last name!",
                },
              ]}
            >
              <Input placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please enter the address!" }]}
            >
              <Input placeholder="Enter address" />
            </Form.Item>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: "Please enter the age!" },
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
      title={`Edit ${type}`}
      open={isVisible}
      onOk={handleOk}
      onCancel={handleModalClose}
      okText="Save"
      cancelText="Cancel"
      wrapClassName="create-edit-wrap"
    >
      <Form form={form} layout="vertical">
        {renderFormFields()}
      </Form>
    </Modal>
  );
};

export default EditModal;
