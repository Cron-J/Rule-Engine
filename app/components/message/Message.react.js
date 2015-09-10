import React from 'react';
import MessageStore from 'stores/message/MessageStore';
import MessageAction from 'actions/message/MessageActions';
import NotificationSystem from 'react-notification-system';

export default
class Message extends React.Component {
  constructor(props) {
    super(props);
    this.state = MessageStore.getState();
    this._notificationSystem = null;
    this.style = {
      Containers: {
        DefaultStyle: {
          width: '60%'
        },
        tc: {
          left: '20%'
        }
      }
    };
  }

  componentWillMount() {
    // before rendering
  }

  componentDidMount() {
    // after rendering
    MessageStore.listen(this._onChange);
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillUnmount() {
    // before un mount
    MessageStore.unlisten(this._onChange);
  }

  _onChange = () => {
    // on change of the component
    this.setState(MessageStore.getState());
    this._addNotification();
  };

  render() {
    return (
      <NotificationSystem ref="notificationSystem" style={this.style}/>
    );
  }

  _addNotification = () => {
    if (this.state.showmessages) {
      this._notificationSystem.addNotification({
        message: this.state.message,
        title: this.state.title,
        position: 'tc',
        uid: this.state.messageType,
        autoDismiss: 3,
        onRemove: this._close,
        dismissible: true,
        level: this.state.messageType
      });
    }
  }
  _close = () => {
    MessageAction.clearstate();
  }
}
