import { useState, useEffect, useRef } from 'react';
import './SandTimer.css';

function SandTimer() {
  const [timeInMinutes, setTimeInMinutes] = useState(1);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // in seconds
  const timerRef = useRef(null);
  
  // Convert time from minutes to seconds when slider changes
  useEffect(() => {
    setRemainingTime(timeInMinutes * 60);
  }, [timeInMinutes]);

  // Handle timer logic
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, isPaused]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setIsPaused(false);
    } else if (isPaused) {
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isRunning && !isPaused) {
      setIsPaused(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setRemainingTime(timeInMinutes * 60);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate sand percentage for visual representation
  const sandPercentage = isRunning || isPaused 
    ? (1 - remainingTime / (timeInMinutes * 60)) * 100
    : 0;

  return (
    <div className="sand-timer">
      <h2>Sand Timer</h2>
      
      <div className="timer-display">
        <div className="sandglass">
          <div className="top-chamber">
            <div 
              className="sand top-sand" 
              style={{ height: `${100 - sandPercentage}%` }}
            ></div>
          </div>
          <div className="middle-section">
            <div className="neck"></div>
          </div>
          <div className="bottom-chamber">
            <div 
              className="sand bottom-sand" 
              style={{ height: `${sandPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="time-display">{formatTime(remainingTime)}</div>
      </div>
      
      <div className="time-control">
        <label htmlFor="time-slider">Set Timer (1-60 minutes): {timeInMinutes} min</label>
        <input 
          id="time-slider"
          type="range" 
          min="1" 
          max="60" 
          value={timeInMinutes}
          onChange={(e) => setTimeInMinutes(Number(e.target.value))}
          disabled={isRunning || isPaused}
        />
      </div>
      
      <div className="buttons">
        <button 
          className="start" 
          onClick={handleStart}
          disabled={isRunning && !isPaused}
        >
          {!isRunning || isPaused ? "Start" : "Resume"}
        </button>
        <button 
          className="pause" 
          onClick={handlePause}
          disabled={!isRunning || isPaused}
        >
          Pause
        </button>
        <button 
          className="stop" 
          onClick={handleStop}
          disabled={!isRunning && !isPaused}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default SandTimer;