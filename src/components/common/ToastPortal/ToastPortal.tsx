import React from "react";
import ReactDOM from "react-dom";
// import styles from "./ToastPortal.module.scss";
import { Toaster } from "react-hot-toast";

export default function ToastPortal() {
  return ReactDOM.createPortal(
    <Toaster />,
    document.getElementById("toast") as HTMLElement
  );
}
