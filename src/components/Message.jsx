import React from 'react';
import { Card } from 'react-bootstrap';
import { formatDistance } from 'date-fns';

function Message({ text, username, timestamp, isSelf }) {
  const style = { width: '80%' };
  if (!isSelf) style.marginLeft = 'auto';

  const headerColour = isSelf ? '#265ff0' : '#db9846';

  return(
    <Card style={style}>
      <Card.Header 
        style={{ fontSize: '0.5rem', padding: '1px 20px', backgroundColor: headerColour, color: 'white', fontWeight: 'bold' }}
      >{username}</Card.Header>
      <Card.Body style={{ padding: '10px 20px' }}>
        <Card.Text style={{ fontSize: '0.75rem' }}>
          {text}
        </Card.Text>
        <Card.Subtitle
          style={{ fontSize: '0.4rem' }}
          className="mb-2 text-muted"
        >{formatDistance(Date.now(), timestamp)}</Card.Subtitle>
      </Card.Body>
    </Card>
  )
}

export default Message;