import { clsx } from "clsx";
import { Description, FieldError, Label, SharedFieldProps } from "primitives";
import { useContext, useId } from "react";
import {
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  RadioGroupStateContext,
  type RadioGroupProps as RACRadioGroupProps,
  type RadioProps as RACRadioProps,
} from "react-aria-components";
import "./radio.css";

export interface RadioGroupProps
  extends Omit<RACRadioGroupProps, "children">,
    SharedFieldProps {
  children?: React.ReactNode;
}

export function RadioGroup({
  className,
  label,
  description,
  errorMessage,
  children,
  ...props
}: RadioGroupProps) {
  const classNames = clsx(className, "radio-group");
  return (
    <RACRadioGroup {...props} className={classNames}>
      {label && <Label>{label}</Label>}
      {description && <Description>{description}</Description>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
      {children}
    </RACRadioGroup>
  );
}

export type RadioFieldProps = RACRadioProps &
  Omit<SharedFieldProps, "placeholder" | "errorMessage"> & {
    /** Shown under the description while the radio group is invalid. */
    errorMessage?: string;
  };
export function RadioField({
  children,
  className,
  label,
  description,
  errorMessage,
  ...props
}: RadioFieldProps) {
  const classNames = clsx(className, "radio-field");
  const labelText: string | undefined =
    label || (typeof children === "string" ? children : undefined);
  const id = useId();
  const labelId = `${id}-label`;
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;
  // The error message is only rendered, and only referenced, while the group
  // is invalid.
  const groupState = useContext(RadioGroupStateContext);
  const showError = Boolean(groupState?.isInvalid && errorMessage);
  const describedBy =
    [description && descriptionId, showError && errorId]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <RACRadio
      aria-labelledby={labelText ? labelId : undefined}
      aria-describedby={describedBy}
      className={classNames}
      {...props}
    >
      <>
        {/* A span, not a label: RACRadio already renders the label element. */}
        <span className="label" id={labelId}>
          {labelText}
        </span>
        <Radio />
        {/* A span, not Description: inside a RadioGroup that component
              would take the slot of the group's own description. */}
        {description && (
          <span className="description" id={descriptionId}>
            {description}
          </span>
        )}
        {showError && (
          <span className="error-message" id={errorId}>
            {errorMessage}
          </span>
        )}
        {labelText !== children && (children as React.ReactNode | undefined)}
      </>
    </RACRadio>
  );
}

export type RadioProps = React.ComponentPropsWithoutRef<"div">;
export function Radio({ className, ...props }: RadioProps) {
  const classNames = clsx(className, "radio");
  return (
    <div className={classNames} {...props}>
      <span aria-hidden="true" className="radio-check" />
    </div>
  );
}
