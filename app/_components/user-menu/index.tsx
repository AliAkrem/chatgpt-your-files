"use client";

import {
  Menu,
  Avatar,
  Text,
  UnstyledButton,
  Group,
  rem
} from "@mantine/core";
import {
  IconChevronDown,
  IconKey,
  IconLogout,
  IconUser
} from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

interface UserMenuProps {
  user: {
    email?: string;
    name?: string;
  };
}

export default function UserMenu({ user }: UserMenuProps) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton>
          <Group gap={7}>
            <Avatar
              radius="xl"
              size={32}
              color="blue"
            >
              {user.email?.charAt(0).toUpperCase() || "U"}
            </Avatar>
            <Text fw={500} size="sm" lh={1} mr={3}>
              {user.email?.split("@")[0] || "User"}
            </Text>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconUser style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
          disabled
        >
          <Text size="xs" c="dimmed">
            {user.email}
          </Text>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          component={Link}
          href="/auth/change-password"
          leftSection={
            <IconKey style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
        >
          Change Password
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          component={Link}
          href="/auth/sign-out"
          leftSection={
            <IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          }
          color="red"
        >
          Sign Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
