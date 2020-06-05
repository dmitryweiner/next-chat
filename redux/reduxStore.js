import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
import {messages} from "../store";

const ADD_MESSAGE_ACTION = "addMessage";
const UPDATE_MESSAGES_ACTION = "updateMessages";

export function sendMessage(message) {
  return async (dispatch) => {
    const res = await fetch("/api/messages/send", {method: "post", body: JSON.stringify(message)});
    dispatch(addMessage(message));
  }
}

export function addMessage(message) {
  return {
    type: ADD_MESSAGE_ACTION,
    payload: message
  };
}

export function fetchMessages() {
  return async (dispatch) => {
    const res = await fetch("/api/messages");
    const messages = await res.json();
    dispatch(updateMessages(messages));
  }
}

export function updateMessages(messages) {
  return {
    type: UPDATE_MESSAGES_ACTION,
    payload: messages
  };
}

const initialState = {
  messages // TODO: here we get stored in DB messages
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE_ACTION:
      return {
        messages: [...state.messages, action.payload]
      };
    case UPDATE_MESSAGES_ACTION:
      return {
        messages: action.payload
      };
    default:
      return state;
  }
};

export const initializeStore = (preloadedState = initialState) => {
  return createStore(
    reducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
};
