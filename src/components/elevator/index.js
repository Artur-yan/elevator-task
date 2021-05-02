import React, { useEffect, useState, useContext, useRef } from "react";
import './style.scss';

export const Elevator = () => {

  const elevatorHeight = 79;
  const [floors] = useState([1,2,3,4,5,6]);
  const [elevators, setElevators] = useState([
    {
      isActive: false,
      position: (floors.length -1 ) * elevatorHeight
    },
    {
      isActive: false,
      position: (floors.length -1 ) * elevatorHeight
    },
    {
      isActive: false,
      position: (floors.length -1 ) * elevatorHeight
    },
  ]);

  const callElevator = (currentIndex) => {
    let freeElevatorIndex = null;
    elevators.map((elevator, index) => {
      if (!elevator.isActive) {
        freeElevatorIndex = index;
      }
    });
    let elevatorWithNewPosition = [...elevators];
    if (freeElevatorIndex !== null) {
      elevatorWithNewPosition[freeElevatorIndex].position = currentIndex * elevatorHeight;
      elevatorWithNewPosition[freeElevatorIndex].isActive = true;
      setElevators(elevatorWithNewPosition)
    } else {
      const needle = currentIndex * elevatorHeight;
      const numbers = elevators.map((elevator, index) => {
        return elevator.position;
      });

      numbers.sort((a, b) => {
        return Math.abs(needle - a) - Math.abs(needle - b);
      });

      const neededPosition = numbers[0];
      elevatorWithNewPosition.map((elevator, index) => {
        if (elevator.position === neededPosition) {
          elevatorWithNewPosition[index].position = currentIndex * elevatorHeight;
          setElevators(elevatorWithNewPosition)
        }
      })
    }
  };

  return (
    <div className="elevator-container">
      <div className="elevators">
        {elevators.map((elevator, index) => {
          return (
            <div key={index} className="elevator">
              <div className="item"  style={{top: `${elevator.position}px`}}><span>{index +1}</span></div>
            </div>
          )
        })}
      </div>
      <div className="floors">
        {floors.map((floor, index) => {
          return (
            <div key={index} className="floor">
              <button className='callBtn' onClick={() => callElevator(index)}/>
            </div>
          )
        })}
      </div>
    </div>
  )
};