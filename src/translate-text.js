const uuidv4 = require('uuid/v4');
const config = require('./config').default;
const querystring = require('querystring');

var key_var = 'TRANSLATOR_TEXT_SUBSCRIPTION_KEY';
// if (!config[key_var]) {
//     throw new Error('Please set/export the following environment variable: ' + key_var);
// }
var subscriptionKey = config[key_var];
var endpoint_var = 'TRANSLATOR_TEXT_ENDPOINT';
// if (!config[endpoint_var]) {
//     throw new Error('Please set/export the following environment variable: ' + endpoint_var);
// }
var endpoint = config[endpoint_var];

const translateMessage = (text, from, to) => {
  const qs = querystring.stringify({ 
    'api-version': '3.0',
    from,
    to: [to],
  });

  if (typeof text === "string") {
    text = [{ text }];
  }

  return fetch(
    endpoint + 'translate?' + qs,
    {
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Ocp-Apim-Subscription-Region': 'australiaeast',
        'Content-type': 'application/json',
        'X-ClientTraceId': uuidv4().toString()
      },
      method: 'POST',
      body: JSON.stringify(text),
    }
  )
    .then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(error => console.log(error));
}

export default translateMessage;
