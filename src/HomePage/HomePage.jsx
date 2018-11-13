import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { History } from '../_helpers'

import { userActions,chatActions } from '../_actions';


class HomePage extends React.Component {
     
    componentDidMount() {
        debugger;
        this.props.dispatch(userActions.getAll());
        this.props.dispatch(chatActions.getChannels());
        this.PubNub = PUBNUB.init({
            publish_key: 'pub-c-199f8cfb-5dd3-470f-baa7-d6cb52929ca4',
            subscribe_key: 'sub-c-d2a5720a-1d1a-11e6-8b91-02ee2ddab7fe',
            ssl: (location.protocol.toLowerCase() === 'https:'),
          });
          let channel ='channel'+this.props.user._id;
          this.PubNub.subscribe({
            channel: channel,
            message: (message,env,channel)=>{
                debugger;
                if(message.hasOwnProperty('invite')){
                    this.acceptInvitation(message.channel);    
                }
                this.props.dispatch(chatActions.addMessage(message));
            }   
        });
        this.props.dispatch(chatActions.updateChannel(channel));
        this.fetchHistory(channel);
        console.log(this.props);
        //console.log({ invite:"this is pubnub",channel:'channel123'},this.PubNub)
        //this.sendMessage({ invite:"this is pubnub",channel:'channel123'});

    }
    checkInvitations(){
        debugger;
        try{
        this.props.messages.filter(msg=>{
            if(msg.hasOwnProperty('invite')){
                let channel_exists= this.props.channels_b.filter(channel => (vendor.title === msg.channel));        
                this.acceptInvitation(msg.channel);
                throw BreakException; 
            }
        })
        }
        catch(e){
            console.log("get channel ...... checkinvitation")
        }
    }
    acceptInvitation(channel){
        console.log("In accept invitation");
        this.PubNub.subscribe({
            channel:channel,
            message : (message,env,channel)=>{
                this.props.dispatch(chatActions.addMessage(message));
            }
        });
        this.props.dispatch(chatActions.updateChannel(channel));
        this.props.dispatch(chatActions.clearMessages());
        this.props.dispatch(chatActions.clearTimestamp());
        this.fetchHistory(channel);
        this.redirectToMessage();
    }
    sendInvitation(id){
        debugger;
        console.log("In accept invitation");
        let channel = 'channel'+this.props.user._id+id
        let channel_exists= this.props.channels_b.filter(channel => (vendor.title === channel));
        if(channel_exists){
            this.props.dispatch(chatActions.updateChannel(channel));
            this.props.dispatch(chatActions.clearTimestamp());
            //this.fetchHistory(channel);
            this.redirectToMessage();    
        }
        else{
        let message = {
            invite:"This is invitation to chat",
            channel : channel
        }
        this.PubNub.publish({
            channel: 'channel'+id,
            message: message,
        });
            this.props.dispatch(chatActions.updateChannel(channel));
            this.props.dispatch(chatActions.clearTimestamp());
        //this.fetchHistory(channel);
            this.redirectToMessage();
        }
    }
    redirectToMessage(){
        debugger;
        this.props.history.push(
            '/message',
            // state:{
            // sendMessage:this.sendMessaage
            //fetchhistory:this.fetchHistory 
        
        //}
    );
    }
    fetchHistory(channel){
        debugger;
        console.log("fetchhistory");
        this.PubNub.history({
          channel: channel,
          count: 15,
          start: this.props.timestamp,
          callback: (data) => {
            // data is Array(3), where index 0 is an array of messages
            // and index 1 and 2 are start and end dates of the messages
            console.log("History Data.........",data);
            this.props.dispatch(chatActions.addHistory(data[0], data[1]));
            this.checkInvitations();
            console.log("messages....",this.props.messages);
          },
        });
      }  
    handleAddMessage(message){
        debugger; 
        return () => {
            debugger;
            console.log("in callback handel...........")
            props.dispatch(chatActions.addMessage(message));
            console.log("Message  handle",props.messages);
        }
    }
    handleDeleteUser(id) {
        return (e) => this.props.dispatch(userActions.delete(id));
    }
    sendMessage(message) {
        console.log('this messge.......','channel');
        this.PubNub.publish({
          channel: this.props.channel,
          message: message,
        });
    }
    render() {
        debugger;
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstName}!</h1>
                <h3>All Users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((userobj, index) =>
                        (user._id !== userobj._id)?
                            <li key={userobj._id}>
                                <h3>{userobj.firstName + ' ' + userobj.lastName}</h3>
                                <a href="#" onClick={()=>{{this.sendInvitation(userobj._id)}}}>message</a>
                                {
                                    userobj.deleting ? <em> - Deleting...</em>
                                    : userobj.deleteError ? <span className="text-danger"> - ERROR: {userobj.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(userobj._id)}>Delete</a></span>
                                }
                            </li>
                        : ""
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { users, authentication,chat } = state;
    const { user } = authentication;
    const { messages, timestamp,channel,channels_b} = chat;
    return {
        user,
        users,
        messages,
        timestamp,
        channel,
        channels_b
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };