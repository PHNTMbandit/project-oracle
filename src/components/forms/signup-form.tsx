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
import { signupFormSchema } from "@/lib/schemas/signup-form-schema";
import { signup } from "@/app/signup/action";
import { Input } from "../ui/input";
import findFormErrors from "@/utils/find-form-errors";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export interface SignupFormProps
  extends React.AnchorHTMLAttributes<HTMLFormElement> {}

const SignupForm = React.forwardRef<HTMLFormElement, SignupFormProps>(
  ({ className, children, ...props }, ref) => {
    const [dialogState, setDialogState] = React.useState(false);

    const form = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

    const [formState, formAction] = useFormState(signup, {
      success: false,
      authError: "",
      validationErrors: [],
    });

    const usernameErrors = findFormErrors(
      "username",
      formState.validationErrors
    );
    const emailErrors = findFormErrors("email", formState.validationErrors);
    const passwordErrors = findFormErrors(
      "password",
      formState.validationErrors
    );
    const confirmPasswordErrors = findFormErrors(
      "confirmPassword",
      formState.validationErrors
    );

    React.useEffect(() => {
      if (formState.success) {
        setDialogState(true);
      }
    }, [formState.success]);

    return (
      <>
        {formState.authError && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{formState.authError}</AlertDescription>
          </Alert>
        )}
        <Dialog open={dialogState}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Account</DialogTitle>
              <DialogDescription>
                Please confirm your account via the confirmation letter that was
                sent your registered email address.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Form {...form}>
          <form
            action={formAction}
            className={cn("", className)}
            ref={ref}
            {...props}>
            {children}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={"username"}
                      placeholder="Username"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{usernameErrors}</FormMessage>
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type={"password"}
                      placeholder="Confirm Password"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{confirmPasswordErrors}</FormMessage>
                </FormItem>
              )}
            />
            <SubmitButton>Signup</SubmitButton>
          </form>
        </Form>
      </>
    );
  }
);

SignupForm.displayName = "SignupForm";

export { SignupForm };
