import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import RandomChordDrillPage from './Pages/RandomChordDrillPage';
import RandomKeySignatureNamePage from "./Pages/RandomKeySignatureNamePage";

function App() {
  return (
    <>
      <Router>

        <nav>
          <ul>
            <li>
              <Link to="/random-chord-drill">Random akkoorden</Link>
            </li>
            <li>
              <Link to="/random-key-signature-name-drill">Random namen key signatures</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/random-chord-drill" element={<RandomChordDrillPage />} />
          <Route path="/random-key-signature-name-drill" element={<RandomKeySignatureNamePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;