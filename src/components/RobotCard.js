const RobotCard = ({ robot }) => {
  const { name, powermove, experience, outOfOrder, avatar, winner } = robot;

  return (
    <div
      className="robotCard box"
      style={{
        background:
          winner !== undefined ? (winner === true ? 'green' : 'red') : '',
      }}
    >
      <div>{name}</div>
      <div>{powermove}</div>
      <div>{experience}</div>
      <div>{outOfOrder}</div>
      <img alt={name} src={avatar} width="100px" />
    </div>
  );
};

export default RobotCard;
