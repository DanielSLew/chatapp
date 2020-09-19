import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import CheckIcon from '../check-icon.svg';

function Header({ room, placeholder }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const host = window.location.host;
  const inviteMessage = `Come join me at WorldChat: ${host}/?room=${room}`;

  let displayCopyMessage;

  function writeText(str) {
    clearTimeout(displayCopyMessage);
    return new Promise(function(resolve, reject) {
      var success = false;
      function listener(e) {
        e.clipboardData.setData("text/plain", str);
        e.preventDefault();
        success = true;
      }
      document.addEventListener("copy", listener);
      document.execCommand("copy");
      document.removeEventListener("copy", listener);
      success ? resolve(): reject();
      setCopySuccess(true);
      displayCopyMessage = setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  // const copyInviteToClipboard = () => {
  //   clearTimeout(displayCopyMessage);
  //   navigator.clipboard.writeText(inviteMessage);
  //   setCopySuccess(true);
  //   displayCopyMessage = setTimeout(() => setCopySuccess(false), 2000);
  // }

  return(
    <div>
      <p>
        <Button
          className="mx-auto"
          onClick={writeText(inviteMessage)}
          style={{ marginRight: '20px' }}
          variant="outline-info"
        >{placeholder}</Button>
        {copySuccess && <img style={{ marginLeft: '20px' }} src={CheckIcon} alt="Copied!" />}
      </p>
    </div>
  )
}

export default Header;