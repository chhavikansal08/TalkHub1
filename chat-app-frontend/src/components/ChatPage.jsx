import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Load messages on page init
  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessagess(roomId);
        setMessages(messages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, [roomId, connected]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    let client = null;

    const connectWebSocket = () => {
      // Provide a factory function for SockJS
      const socketFactory = () => new SockJS(`${baseURL}/chat`);
      client = Stomp.over(socketFactory);

      // Enable reconnect with options
      client.reconnectDelay = 5000; // Reconnect after 5 seconds
      client.heartbeatIncoming = 4000; // Heartbeat every 4 seconds
      client.heartbeatOutgoing = 4000;

      client.connect(
        {},
        () => {
          setStompClient(client);
          toast.success("Connected to chat");

          // Subscribe to the room's topic
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            const newMessage = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMessage]);
          });
        },
        (error) => {
          console.error("Connection error:", error);
          toast.error("Failed to connect. Retrying...");
        }
      );
    };

    if (connected) {
      connectWebSocket();
    }

    // Cleanup on component unmount or disconnect
    return () => {
      if (client && client.connected) {
        client.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, [roomId, connected]);

  // Send message
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  // Logout and disconnect
  function handleLogout() {
    if (stompClient && stompClient.connected) {
      stompClient.disconnect(() => {
        console.log("Disconnected from WebSocket");
      });
    }
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }

  return (
    <div className="">
      {/* Header */}
      <header className="dark:border-gray-700 fixed w-full dark:bg-gray-900 py-5 shadow flex justify-around items-center">
        <div>
          <h1 className="text-xl font-semibold">
            Room: <span>{roomId}</span>
          </h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold">
            User: <span>{currentUser}</span>
          </h1>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="dark:bg-red-500 dark:hover:bg-red-700 px-3 py-2 rounded-full"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* Chat messages */}
      <main
        ref={chatBoxRef}
        className="py-20 px-10 w-2/3 dark:bg-slate-600 mx-auto h-screen overflow-auto"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 ${
                message.sender === currentUser ? "bg-green-800" : "bg-gray-800"
              } p-2 max-w-xs rounded`}
            >
              <div className="flex flex-row gap-2">
                <img
                  className="h-10 w-10"
                  src={"https://avatar.iran.liara.run/public/43"}
                  alt=""
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold">{message.sender}</p>
                  <p>{message.content}</p>
                  <p className="text-xs text-gray-400">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Input box */}
      <div className="fixed bottom-4 w-full h-16">
        <div className="h-full pr-10 gap-4 flex items-center justify-between rounded-full w-1/2 mx-auto dark:bg-gray-900">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className="w-full dark:border-gray-600 dark:bg-gray-800 px-5 py-2 rounded-full h-full focus:outline-none"
          />
          <div className="flex gap-1">
            <button className="dark:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="dark:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;