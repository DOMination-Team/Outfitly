"use client";

import { useState } from "react";
import type React from "react";

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useField } from "formik"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"
import withMotion from "@/HOC/withMotion";
import clsx from "clsx";
import type { IStyle } from "@/@types"   

import { Checkbox } from "../ui/checkbox";

type InputVariant = "filled" | "outline" | "subtle";

type CustomTextFieldProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: string;
  label?: string;
  isPassword?: boolean;
  style?: IStyle;
  variant?: InputVariant;
};

const baseLabelClasses = "text-sm font-medium text-foreground tracking-wide";

const baseInputClasses = [
  "file:text-foreground placeholder:text-muted-foreground",
  "selection:bg-primary selection:text-primary-foreground",
  "dark:bg-input/30 bg-input-background",
  "border border-input",
  "flex h-9 w-full min-w-0 rounded-md",
  "px-3 py-1 text-base md:text-sm",
  "transition-[color,box-shadow]",
  "outline-none",
  "file:inline-flex file:h-7 file:border-0 file:bg-transparent",
  "file:text-sm file:font-medium",
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
].join(" ");

const focusInputClasses =
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]";

const invalidInputClasses =
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive";

const baseCheckboxClasses =
  "h-4 w-4 rounded-md border border-input bg-input-background transition-all duration-200";

const checkedCheckboxClasses =
  "data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground";

const checkboxErrorClasses = "border-destructive";

const checkboxLabelClasses =
  "text-sm text-foreground cursor-pointer hover:text-primary transition-colors duration-200";

const passwordToggleButtonClasses = [
  "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
  "text-muted-foreground hover:text-primary",
  "hover:bg-secondary",
  "transition-all duration-200",
].join(" ");

const errorTextClasses =
  "mt-1 rounded-md border border-destructive/30 bg-destructive/5 px-2 py-1 text-xs text-destructive";

const inputVariantClasses: Record<InputVariant, string> = {
  filled: "bg-input-background",
  outline: "bg-transparent border border-input",
  subtle: "bg-muted border-transparent hover:border-input/60",
};

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  name,
  label,
  isPassword,
  type,
  style,
  variant = "filled",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta, helpers] = useField(name);

  const hasError = meta.touched && !!meta.error;

  const isCheckbox = type === "checkbox";

  return (
    <div className="space-y-2">
      {label && !isCheckbox && (
        <Label htmlFor={name} className={clsx(style?.label ?? baseLabelClasses)}>
          {label}
        </Label>
      )}

      <div className="relative">
        {isCheckbox ? (
          <div className="flex items-center gap-3">
            <Checkbox
              id={name}
              checked={!!field.value}
              onCheckedChange={(val: boolean) => helpers.setValue(val)}
              className={clsx(
                baseCheckboxClasses,
                checkedCheckboxClasses,
                style?.input,
                hasError && checkboxErrorClasses,
              )}
            />
            <Label htmlFor={name} className={clsx(style?.label ?? checkboxLabelClasses)}>
              {label}
            </Label>
          </div>
        ) : (
          <Input
            id={name}
            {...field}
            {...rest}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            aria-invalid={hasError || undefined}
            className={clsx(
              baseInputClasses,
              focusInputClasses,
              invalidInputClasses,
              inputVariantClasses[variant],
              style?.input,
              hasError && "border-destructive text-destructive",
            )}
          />
        )}

        {isPassword && !isCheckbox && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={passwordToggleButtonClasses}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {hasError && <p className={errorTextClasses}>{meta.error}</p>}
    </div>
  );
};

const MotionField = withMotion(CustomTextField);
export default MotionField;
