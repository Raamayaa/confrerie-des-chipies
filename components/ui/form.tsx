"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: ControllerProps<TFieldValues, TName>
) => {
  return <Controller {...props} />;
};

function FormItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-2", className)}
      {...props}
    />
  );
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      className={cn(className)}
      {...props}
    />
  );
}

function FormControl({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

function FormMessage() {
  const {
    formState: { errors },
  } = useFormContext();

  const error = Object.values(errors)[0];

  if (!error) return null;

  return (
    <p className="text-sm font-medium text-destructive">
      {String((error as { message?: string }).message ?? "")}
    </p>
  );
}

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};