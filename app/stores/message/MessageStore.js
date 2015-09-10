import alt from 'altInstance';
import MessageActions from 'actions/message/MessageActions';

class MessageStore {
  /**
   * store to handle messaging states which is useful in
   * displaying dynamic messages and input boxes
   */
  constructor() {
    // message string
    this.message = '';
    // show or hide all messages
    this.showmessages = false;
    // message type
    this.messageType = 'info';
    // message title
    this.title = 'JCatalog Says';
    // close Button
    this.closeButton = false;
    // binding listeners
    this.bindListeners({
      handleShowMessage: MessageActions.SHOWMESSAGE,
      handleHideMessage: MessageActions.HIDEALL,
      handleClearState: MessageActions.CLEARSTATE
    });
  }

  handleShowMessage(messagedata) {
    this.handleHideMessage();
    this.messageType = messagedata.type;
    if (this.messageType === 'error') {
      this.closeButton = true;
    }
    this.showmessages = true;
    this.message = this._formatErrorMessage(messagedata.message);
  }

  _formatErrorMessage(error) {
    if (typeof error.error !== 'undefined' && error.error.errors.length > 0 && typeof error.error.errors[0].message !== 'undefined') {
      return error.error.errors[0].message;
    } else if (typeof error.error !== 'undefined' && typeof error.error.message !== 'undefined') {
      return error.error.message;
    } else if (typeof error.message !== 'undefined') {
      return error.message;
    } else if (error.length > 0) {
      return error;
    }
    return 'Oops! somthing went wrong please check at your entries';
  }

  handleClearState() {
    // message string
    this.message = '';
    // show or hide all messages
    this.showmessages = false;
    // message type
    this.messageType = 'info';
    // message title
    this.title = 'JCatalog Says';
    // close Button
    this.closeButton = false;
  }

  handleHideMessage() {
    this.showmessages = false;
  }

}

// exports the message store
export default alt.createStore(MessageStore, 'MessageStore');
