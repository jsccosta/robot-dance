const getRandomRobot = (robots) =>
  robots[Math.floor(Math.random() * robots.length)];

export const generateRobotTeam = (availableRobots, teamSize = 5) => {
  let totalExperience = 0;
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
