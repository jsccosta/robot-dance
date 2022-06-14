import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import RobotCard from './RobotCard';
import { generateRobotTeam } from '../utils';

const FormElement = ({ buttonCallback, teamNameSetter, buttonLabel }) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();
  const clickHandler = () => {
    teamNameSetter(inputRef.current.value);
    buttonCallback();
  };
  return (
    <div>
      <label
        htmlFor="teamNameInput"
        value={inputValue}
        onChange={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
        }}
      >
        Team name:
      </label>
      <input id="teamNameInput" type="text" ref={inputRef} />
      <button onClick={clickHandler}>{buttonLabel}</button>
    </div>
  );
};

const TeamsGenerator = () => {
  const [teamOneName, setTeamOneName] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');

  const [teamOne, setTeamOne] = useState([]);
  const [teamTwo, setTeamTwo] = useState([]);

  const [availableRobots, setavailableRobots] = useState([]);

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
      {teamOneName !== '' && teamTwoName !== '' && (
        <Link to="/danceOff">
          <button>Start Dance off</button>
        </Link>
      )}
    </>
  );
};

export default TeamsGenerator;
