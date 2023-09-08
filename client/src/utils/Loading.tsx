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
      { View }
    </div>
  )
}

export default Loading