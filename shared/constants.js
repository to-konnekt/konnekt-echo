export const SCREENS = [
  { id: "idle", name: "Idle" },
  { id: "intro", name: "Intro" },
  { id: "action", name: "Action" },
  { id: "answer", name: "Answer" },
  { id: "end", name: "End" }
];

export const SCREENS_TRANSITIONS = {
  'idle': 'intro',
  'intro': 'action',
  'action': 'answer',
  'answer': 'end',
  'end': 'idle'
};

export const WS_PORT = 3001;
export const UDP_PORT = 5000;
export const UDP_HOST = '127.0.0.1';

export const MESSAGE_TYPE = {
  CHANGE_SCREEN: "CHANGE_SCREEN",
};

export const TEST_SERVER_OUT_PORT = 4444;
export const TEST_SERVER_OUT_HOST = '127.0.0.1';
export const TEST_SERVER_IN_PORT = 5555;
export const TEST_SERVER_IN_HOST = '127.0.0.1';