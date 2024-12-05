"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SCREENS, WS_PORT, MESSAGE_TYPE } from "../shared/constants";

export default function Home() {
  const [currentScreenId, setCurrentScreenId] = useState(SCREENS[0].id);
  const router = useRouter();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(`ws://localhost:${WS_PORT}`);

    wsRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === MESSAGE_TYPE.CHANGE_SCREEN) {
        setCurrentScreenId(data.payload);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [router]);

  const changeScreen = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const currentIndex = SCREENS.findIndex(
        (screen) => screen.id === currentScreenId
      );
      const nextIndex = (currentIndex + 1) % SCREENS.length;
      const nextScreenId = SCREENS[nextIndex].id;
      wsRef.current.send(
        JSON.stringify({
          type: MESSAGE_TYPE.CHANGE_SCREEN,
          payload: nextScreenId,
        })
      );
    } else {
      console.error("WebSocket is not connected");
    }
  };

  const currentScreen = SCREENS.find((screen) => screen.id === currentScreenId);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">{currentScreen?.name}</h1>
      <button
        onClick={changeScreen}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Next Screen
      </button>
    </main>
  );
}
