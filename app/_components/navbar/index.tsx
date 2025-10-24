"use client";

import {
  Box,
  Burger,
  Button,
  Divider,
  Drawer,
  Group,
  Loader,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./navbar.module.css";
import SupaboshLogo from "@/components/logos/supaBoshLogo";
import Link from "next/link";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function Navbar() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { user, isLoading } = useAuthStore();

  console.log('Navbar render - user:', user?.email, 'isLoading:', isLoading)


  return (
    <Box>
      <header className={classes.header}>
        <Group align="center" justify="space-between" h="100%">
          <Box component={Link} href={"/"} w={32}>
            <SupaboshLogo enableAnimation={false} />
          </Box>

          {user && !isLoading ? (<>
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link href="/chat" className={classes.link}>
                Chat
              </Link>
              <Link href="/files" className={classes.link}>
                Library
              </Link>
              <Link href="/profile" className={classes.link}>
                Profile
              </Link>
            </Group>
          </>
          ) : !user && !isLoading ?
            (<>
              <Group visibleFrom="sm">

                <Button component={Link} href="/auth/sign-in" variant="default">
                  Log in
                </Button>
                <Button component={Link} href="/auth/sign-up">
                  Sign up
                </Button>
              </Group>
            </>) : (
              <>
                <Loader size={'sm'} />
              </>
            )
          }




          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

          {user && (<>
            <Link href="/chat" className={classes.link}>
              Chat
            </Link>
            <Link href="/files" className={classes.link}>
              Library
            </Link>
            <Link href="/profile" className={classes.link}>
              Profile
            </Link>
          </>)
          }

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {!user ? (
              <>
                <Button variant="default">Log in</Button>
                <Button>Sign up</Button>
              </>
            )
              : null
            }
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
