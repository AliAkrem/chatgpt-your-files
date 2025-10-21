"use client";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  Title,
} from "@mantine/core";
import classes from "./style/change-password.module.css";
import { useForm } from "@mantine/form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { ChangePassword } from "./action";
import { notifications } from "@mantine/notifications";

export default function ChangePasswordPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirm: "",
    },
    validate: {
      currentPassword: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      newPassword: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirm: (value: string, values: {
        currentPassword: string,
        newPassword: string,
        confirm: string,
      }) =>
        value === values.newPassword ? null : "Passwords do not match",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof form.values) => {
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("currentPassword", values.currentPassword);
    formData.append("newPassword", values.newPassword);

    try {
      startTransition(async () => {
        const result = await ChangePassword(null, formData);
        if (result?.error) {
          setError(result.error);
          notifications.show({
            title: "Error",
            message: result.error,
            color: "red",
          });
        } else if (result?.success) {
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
            Change Password
          </Title>

          <Text size="sm" c="dimmed" mb="xl" ta="center">
            Enter your current password and choose a new one.
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

          <PasswordInput
            label="Current Password"
            placeholder="Your current password"
            size="md"
            radius="md"
            key={form.key("currentPassword")}
            {...form.getInputProps("currentPassword")}
          />

          <PasswordInput
            label="New Password"
            placeholder="Your new password"
            mt="md"
            size="md"
            radius="md"
            key={form.key("newPassword")}
            {...form.getInputProps("newPassword")}
          />

          <PasswordInput
            label="Confirm New Password"
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
            Change Password
          </Button>

          <Text ta="center" mt="md">
            <Anchor component={Link} href="/" fw={500}>
              Back to Home
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
}
