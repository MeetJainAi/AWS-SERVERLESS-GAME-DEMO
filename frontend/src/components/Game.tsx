import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContainer, GameCard, Input, Button } from '../styles/GameStyles';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from './auth/LoginForm';

const Game: React.FC = () => {
  const { isAuthenticated, username, signOut } = useAuth();
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  if (!isAuthenticated) {
    return (
      <GameContainer>
        <GameCard>
          <h2>Please Sign In to Play</h2>
          <LoginForm />
        </GameCard>
      </GameContainer>
    );
  }

  const handleGuess = () => {
    const numberGuess = parseInt(guess);
    setAttempts(prev => prev + 1);

    if (numberGuess === targetNumber) {
      setMessage('🎉 Congratulations! You got it!');
      setGameWon(true);
    } else if (numberGuess < targetNumber) {
      setMessage('📈 Go higher!');
    } else {
      setMessage('📉 Go lower!');
    }
    setGuess('');
  };

  return (
    <GameContainer>
      <div className="absolute top-4 right-4 flex items-center gap-4">
        <span>Welcome, {username}</span>
        <Button onClick={signOut}>Sign Out</Button>
      </div>

      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Number Guessing Game
      </motion.h1>

      <GameCard>
        <h2>Guess a number between 1 and 100</h2>
        <p>Attempts: {attempts}</p>

        <Input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess"
          disabled={gameWon}
        />

        <AnimatePresence>
          {message && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 text-center"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          onClick={handleGuess}
          disabled={gameWon || !guess}
        >
          Make Guess
        </Button>

        {gameWon && (
          <Button
            onClick={() => window.location.reload()}
            className="mt-4 bg-gradient-to-r from-green-500 to-green-400"
          >
            Play Again
          </Button>
        )}
      </GameCard>
    </GameContainer>
  );
};

export default Game;