import React, { Component } from 'react';
import MessageList from './components/MessageList';
import MessageInputBox from './components/MessageInputBox';
import LanguageSelectBox from './components/LanguageSelectBox';
import Header from './components/Header';
import { Emoji } from 'emoji-mart';

import { registerOnMessageCallback, send } from './websocket';
import translateMessage from './translate-text';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    messages: [],
    username: null,
    language: 'en', // Change to 'en' to ignore translation features
    webSiteText: {
      enterName: { text: 'Enter your username here' },
      enterMsg: { text: 'Type your message here' },
      roomMsg: { text: 'Copy room invite to Clipboard' },
    },
  }

  constructor(props) {
    super(props);

    registerOnMessageCallback(this.onMessageReceived.bind(this));
    this.setUserName = this.setUserName.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
  }

  async translateStaticMessages(language) {
    let translations;
    const messages = Object.values(this.state.webSiteText);

    if (language !== 'en') {
      translations = await translateMessage(messages, 'en', language);
      const keys = Object.keys(this.state.webSiteText);

      translations = translations.reduce((allText, text, idx) => {
        allText[keys[idx]] = text.translations[0];
        return allText;
      }, {});

      this.setState({ webSiteText: translations });
    }
  }

  async onMessageReceived(msg) {
    msg = JSON.parse(msg);

    if (msg.language !== this.state.language) {
      const translation = await translateMessage(msg.text, msg.language, this.state.language);
      msg.text = translation[0].translations[0].text
    }

    this.setState({
      messages: this.state.messages.concat(msg)
    });
  }

  async setLanguage(language) {
    this.setState({
      language: language
    });

   await this.translateStaticMessages(language);
  }

  setUserName(name) {
    this.setState({
      username: name,
    });
  }

  sendMessage(text) {
    const message = {
      username: this.state.username,
      language: this.state.language,
      timestamp: Date.now(),
      text: text,
    }
    send(JSON.stringify(message));
  }

  render() {
    const height = (window.innerHeight * 0.85) + 'px';
    if (this.state.language === null) {
      return (
        <div className="container">
          <h1 class="justify-content-center">Welcome To {' '}
            <Emoji        
              className='fixed-bottom'
              set={'apple'}
              emoji="earth_americas"
              size={32}
              fallback={(emoji, props) => {
                return emoji ? `:${emoji.short_names[0]}:` : props.emoji
              }}
            />Chat
          </h1>
          <LanguageSelectBox
            handleLanguageSelect={this.setLanguage}
          />
        </div>
      )
    } else if (this.state.username === null) {
      return (
        <div style={{ height: height }} className="container">
          <Header 
            room={this.props.token}
            placeholder={this.state.webSiteText.roomMsg.text}
          />
          <MessageList
            messages={this.state.messages}
            username={this.state.username}
          />
          <MessageInputBox 
            onSend={this.setUserName}
            placeholder={this.state.webSiteText.enterName.text}
          />
        </div>
      )
    } else {
      return(
        <div style={{ height: height }} className="container">
          <Header 
            room={this.props.token}
            placeholder={this.state.webSiteText.roomMsg.text}
          />
          <MessageList
            messages={this.state.messages}
            username={this.state.username}
          />
          <MessageInputBox 
            onSend={this.sendMessage}
            placeholder={this.state.webSiteText.enterMsg.text}
          />
        </div>
      )
    }
  }
}

export default App;
