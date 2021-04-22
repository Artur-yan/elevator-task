import React, { useEffect, useState, useContext, useRef } from "react";
import './style.scss';

export const Elevator = () => {

  const elevatorHeight = 79;
  const [floors] = useState([1,2,3,4,5,6]);
  const [elevators, setElevators] = useState([
    {
      isActive: false,
      position: 0
    },
    {
      isActive: false,
      position: 0
    },
    {
      isActive: false,
      position: 0
    },
  ]);

  const callElevator = (index) => {
    let freeElevatorIndex = null;
    elevators.map((elevator, index) => {
      if (!elevator.isActive) {
        freeElevatorIndex = index;
      }
    });

    if (freeElevatorIndex !== null) {
      let elevatorWithNewPosition = [...elevators];
      elevatorWithNewPosition[freeElevatorIndex].position = index * elevatorHeight;
      elevatorWithNewPosition[freeElevatorIndex].isActive = true;
      setElevators(elevatorWithNewPosition)
    }
  };

  return (
    <div className="elevator-container">
      <div className="elevators">
        {elevators.map((elevator, index) => {
          return (
            <div key={index} className="elevator">
              <div className="item"  style={{top: `${elevator.position}px`}}/>
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