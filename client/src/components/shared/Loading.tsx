// External Dependencies
import { useLottie } from 'lottie-react';

// Local Dependencies
import animation from '../../assets/lottie/pianoLoading.json'
import '../../App.css'

function Loading() {

  const options= {
    animationData: animation,
    loop: true
  };

  const { View } = useLottie(options, { height: 150 });

  return (
    <div id="loading-container">
      { View }
      <h1>Loading...</h1>
    </div>
  )
}

export default Loading