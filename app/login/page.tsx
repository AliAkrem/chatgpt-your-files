"use client";
import Messages from "./messages";

import {
  Anchor,
  Button,
  Checkbox,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./style/login.module.css";
import { useForm } from "@mantine/form";
import { Sign } from "crypto";
import { SignIn } from "../auth/sign-in/action";

export default function Login() {
  const form = useForm({
    mode: "controlled",
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.validate();

    if (!!form.isValid)
      SignIn({
        email: form.values.email,
        password: form.values.password,
      });
  };

  return (
    <div className={classes.wrapper}>
      <form method="post" onSubmit={onSubmit}>
        <Paper className={classes.form}>
          <Title order={2} className={classes.title}>
            Welcome back to Mantine!
          </Title>

          <TextInput
            label="Email address"
            placeholder="hello@gmail.com"
            name="email"
            size="md"
            radius="md"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            name="password"
            mt="md"
            size="md"
            radius="md"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" size="md" radius="md">
            Login
          </Button>

          <Text ta="center" mt="md">
            Don&apos;t have an account?{" "}
            <Anchor
              href="#"
              fw={500}
              onClick={(event) => event.preventDefault()}
            >
              Register
            </Anchor>
          </Text>
        </Paper>
      </form>
    </div>
  );
}
