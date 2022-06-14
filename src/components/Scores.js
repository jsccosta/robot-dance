import { Link } from 'react-router-dom';

import { danceOffs } from '../mock';

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

export default Scores;
