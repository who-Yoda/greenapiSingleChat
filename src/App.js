import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import CreateChat from "./createchat";
import Chat from "./chat";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createchat" element={<CreateChat />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;