"use client";

import {
  Button,
  TextInput,
  Box,
  Stack,
  Paper,
  Group,
  Text,
  Center,
  Loader,
} from "@mantine/core";
import { usePipeline } from "@/lib/hooks/use-pipeline";
import { createClient } from "@/lib/supabase/client";
import { useChat } from "ai/react";
import { IconSend } from "@tabler/icons-react";

export default function ChatPage() {
  const supabase = createClient();

  const generateEmbedding = usePipeline(
    "feature-extraction",
    "Supabase/gte-small",
  );

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`,
    });

  const isReady = !!generateEmbedding;

  return (
    <Box maw={1200} w="100%" h="100%" mx="auto">
      <Stack gap="xl" h="100%" p={{ base: "md", sm: "xl" }}>
        <Paper
          p={{ base: "md", sm: "xl" }}
          withBorder
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
          }}
        >
          <Box
            style={{
              flexGrow: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            pr="xs"
          >
            <Stack gap="md" style={{ flexGrow: 1 }}>
              {messages.map(({ id, role, content }) => (
                <Paper
                  key={id}
                  p="md"
                  radius="xl"
                  bg={role === "user" ? "blue.6" : "gray.6"}
                  c="white"
                  maw={400}
                  style={{
                    alignSelf: role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Text size="sm">{content}</Text>
                </Paper>
              ))}
              {isLoading && (
                <Box style={{ alignSelf: "flex-start" }}>
                  <Group gap="xs" c="gray.5">
                    <Loader size="sm" />
                    <Text size="sm">Thinking...</Text>
                  </Group>
                </Box>
              )}
              {messages.length === 0 && (
                <Center style={{ flexGrow: 1 }}>
                  <Box opacity={0.1}>
                    <svg
                      width="150px"
                      height="150px"
                      version="1.1"
                      viewBox="0 0 100 100"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path d="m77.082 39.582h-29.164c-3.543 0-6.25 2.707-6.25 6.25v16.668c0 3.332 2.707 6.25 6.25 6.25h20.832l8.332 8.332v-8.332c3.543 0 6.25-2.918 6.25-6.25v-16.668c0-3.5391-2.707-6.25-6.25-6.25z" />
                        <path d="m52.082 25h-29.164c-3.543 0-6.25 2.707-6.25 6.25v16.668c0 3.332 2.707 6.25 6.25 6.25v8.332l8.332-8.332h6.25v-8.332c0-5.832 4.582-10.418 10.418-10.418h10.418v-4.168c-0.003907-3.543-2.7109-6.25-6.2539-6.25z" />
                      </g>
                    </svg>
                  </Box>
                </Center>
              )}
            </Stack>
          </Box>
          <Box mt="md">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!generateEmbedding) {
                  throw new Error("Unable to generate embeddings");
                }

                const output = await generateEmbedding(input, {
                  pooling: "mean",
                  normalize: true,
                });

                const embedding = JSON.stringify(Array.from(output.data));

                const {
                  data: { session },
                } = await supabase.auth.getSession();

                if (!session) {
                  return;
                }

                handleSubmit(e, {
                  options: {
                    headers: {
                      authorization: `Bearer ${session.access_token}`,
                    },
                    body: {
                      embedding,
                    },
                  },
                });
              }}
            >
              <Group gap="sm">
                <TextInput
                  type="text"
                  placeholder="Send a message"
                  value={input}
                  onChange={(e) => handleInputChange(e)}
                  style={{ flexGrow: 1 }}
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={!isReady}
                  rightSection={<IconSend size={16} />}
                >
                  Send
                </Button>
              </Group>
            </form>
          </Box>
        </Paper>
      </Stack>
    </Box>
  );
}
