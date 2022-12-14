import React, { useContext } from "react";
import classNames from "classnames";
import { AppFormContext } from "../../../presentation/components/AppForm";

export interface AppFormLabelProps
  extends React.ComponentPropsWithoutRef<"label"> {}

export const AppFormLabel = ({
  children,
  className,
  htmlFor,
  ...props
}: AppFormLabelProps) => {
  const { isRequired } = useContext(AppFormContext);
  return (
    <label
      htmlFor={htmlFor}
      className={classNames(
        "block pl-1 pb-2 font-medium text-sm text-primary-800",
        className
      )}
      {...props}
    >
      {children} {isRequired && <span className="text-danger-500">*</span>}
    </label>
  );
};
