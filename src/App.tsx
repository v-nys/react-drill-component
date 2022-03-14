import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes
} from "react-router-dom";
import './App.css';
import RandomChordDrillPage from './Pages/RandomChordDrillPage';

function App() {
  return (
    <>
      <Router>

        <nav>
          <ul>
            <li>
              <Link to="/random-chord-drill">Random akkoorden</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/random-chord-drill" element={<RandomChordDrillPage />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;