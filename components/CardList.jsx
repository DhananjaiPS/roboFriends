import React from 'react';
import RobotCard from './RobotCard';

const CardList = ({ robots }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-5xl">
    {robots.map(robot => (
      <RobotCard
        key={robot.id}
        id={robot.id}
        name={robot.name}
        email={robot.email}
      />
    ))}
  </div>
);

export default CardList;

