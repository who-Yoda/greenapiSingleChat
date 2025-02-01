import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./App.css";
import plainAvatar from "./plainAvatar.jpg";

const Chat = () => {
  const location = useLocation();
  const { idInstance, apiTokenInstance, phone } = location.state || {};
  const [messages, setMessages] = useState([{}]);
  const [outgoing, setOutgoing] = useState("");
  const [info, setInfo] = useState({});
  const textareaRef = useRef(null);

  useEffect(() => {

    const fetchInfo = async () => {
  
      try {
        const response = await fetch(`https://7103.api.greenapi.com/waInstance${encodeURIComponent(idInstance)}/GetContactInfo/${encodeURIComponent(apiTokenInstance)}`,
          {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            'chatId': `${(phone)}@c.us`
            })
          }
        );
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const contactInfo = await response.json();
        setInfo(contactInfo);
      } catch (error) {
        console.error("Failed to get contact info:", error);
      }
  
    };
    fetchInfo();

    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      const parsed = JSON.parse(event.data);
      const messageText = parsed?.messageData?.textMessageData?.textMessage;
      const chatId = parsed?.senderData?.chatId;
      if (chatId == `${(phone)}@c.us`) {
        setMessages((prev) => [...prev, { text: messageText, type: "recipient", index: prev.length }]);
      }
    };

    return () => socket.close();
  }, []);

  const handleSend = async () => {

    try {
      const response = await fetch(`https://7103.api.greenapi.com/waInstance${encodeURIComponent(idInstance)}/sendMessage/${encodeURIComponent(apiTokenInstance)}`,
        {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'chatId': `${(phone)}@c.us`,
          'message': `${outgoing}`
          })
        }
      );
      if (!response.ok) {
          throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Succesfully send message:", data);
      setOutgoing("");
      textareaRef.current.style.height = "20px";
      textareaRef.current.focus();
      setMessages((prev) => [...prev, { text: outgoing, type: "sender", index: prev.length }]);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "20px";
    textarea.style.height = textarea.scrollHeight -20 + "px";
  };

  return (
    <div className="chat-container">
      <div className="header">
        <img
          src={info.avatar ? info.avatar : plainAvatar}
          alt="avatar"
          className="avatar"
        />
        <span className="username">{info.name}</span>
      </div>
  
      {/* <div className="messages">
          {incomings.map((msg, index) => (
          <div key={index} className="message recipient">
              <span>{msg}</span>
          </div>
          ))}
      </div> */}
  
      <div className="messages">
          {messages.map((msg) => (
          <div key={msg.index} className={`message " ${msg.type}`}>
              <span>{msg.text}</span>
          </div>
          ))}
      </div>

      {/* <div className="messages">
          <div className="message recipient">
              <span>recipient</span>
          </div>
          <div className="message sender">
              <span>sender</span>
          </div>
      </div> */}
  
      <div className="input-area">
        <textarea
          ref={textareaRef}
          type="text"
          placeholder="Type a message"
          className="message-input"
          value={outgoing}
          rows="1"
          onInput={handleInput}
          onChange={(e) => setOutgoing(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{marginRight:"10px"}}
        />
        <button type="button" className="send-button" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}


  
export default Chat;