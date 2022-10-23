import React from "react";
import { Input } from "./formFields/Input";

export const FormikControl = ({ control, ...rest }) => {
  switch (control) {
    case "input":
      return <Input {...rest} />;
    default:
      return null;
  }
};
