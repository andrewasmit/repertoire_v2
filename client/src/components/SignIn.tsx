import React from 'react'
// import { Player } from '@lottiefiles/react-lottie-player'
import { useLottie } from 'lottie-react';
import animation from '../assets/lottie/pianoLoading.json'

function SignIn() {

  const options= {
    animationData: animation,
    loop: true
  };

  const { View } = useLottie(options);

  return (
    <div>
      <h1>This is the Sign In page.</h1>
      {/* <Player src='../assets/lottie/pianoLoading.json' loop autoplay/> */}
      { View }
    </div>
  )
}

export default SignIn