import React, { useState, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import SendIcon from '../send-icon.svg';
import { Picker, Emoji } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

function MessageInputBox({ placeholder, onSend, fixBottom }) {
  const [input, setInput] = useState('');
  const [emojiSelectorToggle, setEmojiSelectorToggle] = useState(false);
  const messageBox = useRef(null);

  const isVisible = emojiSelectorToggle ? 'block' : 'none';

  let classNames = "d-flex messageBox";
  if (fixBottom) classNames += (' ' + fixBottom);

  const sendMessage = (e) => {
    e.preventDefault();
    if (input !== '') onSend(input);
    setInput('');
  };

  const enterKeySendsMessage = (e) => {
    if (e.keyCode === 13) {
      sendMessage(e);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const addEmoji = (e) => {
    let emoji = e.native;
    setInput(input + emoji);
    messageBox.current.focus();
  };

  const handleEmojiToggle = (state=false) => {
    if (state === false) {
      setEmojiSelectorToggle(false);
    } else {
      setEmojiSelectorToggle(!emojiSelectorToggle);
    }
  };

  return(
    <Form className={classNames}>
      <span 
        style={{position: 'absolute', bottom: '15%', left: '10%', 
          display: isVisible }}
      >
        <Picker 
          onSelect={addEmoji}
          emoji="point_up"
          emojiSize={16}
          title=""
        />
      </span>
      <Emoji    
        className='fixed-bottom emoji-toggle'
        set={'apple'}
        emoji="smiley"
        size={24}
        fallback={(emoji, props) => {
          return emoji ? `:${emoji.short_names[0]}:` : props.emoji
        }}
        onClick={handleEmojiToggle}
      />
      <Form.Control
        autoFocus
        onClick={() => handleEmojiToggle(false)}
        ref={messageBox}
        value={input}
        as="textarea"
        rows="5"
        onChange={handleInputChange}
        placeholder={placeholder + '...'}
        onKeyDown={enterKeySendsMessage}
      />
      <Button 
        className=""
        onClick={sendMessage}
        disabled={input === ''}
      ><img src={SendIcon} alt="Send" />
      </Button>
    </Form>
  );
};

export default MessageInputBox;