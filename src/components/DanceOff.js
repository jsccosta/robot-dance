import { Link } from 'react-router-dom';
import RobotCard from './RobotCard';
import { generateRobotTeam } from '../utils';

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

export default DanceOff;
