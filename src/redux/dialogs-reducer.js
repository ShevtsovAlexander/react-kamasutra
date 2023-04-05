const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_NEW_MESSAGE = 'SEND_NEW_MESSAGE';

const InitialReducer = {
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
  ],
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
  ],
  newMessageBody: '',
};

const dialogsReducer = (state = InitialReducer, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_BODY:
      return {
        ...state,
        newMessageBody: action.newMessage,
      };
    case SEND_NEW_MESSAGE:
      let body = state.newMessageBody;
      return {
        ...state,
        newMessageBody: '',
        messages: [...state.messages, { id: 122, message: body }],
      };
    default:
      return state;
  }
};

export const updateNewMessageBodyCreator = (value) => ({ type: UPDATE_NEW_MESSAGE_BODY, newMessage: value });

export const sendMessageCreator = () => ({ type: SEND_NEW_MESSAGE });

export default dialogsReducer;
