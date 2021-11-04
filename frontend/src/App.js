import logo from "./logo.svg";
// import { Container } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      {/* <Container> */}
      <Navbar />
      <Login />
      {/* </Container> */}
    </div>
  );
}

export default App;
