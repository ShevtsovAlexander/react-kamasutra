const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';

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
type InitialStateType = typeof initialState;
const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_NEW_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        messages: [...state.messages, { id: 122, message: body }],
      };
    default:
      return state;
  }
};

type sendMessageCreatorType = {
  type: typeof SEND_NEW_MESSAGE;
  newMessageBody: string;
};
export const sendMessageCreator = (newMessageBody: string): sendMessageCreatorType => ({
  type: SEND_NEW_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
