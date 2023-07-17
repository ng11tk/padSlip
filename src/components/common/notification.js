import React from "react";
import { notification } from "antd";

import CancelWhiteIcon from "../../assets/cancel_white.svg";
import alerts from "../../constants/alerts";

const openNotification = (
  type,
  message,
  durationSeconds,
  title,
  customStyle
) => {
  let className = "";
  let header = title || null;
  let msg = message || null;
  let style = {};
  let key = `updatable-${Date.now()}`;
  let duration = durationSeconds || 3;
  console.log("showing notification", message);
  switch (type) {
    case alerts.ERROR:
      style = {
        ...style,
        color: "#FFFFFF",
        background: "#FF4747",
      };
      break;
    case alerts.SUCCESS:
      style = {
        ...style,
        color: "#FFFFFF",
        background: "#2AC981",
      };
      break;
    case alerts.WARNING:
      style = {
        ...style,
        color: "#FFFFFF",
        background: "#FA9917",
      };
      break;
    case alerts.INFO:
    default:
      style = {
        ...style,
        color: "#FFFFFF",
        background: "#2F3B52",
      };
      break;
  }

  notification.open({
    message: null,
    key: key,
    description: msg,
    duration: duration,
    style: style,
    closeIcon: (
      <img src={CancelWhiteIcon} alt="cancel button" width="25" height="25" />
    ),
  });

  setTimeout(() => {
    notification.destroy(key);
  }, duration * 1000);
};
export default openNotification;
