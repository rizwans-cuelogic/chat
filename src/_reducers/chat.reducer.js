import  {chatConstants} from '../_constants';
import { chatActions } from '../_actions';

const INITIAL_STATE={
    messages : [],
    timestamp : null,
    channel : null,
    showChat : false,
    channels_b:[]
}
export function chat (state=INITIAL_STATE,action){
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
                channels_b: action.channel
            };
        case chatConstants.CHANNEL_FAILURE:
            return {};        

        case chatConstants.CHAT_ALL_SUCCESS:
            return {
                channels: action.channels
            };    
        default:
            return state;
    }
}