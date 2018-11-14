import  {chatConstants,alertConstants} from '../_constants';
import { chatActions } from '../_actions';

const INITIAL_STATE={
    messages : [],
    timestamp : null,
    channel : null,
    showChat : false,
    insertChannel : null
}
export function chat (state=INITIAL_STATE,action){
    debugger;
    console.log("In chat reducer",action.type);
    switch(action.type){
        case chatConstants.ADD_HISTORY:
            return {
                ...state,
                messages:[...action.payload.messages,...state.messages],    
                timestamp:action.payload.timestamp

            }
        case chatConstants.ADD_MESSAGE :
            return {
                ...state,
                messages : state.messages.concat(action.payload)
            }
        case chatConstants.UPDATE_CHANNEL:
            return{
                ...state,
                channel : action.payload
            }
        case chatConstants.CLEAR_MESSAGES:
            return{
                ...state,
                messages : []
            }
        case chatConstants.CLEAR_TIMESTAMP:
        return{
            ...state,
            timestamp:null
        }
        case chatConstants.CHANNEL_SUCCESS:
            return {
                ...state,
               insertChannel:chat
            };
        case chatConstants.CHANNEL_FAILURE:
            return {
                ...state
            };        

        case chatConstants.CHANNEL_ALL_SUCCESS:
            debugger;
            return {
                ...state,
                channels_b: action.channels
            };
        case alertConstants.CLEAR:
            return{
                ...state
            }    
        default:
            return {
                ...state
            };
    }
}