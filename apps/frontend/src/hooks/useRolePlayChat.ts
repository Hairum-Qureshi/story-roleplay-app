import axios, { type AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Conversation, Message, PinnedMessage } from "../interfaces";
import { useQueryClient } from "@tanstack/react-query";
import useSocketStore from "../store/useSocketStore";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "./useCurrentUser";

const SYSTEM_USER_ID = "000000000000000000000001";
const PLAYED_PING_MESSAGE_IDS = new Set<string>();
const MAX_PLAYED_PING_CACHE_SIZE = 500;

interface UseRolePlayChatHook {
  createConversation: (adID: string) => void;
  rolePlayChats: Conversation[];
  rolePlayNotes: { notes: string } | undefined;
  sendMessage: (adID: string, message: string) => void;
  rolePlayChatMessages: Message[];
  deleteMessage: (chatID: string, messageID: string) => void;
  editMessage: (
    chatID: string,
    messageID: string,
    editedMessage: string,
  ) => void;
  endRolePlayConversation: (chatID: string) => void;
  removeChatFromList: (chatID: string) => void;
  currUserConversations: { _id: string; conversations: Conversation[] };
  pinMessageMutation: ({
    chatID,
    messageID,
  }: {
    chatID: string;
    messageID: string;
  }) => void;
  pinnedRoleplayMessages: PinnedMessage[];
}

