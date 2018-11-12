import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ChatInput} from '../Chat';
import {ChatHistory} from '../Chat';
import { userActions,chatActions } from '../_actions';

  
class Chat extends React.Component{
    constructor(props){
        debugger;
        super(props);
    }
    componentDidMount() {
        debugger;
        console.log("Constructor");
        this.PubNub = PUBNUB.init({
            publish_key: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
            subscribe_key: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
        });
        debugger;
        this.PubNub.subscribe({
            channel: this.props.channel,
            message: (message,env,channel)=>{
                debugger;
                this.props.dispatch(chatActions.addMessage(message));
            }   
        })
        this.fetchHistory(this.props.channel);
        this.fetchHistory = this.fetchHistory.bind(this);
        this.sendMessage = this.sendMessage.bind(this);        
    }
    fetchHistory(){
        debugger;
        console.log("fetchhistory");
        this.PubNub.history({
          channel: this.props.channel,
          count: 15,
          start: this.props.timestamp,
          callback: (data) => {
              debugger;
            // data is Array(3), where index 0 is an array of messages
            // and index 1 and 2 are start and end dates of the messages
            console.log("History Data.........",data);
            this.props.dispatch(chatActions.addHistory(data[0], data[1]));
            console.log("messages....",this.props.messages);
          },
        });
    }
    sendMessage(message) 
    {   debugger;
        console.log('this messge.......','channel');
        this.PubNub.publish({
          channel: this.props.channel,
          message: message,
        });
    }
   
    render(){
        const {sendMessage,fetchHistory} = this;
        const {user,users,messages,timestamp}= this.props; 
        return (
        <div>
            <ChatHistory user={user} users={users} messages={messages} timestamp={timestamp} fetchHistory={fetchHistory}/>
            <ChatInput user={user} users={users} messages={messages} timestamp={timestamp} sendMessage={sendMessage}/>
        </div>)
    }
}
function mapStateToProps(state) {
    const { users, authentication,chat } = state;
    const { user } = authentication;
    const { messages, timestamp,channel,showChat } = chat;
    return {
        user,
        users,
        messages,
        timestamp,
        channel,
        showChat
    };
}

const connectedchatPage = connect(mapStateToProps)(Chat);
export { connectedchatPage as Chat };
