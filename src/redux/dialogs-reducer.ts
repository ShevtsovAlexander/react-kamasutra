import { InferActionsTypes } from './redux-store';

type DialogType = {
  id: number;
  name: string;
};
type MessageType = {
  id: number;
  message: string;
};
const initialState = {
  dialogs: [
    {
      name: 'Alexander',
      id: 121,
    },
    {
      name: 'Ivan',

      id: 342,
    },
    {
      name: 'Amir',
      id: 4433,
    },
    {
      name: 'Adam',
      id: 998,
    },
    {
      name: 'Anton',
      id: 443,
    },
  ] as Array<DialogType>,
  messages: [
    {
      message: 'Hi',
      id: 121,
    },
    {
      message: 'How is your React App',
      id: 342,
    },
    {
      message: 'Yeah Boy',
      id: 4433,
    },
    {
      message: 'Yeah Boy',
      id: 998,
    },
    {
      message: 'Yeah Boy',
      id: 443,
    },
  ] as Array<MessageType>,
};

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
  switch (action.type) {
    case 'SEND_NEW_MESSAGE':
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 122, message: body }],
      };
    default:
      return state;
  }
};

export const actions = {
  sendMessage: (newMessageBody: string) =>
    ({
      type: 'SEND_NEW_MESSAGE',
      newMessageBody,
    } as const),
};

export default dialogsReducer;
export type InitialStateType = typeof initialState;

export type ActionTypes = InferActionsTypes<typeof actions>;
