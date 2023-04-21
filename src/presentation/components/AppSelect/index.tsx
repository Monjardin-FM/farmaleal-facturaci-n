import React, { useContext } from "react";
import {
  AppInputProps,
  AppInput,
} from "../../../presentation/components/AppInput";

import { AppFormContext } from "../../../presentation/components/AppForm";
import clsx from "clsx";

export type AppTextFieldProps = Omit<
  React.ComponentPropsWithoutRef<"select">,
  "children" | "className"
> &
  AppInputProps;

export type AppSelectProps = React.ComponentPropsWithoutRef<"select">;

const AppSelect = ({
  children,
  required,
  className,
  ...props
}: AppSelectProps) => {
  const { isRequired } = useContext(AppFormContext);
  return (
    <select
      required={isRequired || required}
      className={clsx(
        " form-select text-xs hover:cursor-pointer border border-black border-opacity-10",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default AppInput(AppSelect);
