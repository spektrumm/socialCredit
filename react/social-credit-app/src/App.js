import MainScreen from "./pages/mainScreen.js";
import UserScreen from "./pages/userScreen";
import SearchBar from "./components/mainScreen/searchBar";
import Title from "./components/mainScreen/title";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div style={styles.header}>
          <Title />
          <SearchBar />
        </div>
        <Routes>
          <Route exact path="/" element={<MainScreen />} />
          <Route path="/user/:userName" element={<UserScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

export default App;
