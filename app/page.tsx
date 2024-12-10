"use client";

import Hero from "@/components/Hero";
import Intro, { IntroProps } from "@/components/Intro";
import { MESSAGE_TYPE, SCREENS, WS_PORT } from "@/shared/constants";
import { useEffect, useRef, useState } from "react";

type ChangeScreenMessageType = {
  currentScreen: 'intro',
  currentParams: IntroProps
}

export default function Page() {
  const [currentScreenId, setCurrentScreenId] = useState(SCREENS[0].id);
  const [currentParams, setCurrentParams] = useState<IntroProps>({ neiryParam1: '1', neiryParam2: '1' })

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

  return <>
    {currentScreenId === 'idle' && <Hero />}
    {currentScreenId === 'intro' && <Intro {...currentParams} />}
  </>;
}
