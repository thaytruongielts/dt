
import React, { useState, useEffect } from 'react';

interface TimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds, onTimeUp }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeUp]);
  
  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const progress = (initialSeconds - secondsLeft) / initialSeconds * 100;
  
  return (
    <div className="relative w-full text-center">
        <div className="w-full bg-slate-700 rounded-full h-2.5 mb-2">
            <div 
                className="bg-sky-500 h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                style={{ width: `${progress}%` }}
            ></div>
        </div>
        <p className="text-4xl font-mono font-bold text-slate-100 tracking-widest">
            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
    </div>
  );
};

export default Timer;
