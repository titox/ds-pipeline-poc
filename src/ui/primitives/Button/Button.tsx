import { clsx } from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";
import { IconLoader } from "icons";
import { type AnchorOrButtonProps } from "utils";
import "./button.css";

export type ButtonProps = Omit<ButtonBaseProps, "variant"> & {
  variant?: Exclude<
    ButtonBaseProps["variant"],
    "danger-primary" | "danger-subtle"
  >;
};
export const Button = React.forwardRef(function Button(
  { className, size = "medium", variant = "primary", ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  return renderButton(props as ButtonBaseProps, classNames, ref);
});

export type ButtonDangerProps = Omit<ButtonBaseProps, "variant"> & {
  variant?: Exclude<
    ButtonBaseProps["variant"],
    "primary" | "subtle" | "neutral"
  >;
};
/**
 * Only used for destructive actions
 */
export const ButtonDanger = React.forwardRef(function Button(
  {
    className,
    size = "medium",
    variant = "danger-primary",
    ...props
  }: ButtonDangerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  return renderButton(props as ButtonBaseProps, classNames, ref);
});

type ButtonBaseProps = {
  type?: ComponentPropsWithoutRef<"button">["type"];
  size?: "small" | "medium";
  variant?:
    | "primary"
    | "neutral"
    | "subtle"
    | "danger-primary"
    | "danger-subtle";
  /** Shows a spinner before the label and blocks presses (Figma State=Loading). */
  isLoading?: boolean;
} & AnchorOrButtonProps;

function renderButton(
  { isLoading, children, style: _style, ...props }: ButtonBaseProps,
  className: string,
  ref: React.ForwardedRef<HTMLElement>,
) {
  // children may be a render function (react-aria); pass it through untouched.
  const content = (
    typeof children === "function" ? (
      children
    ) : (
      <>
        {isLoading ? <IconLoader className="button-spinner" /> : null}
        {children}
      </>
    )
  ) as React.ReactNode;

  if (isAnchorProps(props)) {
    // A link has no pending state in react-aria, so a loading link is disabled
    // (no navigation, no press) and keeps the loading look through CSS.
    const isLinkLoading = Boolean(isLoading) && !props.isDisabled;
    return (
      <RACLink
        {...props}
        className={className}
        isDisabled={props.isDisabled || isLoading}
        data-pending={isLoading || undefined}
        data-link-pending={isLinkLoading || undefined}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {content}
      </RACLink>
    );
  }
  return (
    <RACButton
      {...(props as RACButtonProps)}
      className={className}
      isPending={isLoading}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {content}
    </RACButton>
  );
}

function isAnchorProps(
  props: ButtonBaseProps | ButtonDangerProps,
): props is (ButtonBaseProps | ButtonDangerProps) &
  ComponentPropsWithoutRef<typeof RACLink> {
  return "href" in props;
}

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  align?: "start" | "end" | "center" | "justify" | "stack";
};
export const ButtonGroup = ({
  align = "start",
  className,
  ...props
}: ButtonGroupProps) => {
  const classNames = clsx(
    className,
    "button-group",
    `button-group-align-${align}`,
  );
  return <div className={classNames} {...props} />;
};
