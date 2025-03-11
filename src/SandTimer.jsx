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
      // BUG #1: We're not actually updating the isRunning state here
      // This causes the pause and stop buttons to remain disabled
      // SOLUTION: Uncomment the line below to properly update state
      // setIsRunning(true);
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
  const totalSeconds = timeInMinutes * 60;
  
  // BUG #2: We're ignoring the timeInMinutes value when calculating the percentages 
  // This causes the timer to always behave as if it's set to 1 minute
  // We're using a hardcoded value of 60 instead of totalSeconds
  // SOLUTION: Replace 60 with totalSeconds in the line below
  const sandPercentage = (totalSeconds === 0) ? 0 : ((60 - remainingTime) / 60) * 100;
  
  const topSandHeight = 100 - sandPercentage;
  const bottomSandHeight = sandPercentage;
  
  // Calculate falling sand height based on remaining time
  const fallingSandHeight = isRunning && !isPaused ? 30 : 0;
  
  // Calculate dynamic sand stream height for bottom chamber
  // The stream should connect from the middle to the current sand level
  const bottomChamberHeight = 100; // Height of bottom chamber in pixels
  const gapToFill = bottomChamberHeight - (bottomSandHeight / 100 * bottomChamberHeight);
  const streamHeight = isRunning && !isPaused ? (gapToFill > 0 ? gapToFill : 0) : 0;

  return (
    <div className="sand-timer">
      <h2>Sand Timer</h2>
      
      <div className="timer-display">
        <div className="sandglass">
          <div className="top-chamber">
            <div 
              className="sand top-sand" 
              style={{ height: `${topSandHeight}%` }}
            ></div>
          </div>
          
          <div className="middle-section">
            <div className="neck"></div>
            
            {/* Falling sand animation */}
            {isRunning && !isPaused && (
              <div 
                className="falling-sand" 
                style={{ height: `${fallingSandHeight}px` }}
              ></div>
            )}
          </div>
          
          <div className="bottom-chamber">
            {/* Sand stream falling into the bottom chamber */}
            {isRunning && !isPaused && streamHeight > 0 && (
              <div 
                className="sand-stream"
                style={{ height: `${streamHeight}px` }}
              ></div>
            )}
            <div 
              className="sand bottom-sand" 
              style={{ height: `${bottomSandHeight}%` }}
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