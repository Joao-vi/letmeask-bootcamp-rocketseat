import React from "react";
// Dentro de Buttonhtml tem todas as declaraçeos possiveis de variavies para button
import { ButtonHTMLAttributes } from "react";

import "../styles/button.scss";

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: BtnProps) {
  return (
    <button
      {...props}
      className={`btn ${isOutlined ? "outlined" : ""}`}
    ></button>
  );
}
