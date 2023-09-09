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

  const { View } = useLottie(options);

  return (
    <div>
      {View}
      <h3>Loading...</h3>
    </div>
  )
}

export default Loading