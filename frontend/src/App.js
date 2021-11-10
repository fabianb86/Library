import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TopMenu from "./components/navbar/Navbar";
import AppRouter from "./components/router/router";

function App() {
  return (
    <div className="App">
      {/* <Container> */}
      <TopMenu />
      <AppRouter />
      {/* </Container> */}
    </div>
  );
}

export default App;
