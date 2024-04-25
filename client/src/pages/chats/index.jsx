import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import "./chats.css";

let socket;
// the connection port for the socket
const CONNECTION_PORT = "http://localhost:4001";

const ChatsPage = () => {
   // State variables
  const [loggedIn, setLoggedIn] = useState(false);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState([]);
  const [roomName, setRoomName] = useState(""); 

  const userName = useSelector((state) => state.user.userName); // Get username from Redux store
 
  // Initialize socket connection
  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

   // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

   // Connect to chat room
  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
    setRoomName(room);
  };

  // Send message to chat room
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

  // Navigate to home page
  const handleHomeClick = () => {
    navigate(`/home/`);
  };

  return (
    <div className="Chat">
      {!loggedIn ? (
        <div className="logIn">
          <div className="inputs">
            <input
              type="text"
              placeholder="Enter a Room"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
          </div>
          <button onClick={connectToRoom}>Enter Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
          <h2>Chat Room: {roomName}</h2> {/* Display the name of the chat room */}
          <div className="messages">
            {messageList.map((val, index) => (
              <div
                className="messageContainer"
                id={val.author === userName ? "You" : "Other"}
                key={index}
              >
                <div className="messageIndividual">
                  {val.author}: {val.message}
                </div>
              </div>
            ))}
          </div>
          {/* Message input field */}
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
      <HomeIcon onClick={() => handleHomeClick()}></HomeIcon>
    </div>
  );
};

export default ChatsPage;
