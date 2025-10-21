"use client";

import { Anchor, Button, Paper, Text, TextInput, Title } from "@mantine/core";
import classes from "./style/forgot-password.module.css";
import { useForm } from "@mantine/form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ForgotPassword } from "./action";
import { notifications } from "@mantine/notifications";

export default function ForgotPasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof form.values) => {
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("email", values.email);

    try {
      startTransition(async () => {
        const result = await ForgotPassword(null, formData);
        if (result.error) {
          setError(result.error);
          notifications.show({
            title: "Error",
            message: result.error,
            color: "red",
          });
        } else if (result.success) {
          setSuccess(result.success);
          notifications.show({
            title: "Success",
            message: result.success,
            color: "green",
          });
          form.reset();
        }
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
      notifications.show({
        title: "Error",
        message: err.message || "An error occurred",
        color: "red",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            Forgot Password
          </Title>

          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </Text>

          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          {success && (
            <Text c="green" size="sm" mt="sm">
              {success}
            </Text>
          )}

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            size="md"
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            loading={isPending}
          >
            Send Reset Link
          </Button>

          <Text ta="center" mt="md">
            Remember your password?{" "}
            <Anchor component={Link} href="/auth/sign-in" fw={500}>
              Back to Login
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
}
