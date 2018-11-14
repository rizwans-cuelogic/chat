import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {ChatInput} from '../Chat';
import {ChatHistory} from '../Chat';
import { userActions,chatActions } from '../_actions';

  
class ChatList extends React.Component{
    constructor(props){
        debugger;
        super(props);
    }
    
    render() {
        debugger;
        const { user, users,channels_b } = this.props;
        return (
            <ul className="collection_channels" ref="messageList">
            { channels_b.map((channel) => {
            return (
                <li className="collection-item avatar" key={ channel.title }>
                <p>
                    <a href="" onClick={channelHandler}><span>{channel.createdBy===user._id?channel.chatWith:channel.createdBy}</span></a>
                </p>
            </li>
          );
        }) }
      </ul>
        );
    }
}

export { ChatList as ChatList};