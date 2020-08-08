import React, { useEffect, useRef } from "react";
import Message from './Message';

const MessageList = ({ messages=[], username }) => {
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="messagesWrapper">
      {messages.map((msg, i) => (
        <Message 
          key={i}
          {...msg}
          isSelf={username === msg.username}
        />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  )
};

export default MessageList;