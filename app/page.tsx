"use client";

import { Answer } from "@/components/Answer";
import { Action } from "@/components/Action";
import { Final } from "@/components/Final";
import { Hero } from "@/components/Hero";
import Intro, { IntroProps, NeiryType } from "@/components/Intro";
import { MESSAGE_TYPE, SCREENS, WS_PORT } from "@/shared/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type ChangeScreenMessageType = {
  currentScreen: 'intro',
  currentParams: IntroProps
}

const queryClient = new QueryClient();

export default function Page() {
  const [currentScreenId, setCurrentScreenId] = useState(SCREENS[0].id);
  const [currentParams, setCurrentParams] = useState<{neiryParam1: NeiryType, neiryParam2: NeiryType}>({ neiryParam1: '1', neiryParam2: '1' })

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(`ws://localhost:${WS_PORT}`);
    wsRef.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === MESSAGE_TYPE.CHANGE_SCREEN) {
        const { payload } = data;
        const { currentScreen, currentParams: currentParamsFromServer } = payload as ChangeScreenMessageType;

        setCurrentScreenId(currentScreen);
        setCurrentParams(currentParamsFromServer);
      }
    };

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const changeScreen = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: MESSAGE_TYPE.CHANGE_SCREEN,
          payload: { currentScreenId },
        })
      );
    }
  }

  return <QueryClientProvider client={queryClient}>
    {currentScreenId === 'idle' && <Hero />}
    {currentScreenId === 'intro' && <Intro {...currentParams} changeScreen={changeScreen} />}
    {currentScreenId === 'action' && <Action changeScreen={changeScreen} />}
    {currentScreenId === 'answer' && <Answer changeScreen={changeScreen} />}
    {currentScreenId === 'end' && <Final changeScreen={changeScreen} />}
  </QueryClientProvider>;
}
