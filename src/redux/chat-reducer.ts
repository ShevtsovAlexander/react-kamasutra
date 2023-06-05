import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { chatAPI, ChatMessageType, StatusType } from '../API/chat-api';
import { Dispatch } from 'redux';

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEVIED':
      return {
        ...state,
        messages: [...state.messages, ...action.data.messages],
      };
    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.data.status,
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: 'MESSAGES_RECEVIED',
      data: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'STATUS_CHANGED',
      data: { status },
    } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.open();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));

  chatAPI.close();
};
export const sendMessage =
  (message: string): ThunkType =>
  async () => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;
