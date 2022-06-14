import './App.css';

import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import { allRobots, danceOffs } from './mock';

const availableRobots = allRobots.filter((robot) => robot.outOfOrder === false);

const getRandomRobot = (robots) =>
  robots[Math.floor(Math.random() * robots.length)];

const generateRobotTeam = (teamSize = 5) => {
  let totalExperience = 0;
  // const currentTeam = Array.apply(null, Array(teamSize)).map(() => undefined);
  const currentTeam = [];
  for (let i = 0; i <= teamSize; i++) {
    const randomRobot = getRandomRobot(availableRobots);
    if (totalExperience + randomRobot.experience <= 50) {
      totalExperience += randomRobot.experience;
      currentTeam.push(randomRobot);
    }
  }

  return currentTeam;
};

const generateRobotCard = (robot) => {
  return (
    <div className="robotCard box" key={robot.id}>
      <div>{robot.name}</div>
      <div>{robot.powermove}</div>
      <div>{robot.experience}</div>
      <div>{robot.outOfOrder}</div>
      <img src={robot.avatar} width="100px" />
    </div>
  );
};

const Welcome = () => {
  return (
    <>
      <div className="textContainer">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <Link to="/teamsGenerator">
        <button>Start Dance off</button>
      </Link>
    </>
  );
};

const TeamGeneratorForm = () => {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="teamNameInput">Team name:</label>
        <input id="teamNameInput" type="text" />
      </div>
      <button type="submit">Generate team</button>
    </form>
  );
};

const TeamsGenerator = () => {
  const teamOne = generateRobotTeam(5);
  // team two should not include items from team one
  const teamTwo = generateRobotTeam(5);

  return (
    <>
      <div className="teamsGenerator">
        <div className="leftTeamPane">
          <TeamGeneratorForm />
          {teamOne.map((robot) => generateRobotCard(robot))}
        </div>
        <div className="rightTeamPane">
          <TeamGeneratorForm />
          {teamTwo.map((robot) => generateRobotCard(robot))}
        </div>
      </div>
      <Link to="/danceOff">
        <button>Start Dance off</button>
      </Link>
    </>
  );
};

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
              <div>{generateRobotCard(item.robot1)}</div>
              Vs
              <div>{generateRobotCard(item.robot2)}</div>
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
