"use client";
import { Box, Button, Container, Flex, Group, Text } from "@mantine/core";
import Link from "next/link";
import classes from "./home.module.css";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import SupaboshLogo from "@/components/logos/supaBoshLogo";

export default function HomePage() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate title characters
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 500,
        easing: "easeOutQuad",
      });
    }

    // Animate description
    if (descriptionRef.current) {
      animate(descriptionRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        delay: 500,
        easing: "easeOutQuad",
      });
    }

    // Animate buttons
    if (controlsRef.current) {
      const buttons = controlsRef.current.querySelectorAll("button, a");
      animate(buttons, {
        opacity: [0, 1],
        translateY: [20, 0],
        scale: [0.9, 1],
        duration: 800,
        delay: stagger(150, { start: 800 }),
        easing: "easeOutBack",
      });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <Container size={"lg"} className={classes.inner}>
        <h1 style={{ opacity: 0 }} ref={titleRef} className={classes.title}>
          Talk to Your Data with{" "}
          <Text component="span" c="blue" inherit>
            <Flex align={"center"}>
              Supabosh{" "}
              <Box w={64}>
                <SupaboshLogo enableAnimation />
              </Box>
            </Flex>
          </Text>{" "}
        </h1>

        <Text
          ref={descriptionRef}
          className={classes.description}
          c="dimmed"
          style={{ opacity: 0 }}
        >
          Integrate Retrieval-Augmented Generation in minutes. Ground your
          chatbot in real documents, APIs, or databases — no hallucinations,
          just reliable answers.
        </Text>

        <Group ref={controlsRef} className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            style={{ opacity: 0 }}
          >
            Get started
          </Button>

          {process.env.NODE_ENV === "development" && (
            <Button
              component={Link}
              href="dev/auth-demo"
              size="xl"
              variant="light"
              className={classes.control}
              style={{ opacity: 0 }}
            >
              Auth Demo
            </Button>
          )}

          <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            style={{ opacity: 0 }}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
