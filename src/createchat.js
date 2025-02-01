import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import './App.css';

function CreateChatPage() {
    const location = useLocation();
    const { idInstance, apiTokenInstance } = location.state || {};
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();
  
    const handlePhoneSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const response = await fetch(`https://7103.api.greenapi.com/waInstance${encodeURIComponent(idInstance)}/checkWhatsapp/${encodeURIComponent(apiTokenInstance)}`,
            {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                'phoneNumber': `${(phone)}`,
                })
            }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if(data?.existsWhatsapp){
          console.log("Chat created successfully");
          navigate("/Chat", { state: { idInstance, apiTokenInstance, phone } });
        }else{
          console.error("Whatsapp user with such number does not exist");
        }
      } catch (error) {
        console.error("Failed to create a chat:", error);
      }
    };
  
    return (
      <div className="page-container">
        <div className="form-card">
          <h1 className="form-title">Create a new chat</h1>
          <form className="form-content" onSubmit={handlePhoneSubmit}>
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                className="form-input"
                placeholder="77776665544"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button type="submit" className="form-button">
              Create chat
            </button>
          </form>
        </div>
      </div>
    );
}

export default CreateChatPage;