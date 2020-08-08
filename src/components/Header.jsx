import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CheckIcon from '../check-icon.svg';

function Header({ room, placeholder }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const host = window.location.host;
  const inviteMessage = `Come join me at WorldChat: ${host}/?room=${room}`;

  let displayCopyMessage;

  const copyInviteToClipboard = () => {
    clearTimeout(displayCopyMessage);
    navigator.clipboard.writeText(inviteMessage);
    setCopySuccess(true);
    displayCopyMessage = setTimeout(() => setCopySuccess(false), 2000);
  }

  return(
    <div>
      <p>
        <Button
          className="mx-auto"
          onClick={copyInviteToClipboard}
          style={{ marginRight: '20px' }}
          variant="outline-info"
        >{placeholder}</Button>
        {copySuccess && <img style={{ marginLeft: '20px' }} src={CheckIcon} alt="Copied!" />}
      </p>
    </div>
  )
}

export default Header;