import { FormAction } from 'redux-form';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { chatAPI, chatMessageType } from '../API/chat-api';
import { Dispatch } from 'redux';

const initialState = {
  messages: [] as chatMessageType[],
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEVIED':
      return {
        ...state,
        messages: [...state.messages, ...action.data.messages],
      };

    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: chatMessageType[]) =>
    ({
      type: 'MESSAGES_RECEVIED',
      data: { messages },
    } as const),
};

let _newMessageHandler: ((messages: chatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.open();
  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.close();
};
export const sendMessage =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };

export default chatReducer;

type InitialStateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionTypes | FormAction>;
