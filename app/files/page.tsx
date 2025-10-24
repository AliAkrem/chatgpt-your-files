"use client";

import {
  Box,
  Stack,
  Paper,
  Group,
  Text,
  Center,
  Button,
  SimpleGrid,
  ActionIcon,
  Tooltip,
  FileInput,
  Title,
  Card,
  ThemeIcon,
  Progress,
  Alert,
  Modal,
  Loader,
} from "@mantine/core";
import {
  IconFile,
  IconDownload,
  IconTrash,
  IconUpload,
  IconFileTypePdf,

  IconX,
  IconCheck,
  IconAlertCircle,
  IconMarkdown,
} from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { createClient } from "@/lib/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { nprogress, NavigationProgress } from '@mantine/nprogress';

interface Document {
  created_at: string;
  id: number;
  name: string;
  storage_object_path: string;
  size?: number;
  type?: string;
};

type FileIconComponent = typeof IconFileTypePdf;

const getFileIcon = (fileName: string): FileIconComponent => {
  const extension = fileName.split(".").pop()?.toLowerCase() ?? "";

  switch (extension) {
    case "pdf":
      return IconFileTypePdf;
    case "md":
      return IconMarkdown;
    default:
      return IconFile;
  }
};

const formatFileSize = (bytes?: number) => {
  if (!bytes) return "";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
};

export default function FilesPage() {
  const supabase = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [uploadOpened, { open: openUpload, close: closeUpload }] =
    useDisclosure(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const {
    data: documents,
    isLoading,
    error,
  } = useQuery<Document[], Error>({
    queryKey: ["files"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents_with_storage_path")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        notifications.show({
          title: "Error",
          message: "Failed to fetch documents",
          color: "red",
          icon: <IconX size={16} />,
        });
        throw new Error(error.message);
      }

      return data as Document[];
    },
  });


  const uploadMutation = useMutation<string, Error, File>({
    mutationFn: async (file: File) => {
      nprogress.start();

      const fileName = `${crypto.randomUUID()}/${file.name}`;

      const { error } = await supabase.storage
        .from("files")
        .upload(fileName, file);

      if (error) throw new Error(error.message);

      return fileName;
    },

    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "File uploaded successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
      closeUpload();
      nprogress.complete()
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to upload file. Please try again.",
        color: "red",
        icon: <IconX size={16} />,
      });
      nprogress.complete()
    },
  });



  const deleteMutation = useMutation<void, Error, Document>({
    mutationFn: async (document: Document) => {

      console.log("here!")
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", document.id);

      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "File deleted successfully",
        color: "green",
        icon: <IconCheck size={16} />,
      });
      queryClient.invalidateQueries({ queryKey: ["files"] });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete file",
        color: "red",
        icon: <IconX size={16} />,
      });
    },
  });

  const handleDownload = async (document: Document): Promise<void> => {
    try {
      const { data, error } = await supabase.storage
        .from("files")
        .createSignedUrl(document.storage_object_path, 60);

      if (error) {
        notifications.show({
          title: "Error",
          message: "Failed to download file",
          color: "red",
          icon: <IconX size={16} />,
        });
        return;
      }

      window.open(data.signedUrl, "_blank");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to download file",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  const handleDelete = (document: Document): void => {
    modals.openConfirmModal({
      title: "Delete File",
      children: (
        <Text size="sm">
          Are you sure you want to delete "{document.name}"? This action cannot
          be undone.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteMutation.mutate(document),
    });
  };

  if (error) {
    return (
      <Box maw={1200} w="100%" mx="auto" p={{ base: "md", sm: "xl" }}>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          Failed to load files. Please refresh the page and try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box maw={1200} w="100%" mx="auto">
      <Stack gap="xl" p={{ base: "md", sm: "xl" }}>
        <Paper p={{ base: "md", sm: "xl" }} withBorder>
          <Group justify="space-between" mb="xl">
            <div>
              <Title order={2} size="h3" mb="xs">
                Your Files
              </Title>
              <Text c="dimmed" size="sm">
                Upload, manage, and organize your documents
              </Text>
            </div>
            <Button leftSection={<IconUpload size={16} />} onClick={openUpload}>
              Upload File
            </Button>
          </Group>

          {isLoading ? (
            <Center py="xl">
              <Stack align="center" gap="md">
                <Loader size="lg" />
                <Text c="dimmed">Loading your files...</Text>
              </Stack>
            </Center>
          ) : documents && documents.length > 0 ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
              {documents.map((document) => {
                const IconComponent = getFileIcon(document.name);
                return (
                  <Card
                    key={document.id}
                    p="md"
                    withBorder
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDownload(document)}
                  >
                    <Stack gap="sm">
                      <Group justify="space-between">
                        <ThemeIcon size="lg" variant="light" color="blue">
                          <IconComponent size={24} />
                        </ThemeIcon>
                        <Group gap={4}>
                          <Tooltip label="Download">
                            <ActionIcon
                              variant="light"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(document);
                              }}
                            >
                              <IconDownload size={14} />
                            </ActionIcon>
                          </Tooltip>
                          <Tooltip label="Delete">
                            <ActionIcon
                              variant="light"
                              color="red"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(document);
                              }}
                            >
                              <IconTrash size={14} />
                            </ActionIcon>
                          </Tooltip>
                        </Group>
                      </Group>

                      <div>
                        <Text
                          size="sm"
                          fw={500}
                          lineClamp={2}
                          title={document.name}
                        >
                          {document.name}
                        </Text>
                        <Group justify="space-between" mt={4}>
                          <Text size="xs" c="dimmed">
                            {formatFileSize(document.size)}
                          </Text>
                          <Text size="xs" c="dimmed">
                            {new Date(document.created_at).toLocaleDateString()}
                          </Text>
                        </Group>
                      </div>
                    </Stack>
                  </Card>
                );
              })}
            </SimpleGrid>
          ) : (
            <Center py="xl">
              <Stack align="center" gap="md" maw={400}>
                <ThemeIcon size={80} variant="light" color="gray">
                  <IconFile size={40} />
                </ThemeIcon>
                <div style={{ textAlign: "center" }}>
                  <Text size="lg" fw={500} mb="xs">
                    No files uploaded yet
                  </Text>
                  <Text c="dimmed" size="sm" mb="md">
                    Upload your first file to get started with your document
                    collection
                  </Text>
                  <Button
                    leftSection={<IconUpload size={16} />}
                    onClick={openUpload}
                  >
                    Upload File
                  </Button>
                </div>
              </Stack>
            </Center>
          )}
        </Paper>
      </Stack>

      <Modal
        opened={uploadOpened}
        onClose={closeUpload}
        title="Upload File"
        centered
      >
        <Stack gap="md">
          {!isUploading ? (
            <FileInput
              label="Select file"
              placeholder="Choose a file to upload"
              accept="*/*"
              onChange={(file) => {
                if (file) {
                  uploadMutation.mutate(file);

                }
              }}
            />
          ) : (
            <Stack gap="md">
              <Text size="sm">Uploading file...</Text>
              <Progress value={uploadProgress} animated />
              <Text size="xs" c="dimmed" ta="center">
                {Math.round(uploadProgress)}% complete
              </Text>
            </Stack>
          )}
        </Stack>
      </Modal>
    </Box>
  );
}
