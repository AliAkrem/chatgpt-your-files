import {
  Container,
  Title,
  Text,
  Paper,
  Stack,
  Button,
  Group,
  ThemeIcon,
} from "@mantine/core";
import {
  IconLogin,
  IconUserPlus,
  IconKey,
  IconLock,
  IconShieldLock,
  IconUser,
  IconCode,
} from "@tabler/icons-react";
import Link from "next/link";

export default async function AuthDemoPage() {




  return (
    <Container size="md" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={1} mb="md">
            Authentication System
          </Title>
          <Text size="lg" c="dimmed">
            Complete authentication system with all features
          </Text>
        </div>

        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Title order={2} size="h3" mb="md">
            Available Features
          </Title>

          <Stack gap="md">
            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="blue">
                  <IconLogin size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Login</Text>
                  <Text size="sm" c="dimmed">
                    Sign in with email and password
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/auth/sign-in" variant="light">
                Go to Login
              </Button>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="green">
                  <IconUserPlus size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Sign Up</Text>
                  <Text size="sm" c="dimmed">
                    Create a new account
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/auth/sign-up" variant="light">
                Go to Sign Up
              </Button>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="orange">
                  <IconKey size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Forgot Password</Text>
                  <Text size="sm" c="dimmed">
                    Request password reset email
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/auth/forgot-password" variant="light">
                Go to Forgot Password
              </Button>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="violet">
                  <IconShieldLock size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Reset Password</Text>
                  <Text size="sm" c="dimmed">
                    Set new password via email link
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/auth/forgot-password" variant="light">
                Go to Reset Password
              </Button>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="red">
                  <IconLock size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Change Password</Text>
                  <Text size="sm" c="dimmed">
                    Update password when logged in
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/auth/change-password" variant="light">
                Go to Change Password
              </Button>
            </Group>

            <Group justify="space-between" wrap="nowrap">
              <Group gap="sm">
                <ThemeIcon size="lg" variant="light" color="cyan">
                  <IconUser size={20} />
                </ThemeIcon>
                <div>
                  <Text fw={500}>Profile</Text>
                  <Text size="sm" c="dimmed">
                    View user profile with menu
                  </Text>
                </div>
              </Group>
              <Button component={Link} href="/profile" variant="light">
                Go to Profile
              </Button>
            </Group>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
}
