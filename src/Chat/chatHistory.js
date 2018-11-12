import * as React from 'react';
import { connect } from 'react-redux';
import * as ReactDOM from 'react-dom';

class ChatHistory extends React.Component {

    componentWillUpdate(nextProps) {
    debugger;  
    this.historyChanged = nextProps.messages.length !== this.props.messages.length;
    if (this.historyChanged) {
      const { messageList } = this.refs;
      const scrollPos = messageList.scrollTop;
      const scrollBottom = (messageList.scrollHeight - messageList.clientHeight);
      ChatHistory.scrollAtBottom = (scrollBottom === 0) || (scrollPos === scrollBottom);
      if (!ChatHistory.scrollAtBottom) {
        const numMessages = messageList.childNodes.length;
        this.topMessage = numMessages === 0 ? null : messageList.childNodes[0];
      }
    }
  }

  componentDidUpdate() {
    debugger;
    if (this.historyChanged) {
      if (ChatHistory.scrollAtBottom) {
        this.scrollToBottom();
      }
      if (this.topMessage) {
        ReactDOM.findDOMNode(this.topMessage).scrollIntoView();
      }
    }
  }

  onScroll(){
    debugger;
    const { refs, props } = this;
    const scrollTop = refs.messageList.scrollTop;
    if (scrollTop === 0) {
      this.props.fetchHistory();
    }
  };

  render() {
    debugger;
    const { messages, onScroll } = this.props;
    return (
      <ul className="collection" ref="messageList" onScroll={ onScroll }>
        { messages.map((messageObj) => {
          const imgURL = '//robohash.org/' + messageObj.Who + '?set=set2&bgset=bg2&size=70x70';
          const messageDate = new Date(messageObj.When);
          const messageDateTime = messageDate.toLocaleDateString() +
            ' at ' + messageDate.toLocaleTimeString();
          return (
            <li className="collection-item avatar" key={ messageObj.When }>
              <img src={ imgURL } alt={ messageObj.Who } className="circle" />
              <span className="title">{ messageObj.Who }</span>
              <p>
                <i className="prefix mdi-action-alarm" />
                <span className="message-date">{ messageDateTime }</span>
                <br />
                <span>{ messageObj.What }</span>
              </p>
            </li>
          );
        }) }
      </ul>
    );
  }
  
  scrollToBottom(){
    
    const { messageList } = this.refs;
    const scrollHeight = messageList.scrollHeight;
    const height = messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    ReactDOM.findDOMNode(messageList).scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }
}
export { ChatHistory as ChatHistory };
