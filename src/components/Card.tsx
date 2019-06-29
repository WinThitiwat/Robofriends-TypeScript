import React from 'react';
import {IRobot} from '../containers/App'

interface CardStatelessProps {
  name: string,
  email: string,
  id: number
}

const Card : React.SFC<CardStatelessProps> = (props) =>{
  const {id, name, email} = props;
  return(
    <div className='tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5'>
      <img src={`https://robohash.org/${id}?200x200`} alt='robots'/>
      <div >
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default Card;
