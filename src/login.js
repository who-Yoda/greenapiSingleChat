import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './App.css';

function LoginPage() {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://7103.api.greenapi.com/waInstance${encodeURIComponent(idInstance)}/getSettings/${encodeURIComponent(apiTokenInstance)}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      navigate("/CreateChat", { state: { idInstance, apiTokenInstance } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="page-container">
      <div className="form-card">
        <h1 className="form-title">Login</h1>
        <form className="form-content" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="idInstance"
              className="form-input"
              placeholder="idInstance"
              value={idInstance}
              onChange={(e) => setIdInstance(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="apiTokenInstance"
              className="form-input"
              placeholder="apiTokenInstance"
              value={apiTokenInstance}
              onChange={(e) => setApiTokenInstance(e.target.value)}
            />
          </div>
          <button type="submit" className="form-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
