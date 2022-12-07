import MainScreen from "./pages/mainScreen.js";
import UserScreen from "./pages/userScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainScreen />} />
          <Route path="/user/:userName" element={<UserScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
