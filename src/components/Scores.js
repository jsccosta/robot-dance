import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Scores = () => {
  const [previousResults, setPreviousResults] = useState([]);

  useEffect(() => {
    const getRobots = async () => {
      const robots = await fetch(
        'https://challenge.parkside-interactive.com/api/danceoffs/populated',
      )
        .then((res) => res.json())
        .then((robots) =>
          robots
            .map((robot) => robot.winner.name)
            .reduce((group, robot) => {
              group[robot] = group[robot] ? ++group[robot] : 1;
              return group;
            }, {}),
        )
        .then((results) => {
          const orderedWins = Object.entries(results).sort(function (a, b) {
            return b[1] - a[1];
          });

          return orderedWins;
        });

      setPreviousResults(robots);
    };

    getRobots();
  }, []);

  return (
    <>
      <div>Scores</div>
      {previousResults.map((score) => {
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
