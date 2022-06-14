import { Link } from 'react-router-dom';

import RobotCard from './RobotCard';
import { generateRobotTeam } from '../utils';

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
          {teamOne.map((robot) => (
            <RobotCard robot={robot} />
          ))}
        </div>
        <div className="rightTeamPane">
          <TeamGeneratorForm />
          {teamTwo.map((robot) => (
            <RobotCard robot={robot} />
          ))}
        </div>
      </div>
      <Link to="/danceOff">
        <button>Start Dance off</button>
      </Link>
    </>
  );
};

export default TeamsGenerator;
