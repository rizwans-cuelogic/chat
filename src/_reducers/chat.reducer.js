import  {chatConstants} from '../_constants';
import { chatActions } from '../_actions';

const INITIAL_STATE={
    messages : [],
    timestamp : null,
    channel : null,
    showChat : false
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
        default:
            return state;
    }
}