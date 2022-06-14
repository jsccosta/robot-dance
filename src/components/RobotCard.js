const RobotCard = ({ robot }) => {
  const { name, powermove, experience, outOfOrder, avatar } = robot;

  return (
    <div className="robotCard box">
      <div>{name}</div>
      <div>{powermove}</div>
      <div>{experience}</div>
      <div>{outOfOrder}</div>
      <img src={avatar} width="100px" />
    </div>
  );
};

export default RobotCard;
