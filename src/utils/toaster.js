import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastError = (message) => {
  return toast.error(message, {
    duration: 4000,
    position: "top-center",
  });
};

const toastSuccess = (message) => {
  return toast.success(message, {
    duration: 4000,
    position: "top-center",
  });
};

export { toastError, toastSuccess };
