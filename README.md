# World Wide Chat

Hosted at https://worldwidechat.org/

Hosted on a Virtual Private Server (Digital Ocean droplet)

### Infrastructure

Exposes an Nginx reverse proxy that handles two endpoints, one for the static content and one for the websockets server

The Nginx proxy then handles the upstream websocket messages and tunnels them to the client.

The websockets server is built into a Node Express server, and the static content is built with React.

### How it works

When a user visits the website it parses a `room` query parameter, and joins the user to a websocket 'room' with the value of that `room` query parameter.

If a user joins without the query parameter, we generate a unique token and create a room for that user.

The user can click the button at the top of the page to copy the room URL to their clipboard so they can share it with friends.

This app is also hooked up to a Azure's translate API which is currently not set up for deployment.
