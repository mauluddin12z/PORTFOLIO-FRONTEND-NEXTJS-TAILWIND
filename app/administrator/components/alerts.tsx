/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";

interface Props {
  showAlert: boolean;
  message: string;
  textColor: string;
  bgColor: string;
  bgColorHover: string;
}

let alertTimeout: any;

export default function Alerts({
  showAlert,
  message,
  textColor,
  bgColor,
  bgColorHover,
}: Props) {
  const [closeAlert, setCloseAlert] = useState(false);
  useEffect(() => {
    setCloseAlert(showAlert);
  }, [showAlert]);

  clearTimeout(alertTimeout);
  alertTimeout = setTimeout(() => {
    setCloseAlert(false);
  }, 3000);

  return (
    <div
      className={[
        `flex justify-between items-center px-4 ${bgColor} ${bgColorHover} ${textColor} rounded-lg transition-all origin-top w-full overflow-hidden`,
        closeAlert ? "h-[40px]" : "h-0",
      ].join(" ")}
      role="alert"
    >
      <div className="ml-3 text-sm font-medium">{message}</div>
      <button
        onClick={() => setCloseAlert((prev) => !prev)}
        type="button"
        className={`rounded-lg ${textColor} flex items-center justify-center p-1.5`}
      >
        <i className="fa-solid fa-x"></i>
      </button>
    </div>
  );
}
