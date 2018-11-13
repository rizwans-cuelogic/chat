import  {chatConstants} from '../_constants';
import { chatService } from '../_services';
import { alertActions } from './';

export const chatActions = {
    addHistory,
    addMessage,
    updateChannel, 
    clearMessages,
    clearTimestamp,
    insertChannel,
    getChannels
}

function addHistory(messages, timestamp) {
    return {
      type: chatConstants.ADD_HISTORY,
      payload: {
        messages,
        timestamp,
      },
    };
  }

function addMessage(message){
    return {
      type : chatConstants.ADD_MESSAGE,
      payload : message
    
    }
} 
function updateChannel(channel){
  return {
    type: chatConstants.UPDATE_CHANNEL,
    payload: channel
  }
}
function clearMessages(){
    return {
      type: chatConstants.CLEAR_MESSAGES
    }

}
function clearTimestamp(){
  return {
    type: chatConstants.CLEAR_TIMESTAMP
  }

}
function insertChannel(channel,sender,chatWith){
    return dispatch => {
        chatService.insertChannel(channel,sender,chatWith)
            .then(
                channel => { 
                    dispatch(success(channel));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function success(chat) { return { type: chatConstants.CHANNEL_SUCCESS, chat } }
    function failure(error) { return { type: chatConstants.CHANNEL_FAILURE, error } }
}
function getChannels(){
    return dispatch => {
        chatService.getChannels()
            .then(
                channels => {
                    debugger; 
                    dispatch(success(channels));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    function success(channels) { return { type: chatConstants.CHANNEL_ALL_SUCCESS, channels } }
    function failure(error) { return { type: chatConstants.CHANNEL_ALL_FAILURE, error } }
}

