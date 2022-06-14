import './App.css';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Welcome from './components/Welcome';
import TeamsGenerator from './components/TeamsGenerator';
import RobotCard from './components/RobotCard';

import { generateRobotTeam } from './utils';

import { allRobots, danceOffs } from './mock';

const DanceOff = () => {
  const danceOffPairs = () => {
    const teamOne = generateRobotTeam(5);
    // team two should not include items from team one
    const teamTwo = generateRobotTeam(5);

    const dancePairs = teamOne.map((robot, idx) => {
      return {
        robot1: robot,
        robot2: teamTwo[idx],
      };
    });

    return dancePairs;
  };

  const pairs = danceOffPairs();

  return (
    <>
      <div className="faceOffContainer">
        {pairs.map((item) => (
          <>
            <div className="versusCard">
              <div>{<RobotCard robot={item.robot1} />}</div>
              Vs
              <div>{<RobotCard robot={item.robot2} />}</div>
            </div>
          </>
        ))}
      </div>

      <div>Dance Off</div>
      {/* show only before game kickoff */}
      <Link to="/scores">
        <button>View scores</button>
      </Link>
      {/* show when dance off is done */}
      <Link to="/teamsGenerator">
        <button>Play again</button>
      </Link>
    </>
  );
};

const Scores = () => {
  const wins = danceOffs
    .map((robot) => robot.winner.name)
    .reduce((group, robot) => {
      group[robot] = group[robot] ? ++group[robot] : 1;
      return group;
    }, {});

  const orderedWins = Object.entries(wins).sort(function (a, b) {
    return b[1] - a[1];
  });

  return (
    <>
      <div>Scores</div>
      {orderedWins.map((score) => {
        const robotName = score[0];
        const wins = score[1];
        return (
          <div>
            {robotName} - {wins}
          </div>
        );
      })}
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/teamsGenerator">
        <button>Play again</button>
      </Link>
    </>
  );
};

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
