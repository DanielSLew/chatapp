import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import uuidv4 from 'uuid/v4';

const config = require('../config').default;

function LanguageSelectBox({ handleLanguageSelect }) {
  const [language, setLanguage] = useState(null);
  const [languagesAvailable, setLanguagesAvailable] = useState([]);

  useEffect(() => {
    const headers = new Headers({
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    });
    fetch(
      config.REACT_APP_TRANSLATOR_TEXT_ENDPOINT + 'languages?api-version=3.0',
      { headers }
    )
      .then(res => res.json())
      .then(response => {
        setLanguagesAvailable(response.translation);
      })
      .catch(error => console.log(error));
  }, []);

  return(
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>What language are you using?</Form.Label>
        <Form.Control
          as="select"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value={null}>Select your Language</option>
          {Object.keys(languagesAvailable).map((langCode) => (
            <option 
              key={langCode}
              value={langCode}
            >{languagesAvailable[langCode].name} | {languagesAvailable[langCode].nativeName}</option>
          ))}
        </Form.Control>
        <Button 
          type="submit"
          disabled={language === null}
          onClick={() => handleLanguageSelect(language)}
        >Confirm</Button>
      </Form.Group>
    </Form>
  );
};

export default LanguageSelectBox;