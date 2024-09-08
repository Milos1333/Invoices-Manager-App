import { Form, DatePicker } from "antd";

const DateValidator = ({ form }) => {
  const validateDate = (rule, value) => {
    if (!value) {
      return Promise.reject();
    }

    const selectedDate = value.toDate();
    const today = new Date();
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return Promise.reject("Date cannot be in the past!");
    }

    return Promise.resolve();
  };

  return (
    <Form.Item
      name="date"
      label="Date"
      rules={[
        { required: true, message: "Please select a date!" },
        { validator: validateDate },
      ]}
    >
      <DatePicker style={{ width: "100%" }} placeholder="Select date" />
    </Form.Item>
  );
};

export default DateValidator;
