import { notify } from "react-notify-toast";

export default Notify = (msg, iserror) => {
  if (iserror) {
    notify.show(msg, "error", 3000);
  } else {
    notify.show(msg, "success", 3000);
  }
};
