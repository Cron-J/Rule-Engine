import alt from 'altInstance';

class MessageActions {

  /**
   * to display message
   * @param message - string
   * @param type - string
   */
  showmessage(message, type) {
    const messagedata = {
      message: message,
      type: type
    };
    this.dispatch(messagedata);
  }

  /**
   * to display confirmation dialogue with message
   * @param message - string
   * @param onSuccess - function
   * @param onFailure - function
   *
   */
  //  confirmation(message, onSuccess, onFailure) {
  //    this.dispatch(message, onSuccess, onFailure);
  //  }

  /**
   * to hide all the messages
   */
  hideall() {
    this.dispatch();
  }

  clearstate() {
    this.dispatch();
  }
}

// exports the action
export default alt.createActions(MessageActions);
