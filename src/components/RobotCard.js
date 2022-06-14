const getBackgroundColor = (isWinner) => {
  if (isWinner === undefined) {
    return '#6d5656';
  }
  return isWinner ? '#0b5b26' : '#66090f';
};

const RobotCard = ({ robot }) => {
  const { name, powermove, experience, avatar, winner } = robot;

  const isWinner = winner === true;

  return (
    <div
      className="robotCard box"
      style={{
        background: getBackgroundColor(winner),
      }}
    >
      <div className="robotProperties">
        <p>
          Name: <b>{name}</b>
        </p>
        <p>Power move:{powermove}</p>
      </div>
      <p>
        Exp: <b>{experience}</b>
      </p>
      <div>{isWinner && <b>Winner!!</b>}</div>
      <img alt={name} src={avatar} width="100px" />
    </div>
  );
};

export default RobotCard;
