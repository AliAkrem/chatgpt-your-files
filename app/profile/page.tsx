import { getCurrentUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Paper, Title, Text, Stack, Group } from "@mantine/core";
import UserMenu from "../_components/user-menu";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <Group justify="space-between" mb="xl">
        <Title order={1}>Profile</Title>
        <UserMenu user={{ email: user.email }} />
      </Group>

      <Paper shadow="sm" p="xl" radius="md" withBorder>
        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} c="dimmed">
              Email
            </Text>
            <Text size="lg">{user.email}</Text>
          </div>

          <div>
            <Text size="sm" fw={500} c="dimmed">
              User ID
            </Text>
            <Text size="sm" c="dimmed" style={{ wordBreak: "break-all" }}>
              {user.id}
            </Text>
          </div>

          <div>
            <Text size="sm" fw={500} c="dimmed">
              Created At
            </Text>
            <Text size="sm">
              {new Date(user.created_at).toLocaleDateString()}
            </Text>
          </div>
        </Stack>
      </Paper>
    </div>
  );
}
