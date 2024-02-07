import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chats.css";

let socket;
const CONNECTION_PORT = "http://localhost:4001";


const ChatsPage = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [room, setRoom] = useState("");
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [messageList, setMessageList] = useState([]);
  
    useEffect(() => {
        socket = io(CONNECTION_PORT);
      }, [CONNECTION_PORT]);

      useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList([...messageList, data]);
        });
      });

      const connectToRoom = () => {
        setLoggedIn(true);
        socket.emit("join_room", room);
      };

      const sendMessage = async () => {
        let messageContent = {
          room: room,
          content: {
            author: userName,
            message: message,
          },
        };
    
        await socket.emit("send_message", messageContent);
        setMessageList([...messageList, messageContent.content]);
        setMessage("");
      };
    
    return (
        <div className="Chat">
          {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Name..."
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room..."
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
   <div className="messages">
  {messageList.map((val) => {
    return (
      <div
        className="messageContainer"
        id={val.author === userName ? "You" : "Other"}
        key={val.id} // Assuming val has a unique identifier like an id
      >
        <div className="messageIndividual">
          {val.author}: {val.message}
        </div>
      </div>
    );
  })}
</div>
          <div className="messageInputs">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <h1>Live Chats</h1>
        </div>
    
    );
  };
  
  export default ChatsPage;