import { toast } from "react-toastify";
import CustomToast from "./CustomToast";

const showToast = (message, type = "success") => {
  toast(
    ({ closeToast }) => (
      <CustomToast message={message} type={type} closeToast={closeToast} />
    ),
    {
      closeButton: false,
      icon: false,
    },
  );
};

export const successToast = (message) => {
  showToast(message, "success");
};

export const errorToast = (message) => {
  showToast(message, "error");
};

export const warningToast = (message) => {
  showToast(message, "warning");
};

export const infoToast = (message) => {
  showToast(message, "info");
};
