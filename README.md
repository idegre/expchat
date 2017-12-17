# expchat

  This a small project i started as a simple experiment on cloud chat aplications. the main idea was to have a non-registration chat service, and make it as simple as posible. The app is built around the firebase platform using React and node.
  
  Functioning: the users goes to domain/chat/[some URL] and acceses a chat in that address, and if the chat room doesn't exist tha user can start a chat room (this allows for vanity URLs). then other users join by navigating to the same address and knownd the password(if there is one). all chats are stored in a realtime database in firebase and are accesible for all users. Because of this in order to have a private chat room the user must use a password. In this case the chat is end-to-end encripted.
  
  TODO:
  - [x] get the basic chat interface running.
  - [x] add end-to-end encription to the chat rooms.
  - [ ] usernames:
    - [x] add changeable usernames.
    - [ ] make usernames non repeateble in the same chat room.
    - [x] add presence system.
    - [ ] encrypt connected users.
  - [x] add a way to have vanity URLs. 
  - [ ] add the hastag/theme system.
  - [ ] add styled text to the messages.
  - [ ] add temporary chat rooms (the messages get deleted after an interval).
