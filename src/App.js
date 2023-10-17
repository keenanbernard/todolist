import './App.css';
import Container from "./components/Container/Containter";
import Navbar from "./components/Navbar/Navbar";


const App = () => {

  return (
    <div data-testid='App' className="App">
      <Navbar />
      <Container />
    </div>
  );
}

export default App;
