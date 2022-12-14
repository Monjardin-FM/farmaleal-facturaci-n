import React, { useContext } from "react";
import { AppFormContext } from "../../../presentation/components/AppForm";
import {
  AppInput,
  AppInputProps,
} from "../../../presentation/components/AppInput";
import clsx from "clsx";

export type AppTextFieldProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "children" | "className"
> &
  AppInputProps;

const AppTextField = ({
  required,
  type = "text",
  className,
  onWheel,
  ...props
}: AppTextFieldProps) => {
  const { isRequired } = useContext(AppFormContext);

  return (
    <input
      type={type}
      required={isRequired || required}
      className={clsx(
        "form-input border border-black border-opacity-10",

        className
      )}
      onWheel={(event) => {
        if (onWheel) onWheel(event);
        else if (type === "number") event.currentTarget.blur();
      }}
      {...props}
    />
  );
};

export default AppInput(AppTextField);
