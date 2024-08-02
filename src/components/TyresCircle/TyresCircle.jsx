import React from 'react';
import softTyreImg from '../../assets/icons/soft.png';
import mediumTyreImg from '../../assets/icons/medium.png';
import hardTyreImg from '../../assets/icons/hard.png';
import intermediateTyreImg from '../../assets/icons/intermediate.png';
import wetTyreImg from '../../assets/icons/wet.png';

const TyresCircle = (props) => {
  const { compound, size = 70 } = props;

  if (compound === 'SOFT') {
    return (
      <img src={softTyreImg} alt="mediumTyre" width={size} height={size} />
    );
  } else if (compound === 'MEDIUM') {
    return (
      <img src={mediumTyreImg} alt="mediumTyre" width={size} height={size} />
    );
  } else if (compound === 'HARD') {
    return (
      <img src={hardTyreImg} alt="mediumTyre" width={size} height={size} />
    );
  } else if (compound === 'INTERMEDIATE') {
    return (
      <img
        src={intermediateTyreImg}
        alt="intermediateTyre"
        width={size}
        height={size}
      />
    );
  } else if (compound === 'WET') {
    return <img src={wetTyreImg} alt="wetTyre" width={size} height={size} />;
  }
};

export default TyresCircle;
