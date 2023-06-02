let subscribers = [] as SubscribersType[];

let ws: WebSocket;
const closeHanlder = () => {
  setTimeout(createChannel, 3000);
};
const messageHandler = (e: MessageEvent) => {
  const newMessages = JSON.parse(e.data);
  subscribers.forEach((e) => e(newMessages));
};
function createChannel() {
  ws?.removeEventListener('close', closeHanlder);
  ws?.close();

  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
  ws.addEventListener('close', closeHanlder);
  ws.addEventListener('message', messageHandler);
}
createChannel();

export const chatAPI = {
  open() {
    createChannel();
  },
  close() {
    subscribers = [];
    ws?.removeEventListener('close', closeHanlder);
    ws?.close();
  },
  subscribe(callback: SubscribersType) {
    subscribers.push(callback);
  },
  unsubscribe(callback: SubscribersType) {
    subscribers = subscribers.filter((s) => s !== callback);
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

type SubscribersType = (message: chatMessageType[]) => void;

export type chatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};
