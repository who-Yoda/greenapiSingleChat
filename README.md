# Instructions for using the app

## Starting React and webhook listener

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/login](http://localhost:3000/login) to view it in your browser.

In the src/ directory you need to run:

### `node server.js`

Runs the server to listen webhooks on 5000 port.\
Set up webhook URL - http://YOUR_IP:5000/webhook in GreenAPI console to receive webhooks

## Using the app

After starting react app and server.js you can use the app.\
In /login page enter your idInstance and apiTokenInstance to login\
Succesful login will navigate you to /createchat page where you can enter a phone number to create a chat\
If a Whatsapp user with such phone number exists then you will be navigated to /chat page

In /chat paga you can enter text messages only and the user will receive them on the other end.\
They can also send you messages back, which you will receive on your end.

## Additional Features

You can see the avatar(if they have one) and the username of your companion\
Automaticaly resizable input area\
You can send messages by pressing Enter and create a new line using Shift + Enter

## What else could be added

Visible warnings if your login failed or Whatsapp user with given number doesn't exist\
Displaying the number near the avatar if Whatsapp username is not defined