export default function useRolePlayChat(chatID?: string): UseRolePlayChatHook {
  const queryClient = useQueryClient();
  const { message } = useSocketStore();
  const navigate = useNavigate();
  const { data: currUserData } = useCurrentUser();
  const lastPlayedMessageIDRef = useRef<string | null>(null);

  const { mutate } = useMutation<
    AxiosResponse<{ conversation: Conversation }>,
    unknown,
    { adID: string }
  >({
    mutationFn: async ({ adID }: { adID: string }) => {
      try {
        const response = await axios.post<{ conversation: Conversation }>(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/create/${adID}`,
          {},
          {
            withCredentials: true,
          },
        );
        return response;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      navigate(`/inbox/${data.data.conversation._id}`);
    },
  });

  const { mutate: messageMutation } = useMutation({
    mutationFn: async ({
      chatID,
      message,
      senderUID,
    }: {
      chatID: string;
      message: string;
      senderUID: string;
    }) => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/send-message`,
          { message, senderUID },
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatID],
      });
    },
  });

  const { data: rolePlayChatMessages } = useQuery({
    queryKey: ["chat-messages", chatID],
    queryFn: async () => {
      try {
        if (!chatID) return [];

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/all-messages`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { data: pinnedRoleplayMessages } = useQuery({
    queryKey: ["pinned-messages", chatID],
    queryFn: async () => {
      try {
        if (!chatID) return [];

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/pins`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { data: rolePlayNotes } = useQuery({
    queryKey: ["role-play-notes", chatID],
    enabled: !!chatID,
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/notes`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { data: rolePlayChats } = useQuery({
    queryKey: ["roleplay-chats-data"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/all-data`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { data: currUserConversations } = useQuery({
    queryKey: ["your-chats"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/all/user-chats`,
          {
            withCredentials: true,
          },
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  });

  function sendMessage(chatID: string, message: string) {
    if (!message.trim()) return alert("Message cannot be empty");

    if (!currUserData?._id) {
      return alert("Unable to identify sender. Please refresh and try again.");
    }

    if (message.length > 2000) {
      return alert("Message cannot exceed 2000 characters");
    }

    messageMutation({ chatID, message, senderUID: currUserData._id });
  }

  function createConversation(adID: string) {
    mutate({ adID });
  }

  useEffect(() => {
    if (!message || message.message.conversation !== chatID) return;

    queryClient.setQueryData<Message[]>(
      ["chat-messages", chatID],
      (oldMessages = []) => {
        if (oldMessages.some((m) => m._id === message.message._id)) {
          return oldMessages;
        }
        return [...oldMessages, message.message];
      },
    );

    if (!currUserData?._id) return;

    if (
      lastPlayedMessageIDRef.current === message.message._id ||
      PLAYED_PING_MESSAGE_IDS.has(message.message._id)
    ) {
      return;
    }

    const senderUID = message.senderUID || message.message.sender?._id || "";
    const isOwnMessage = senderUID === currUserData._id;
    const isSystemMessage = senderUID === SYSTEM_USER_ID;

    if (!isOwnMessage && !isSystemMessage) {
      // const messagePingAudio = new Audio(messagePingSound);
      // messagePingAudio.volume = MESSAGE_PING_VOLUME;
      // messagePingAudio.play().catch((error) => {
      //   console.error("Error playing message ping sound:", error);
      // });

      lastPlayedMessageIDRef.current = message.message._id;
      PLAYED_PING_MESSAGE_IDS.add(message.message._id);

      if (PLAYED_PING_MESSAGE_IDS.size > MAX_PLAYED_PING_CACHE_SIZE) {
        PLAYED_PING_MESSAGE_IDS.clear();
      }
    }
  }, [message, chatID, queryClient, currUserData?._id]);

  const { mutate: endChatMutation } = useMutation({
    mutationFn: async ({ chatID }: { chatID: string }) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/end-conversation`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  const { mutate: deleteMessageMutation } = useMutation({
    mutationFn: async ({
      chatID,
      messageID,
    }: {
      chatID: string;
      messageID: string;
    }) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/${messageID}/delete-message`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatID],
      });
      queryClient.invalidateQueries({ queryKey: ["pinned-messages", chatID] });
    },
  });

  function deleteMessage(chatID: string, messageID: string) {
    const confirmation = confirm(
      "Are you sure you want to delete this message?",
    );
    if (!confirmation) return;

    deleteMessageMutation({ chatID, messageID });
  }

  const { mutate: editMessageMutation } = useMutation({
    mutationFn: async ({
      chatID,
      messageID,
      editedMessage,
    }: {
      chatID: string;
      messageID: string;
      editedMessage: string;
    }) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/${messageID}/edit-message`,
          {
            editedMessage,
          },
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatID],
      });
      queryClient.invalidateQueries({ queryKey: ["your-chats"] });
    },
  });

  function editMessage(
    chatID: string,
    messageID: string,
    editedMessage: string,
  ) {
    if (!editedMessage.trim()) return alert("Edited message cannot be empty");

    if (editedMessage.length > 2000) {
      return alert("Edited message cannot exceed 2000 characters");
    }

    editMessageMutation({ chatID, messageID, editedMessage });
  }

  const { mutate: pinMessageMutation } = useMutation({
    mutationFn: async ({
      chatID,
      messageID,
    }: {
      chatID: string;
      messageID: string;
    }) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/${messageID}/pin`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chat-messages", chatID],
      });
      queryClient.invalidateQueries({ queryKey: ["pinned-messages", chatID] });
      queryClient.invalidateQueries({ queryKey: ["your-chats"] });
    },
  });

  function endRolePlayConversation(chatID: string) {
    const confirmation = confirm(
      "WARNING! Are you sure you want to end this role-play chat? This action cannot be undone and will end the chat for both you and your partner!",
    );

    if (!confirmation) return;
    endChatMutation({ chatID });
  }

  const { mutate: removeChatFromListMutation } = useMutation({
    mutationFn: async ({ chatID }: { chatID: string }) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/chat/${chatID}/remove-from-list`,
          {},
          {
            withCredentials: true,
          },
        );
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["your-chats"] });
      navigate("/inbox");
    },
  });

  function removeChatFromList(chatID: string) {
    const confirmation = confirm(
      "Are you sure you want to remove this chat from your inbox? You can still access it if your partner sends a new message",
    );
    // TODO - see what happens when you hit the button on the roleplay ad you removed the chat for
    if (!confirmation) return;

    removeChatFromListMutation({ chatID });
  }

  return {
    createConversation,
    rolePlayChats,
    rolePlayNotes,
    sendMessage,
    rolePlayChatMessages,
    deleteMessage,
    editMessage,
    endRolePlayConversation,
    removeChatFromList,
    currUserConversations,
    pinMessageMutation,
    pinnedRoleplayMessages,
  };
}
