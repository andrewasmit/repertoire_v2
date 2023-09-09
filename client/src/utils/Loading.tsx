// External Dependencies
// import React from 'react'
import { useLottie } from 'lottie-react';

// Local Dependencies
import animation from '../assets/lottie/pianoLoading.json'

function Loading() {

  const options= {
    animationData: animation,
    loop: true
  };

  const { View } = useLottie(options, { height: 130 });

  return (
    <div>
      { View }
      <h2>Loading...</h2>
    </div>
  )
}

export default Loading