import  {chatConstants} from '../_constants';

export const chatActions = {
    addHistory,
    addMessage,
    updateChannel, 
    clearMessages,
    clearTimestamp
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
