import React from "react";
import { useController } from "react-hook-form";
import "./input.scss";

const InputText = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return <input {...field} {...props} className='auth-input'></input>;
};

export default InputText;
