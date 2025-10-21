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
import { SignIn } from "./action";
import { useState, useTransition } from "react";
import Link from "next/link";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      password: (value: string) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (values: typeof form.values) => {
    setError("");

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      startTransition(async () => {
        const { error } = await SignIn(null, formData);
        setError(error);
      });
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            Welcome back!
          </Title>

          {error && (
            <Text c="red" size="sm" mt="sm">
              {error}
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

          <Text ta="right" mt="xs">
            <Anchor component={Link} href="/auth/forgot-password" size="sm" fw={500}>
              Forgot password?
            </Anchor>
          </Text>

          <Button
            type="submit"
            fullWidth
            mt="xl"
            size="md"
            radius="md"
            loading={isPending}
          >
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor component={Link} href="/auth/sign-up" fw={500}>
              Register
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
}
