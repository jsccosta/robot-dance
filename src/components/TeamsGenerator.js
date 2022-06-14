import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import RobotCard from './RobotCard';
import FormElement from './FormElement';
import { generateRobotTeam } from '../utils';

const TeamsGenerator = () => {
  const [teamOneName, setTeamOneName] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');

  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);

  const [availableRobots, setavailableRobots] = useState([]);
  const [dancePairs, setDancePairs] = useState([]);

  const [showDancePairs, setShowDancePairs] = useState(false);

  const playAgainHandler = () => {
    setTeamOneName('');
    setTeamTwoName('');
    setTeamOne([]);
    setTeamTwo([]);
    setDancePairs([]);
    setShowDancePairs(false);
  };

  useEffect(() => {
    if (teamOne.length > 0 && teamTwo.length > 0) {
      const dancePairs = teamOne.map((robot, idx) => {
        const robot1Value = robot.experience * Math.random();
        const robot2 = teamTwo[idx];
        const robot2Value = robot2.experience * Math.random();
        return {
          robot1: { ...robot, winner: robot1Value > robot2Value },
          robot2: { ...robot2, winner: robot2Value > robot1Value },
        };
      });
      setDancePairs(dancePairs);
    }
  }, [teamOne, teamTwo]);

  useEffect(() => {
    const getRobots = async () => {
      const robots = await fetch(
        'https://challenge.parkside-interactive.com/api/robots',
      )
        .then((res) => res.json())
        .then((robots) => robots.filter((robot) => robot.outOfOrder === false));

      setavailableRobots(robots);
    };

    getRobots();
  }, []);

  const teamGenerator = (team) => {
    if (team === 'teamOne') {
      const newTeam = generateRobotTeam(availableRobots, 5);
      setTeamOne(newTeam);
    } else if (team === 'teamTwo') {
      const remainingRobots = availableRobots.filter(
        (robot) => teamOne.indexOf(robot.id) === -1,
      );
      const newTeam = generateRobotTeam(remainingRobots, 5);
      setTeamTwo(newTeam);
    }
  };

  return (
    <>
      {!showDancePairs ? (
        <div className="teamsGenerator">
          <div className="leftTeamPane">
            {teamOne.length === 0 && teamOneName === '' && (
              <FormElement
                buttonLabel={'Generate team one'}
                buttonCallback={() => teamGenerator('teamOne')}
                teamNameSetter={setTeamOneName}
              />
            )}
            {teamOne.length > 0 && teamOneName !== '' && (
              <div>
                <div>{teamOneName}</div>
                {teamOne.map((robot) => (
                  <RobotCard key={robot.id} robot={robot} />
                ))}
              </div>
            )}
          </div>
          <div className="rightTeamPane">
            {teamTwo.length === 0 && teamTwoName === '' && (
              <FormElement
                buttonLabel={'Generate team two'}
                buttonCallback={() => teamGenerator('teamTwo')}
                teamNameSetter={setTeamTwoName}
              />
            )}
            {teamTwo.length > 0 && teamTwoName !== '' && (
              <div>
                <div>{teamTwoName}</div>
                {teamTwo.map((robot) => (
                  <RobotCard key={robot.id} robot={robot} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="faceOffContainer">
          {dancePairs.map((item) => (
            <>
              <div className="versusCard">
                {<RobotCard robot={item.robot1} winner={item.robot1.winner} />}
                <div className="versusSeparator">Vs</div>
                {<RobotCard robot={item.robot2} winner={item.robot2.winner} />}
              </div>
            </>
          ))}
        </div>
      )}

      {teamOneName !== '' && teamTwoName !== '' && !showDancePairs && (
        <button onClick={() => setShowDancePairs(true)}>Start Dance off</button>
      )}
      {showDancePairs && (
        <>
          <Link to="/scores">
            <button>View scores</button>
          </Link>

          <button onClick={playAgainHandler}>Play again</button>
        </>
      )}
    </>
  );
};

export default TeamsGenerator;
