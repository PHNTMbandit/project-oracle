"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SubmitButton } from "../submit-button";
import { Input } from "../ui/input";
import findFormErrors from "@/utils/find-form-errors";
import { loginFormSchema } from "@/lib/schemas/login-form-schema";
import { login } from "@/app/login/action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface LoginFormProps
  extends React.AnchorHTMLAttributes<HTMLFormElement> {}

const LoginForm = React.forwardRef<HTMLFormElement, LoginFormProps>(
  ({ className, children, ...props }, ref) => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
      resolver: zodResolver(loginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const [formState, formAction] = useFormState(login, {
      success: false,
      authError: "",
      validationErrors: [],
    });

    const emailErrors = findFormErrors("email", formState.validationErrors);
    const passwordErrors = findFormErrors(
      "password",
      formState.validationErrors
    );

    React.useEffect(() => {
      if (formState.success) {
        redirect("/");
      }
    });

    return (
      <>
        {formState.authError && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.authError}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form
            action={formAction}
            className={cn("", className)}
            ref={ref}
            {...props}>
            {children}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={"email"}
                      placeholder="Email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{emailErrors}</FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder="Password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{passwordErrors}</FormMessage>
                </FormItem>
              )}
            />
            <SubmitButton>Login</SubmitButton>
          </form>
        </Form>
      </>
    );
  }
);

LoginForm.displayName = "LoginForm";

export { LoginForm };
