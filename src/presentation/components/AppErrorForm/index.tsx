import React from "react";
import { Zoom } from "@mui/material";
import { Alert } from "@mui/material";
import { FormikErrors } from "formik";
export interface AppErrorFormProps
  extends React.ComponentPropsWithoutRef<"div"> {
  errorName: any;
  errorFlag: boolean;
}
export const AppErrorForm = ({
  errorName,
  errorFlag,
  children,
  ...props
}: AppErrorFormProps) => {
  return (
    <Zoom in={errorFlag} {...props}>
      <div className="border border-danger-700 rounded-md border-opacity-20">
        <Alert severity="error">{errorName}</Alert>
      </div>
    </Zoom>
  );
};
