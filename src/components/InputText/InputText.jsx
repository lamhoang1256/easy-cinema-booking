import React from "react";
import { useController } from "react-hook-form";

const InputText = ({ control, label, defaultValue, ...props }) => {
  const { field } = useController({
    name: props.name,
    control,
    defaultValue,
  });
  return (
    <>
      {label && <h3>{label}</h3>}
      <input {...field} {...props}></input>
    </>
  );
};

export default InputText;
