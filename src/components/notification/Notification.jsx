import { notification } from "antd";
import { useNotificationStore } from "../../stores/notification.store";
import { useEffect } from "react";

const Notification = () => {
  const { isOpen, type, message, description, setClose, color } =
    useNotificationStore();

  useEffect(() => {
    if (isOpen) {
      notification[type]({
        message: message,
        description: description,
        placement: "bottomRight",
        style: {
          backgroundColor: color,
        },
      });
      setClose();
    }
  }, [isOpen, type, message, description, setClose]);
};

export default Notification;
