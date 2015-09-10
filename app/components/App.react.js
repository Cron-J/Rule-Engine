import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from 'components/Navigation.react';
import Messages from 'components/message/Message.react';

import 'scss/main';

export default
class App extends React.Component {
  render() {
    return (
      <div>
        <Messages />
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
}
