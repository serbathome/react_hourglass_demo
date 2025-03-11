# GitHub Copilot Bug Fixing Demo

This project demonstrates GitHub Copilot's capabilities in identifying and fixing bugs in a React application.

## Project Overview

This is a simple React application featuring a sand timer/hourglass component that visualizes the passage of time.

## Bugs Reported by Users

### Bug 1: Start Button Not Working
Users have reported that clicking the Start button does nothing. The timer display shows the correct time, but the sand animation doesn't start and the time doesn't count down when pressing the Start button.

### Bug 2: Timer Always Runs for 1 Minute Only
Regardless of what duration the user selects using the time slider (1-60 minutes), the hourglass visualization always runs for exactly 1 minute. The selected time is displayed correctly, but the actual running time is fixed at 1 minute.

## Technologies Used

- React 19
- Vite
- CSS for animations and styling

## Running Locally

Follow these steps to run the project on your local machine:

1. **Clone the repository**
   ```
   git clone git@github.com:serbathome/react_hourglass_demo.git
   cd react_hourglass_demo
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start the development server**
   ```
   npm run dev
   ```

4. **Open your browser**
   The application should now be running at [http://localhost:5173](http://localhost:5173)
