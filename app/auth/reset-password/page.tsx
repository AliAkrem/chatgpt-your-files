"use client";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import classes from "./style/reset-password.module.css";
import { useForm } from "@mantine/form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ResetPassword } from "./action";

export default function ResetPasswordPage() {
  const [error, setError] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      password: "",
      confirm: "",
    },
    validate: {
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirm: (
        value: string,
        values: {
          password: string;
          confirm: string;
        },
      ) => (value === values.password ? null : "Passwords do not match"),
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof form.values) => {
    setError("");

    const formData = new FormData();
    formData.append("password", values.password);

    try {
      startTransition(async () => {
        const result = await ResetPassword(null, formData);
        if (result?.error) {
          setError(result.error);
        }
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            Reset Password
          </Title>

          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Enter your new password below.
          </Text>

          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
            </Text>
          )}

          <PasswordInput
            label="New Password"
            placeholder="Your new password"
            size="md"
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Re-type your new password"
            mt="md"
            size="md"
            radius="md"
            key={form.key("confirm")}
            {...form.getInputProps("confirm")}
          />

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            loading={isPending}
          >
            Reset Password
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
