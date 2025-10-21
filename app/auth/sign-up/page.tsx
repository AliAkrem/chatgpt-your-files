"use client";

import {
  Anchor,
  Button,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./style/login.module.css";
import { useForm } from "@mantine/form";
import { useState, useTransition } from "react";
import Link from "next/link";
import { SignUp } from "./action";

export default function SignUpPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
      confirm: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
      confirm: (
        value: string,
        values: {
          email: string;
          password: string;
          confirm: string;
        },
      ) => (value === values.password ? null : "Passwords do not match"),
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof form.values) => {
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      startTransition(async () => {
        const result = await SignUp(null, formData);
        if (result.error) {
          setError(result.error);
        } else if (result.success) {
          setSuccess(result.success);
          form.reset();
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
            Create your account
          </Title>

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

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <PasswordInput
            label="Confirm Password"
            placeholder="Re-type Your password"
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
            Sign Up
          </Button>

          <Text ta="center" mt="md">
            Already have an account?{" "}
            <Anchor component={Link} href="/auth/sign-in" fw={500}>
              Login
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
}
