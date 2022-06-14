import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import TeamsGenerator from './components/TeamsGenerator';
import DanceOff from './components/DanceOff';
import Scores from './components/Scores';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/teamsGenerator" element={<TeamsGenerator />} />
              <Route path="/danceOff" element={<DanceOff />} />
              <Route path="/scores" element={<Scores />} />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
