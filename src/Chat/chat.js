import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ChatInput} from '../Chat';
import {ChatHistory,ChatList} from '../Chat';
import { userActions,chatActions } from '../_actions';

  
class Chat extends React.Component{
    constructor(props){
        debugger;
        super(props);
    }
    componentDidMount() {

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
        this.props.dispatch(chatActions.getChannels());
        this.props.dispatch(chatActions.updateChannel(this.props.channel));
        
        localStorage.setItem("channels_b", JSON.stringify(this.props.channels_b));
        localStorage.channel = this.props.channel;


        this.fetchHistory = this.fetchHistory.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.change_channel = this.change_channel.bind(this);        
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
    change_channel(channel){
        debugger;
        this.props.dispatch(chatActions.clearMessages());
        this.props.dispatch(chatActions.clearTimestamp());
        this.props.dispatch(chatActions.updateChannel(channel.title));
        localStorage.setItem("channels_b", JSON.stringify(this.props.channels_b));
        localStorage.channel = channel.title;
    }
   
    render(){
        debugger;
        const {sendMessage,fetchHistory,change_channel} = this;
        const {user,users,messages,timestamp,channels_b}= this.props; 
        return (
        <div>
            <div className="col-sm-12">
                <ChatHistory user={user} users={users} messages={messages} timestamp={timestamp} fetchHistory={fetchHistory} channels_b={channels_b} change_channel={change_channel}/>
                <ChatInput user={user} users={users} messages={messages} timestamp={timestamp} sendMessage={sendMessage}/>
            </div>
        </div>
        )
    }
}
function mapStateToProps(state) {
    const { users, authentication,chat } = state;
    const { user } = authentication;
    const { messages, timestamp,channel,showChat,channels_b } = chat;
    return {
        user,
        users,
        messages,
        timestamp,
        channel,
        showChat,
        channels_b
    };
}

const connectedchatPage = connect(mapStateToProps)(Chat);
export { connectedchatPage as Chat };
