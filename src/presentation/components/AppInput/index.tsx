import React, { ReactNode } from "react";
import clsx from "clsx";
import { AppInputIcon } from "./AppInputIcon";
import { UIColorScheme } from "../types/ui-color-schema";

export type AppInputProps = {
  colorSchema?: UIColorScheme;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
};

export function AppInput<P>(WrappedComponent: React.ComponentType<P>) {
  const Component = (props: P & AppInputProps) => {
    const { colorSchema, leftIcon, rightIcon, ...allProps } = props;
    const componentProps: P = {
      ...(allProps as P),
      className: clsx(
        "w-full h-12 text-sm font-medium bg-white font-medium appearance-none  rounded-md transition duration-300 text-gray-800 focus:border-primary-400 focus:outline-none py-3 ",
        {
          "pl-12": props.leftIcon,
          "pl-4": !props.leftIcon,
          "pr-12": props.rightIcon,
          "pr-4": !props.rightIcon,
          "border-gray-200": !props.colorSchema || props.colorSchema === "gray",
          "border-primary-500": props.colorSchema === "primary",
          "border-success-500": props.colorSchema === "success",
          "border-info-500": props.colorSchema === "info",
          "border-warn-500": props.colorSchema === "warn",
          "border-danger-500": props.colorSchema === "danger",
        },
        props.className
      ),
    };
    return (
      <div
        className={clsx("w-full", {
          relative: props.leftIcon || props.rightIcon,
        })}
      >
        <WrappedComponent {...componentProps} />

        {props.leftIcon && (
          <AppInputIcon className="left-0">{props.leftIcon}</AppInputIcon>
        )}

        {props.rightIcon && (
          <AppInputIcon className="right-0">{props.rightIcon}</AppInputIcon>
        )}
      </div>
    );
  };

  return Component;
}
