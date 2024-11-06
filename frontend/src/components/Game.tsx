import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContainer, GameCard, Input, Button } from '../styles/GameStyles';

const Game: React.FC = () => {
  const [targetNumber] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameWon, setGameWon] = useState(false);

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
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Number Guessing Game
      </motion.h1>

      <GameCard
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
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
              style={{ marginBottom: '1rem', textAlign: 'center' }}
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
            style={{ marginTop: '1rem', background: 'linear-gradient(45deg, #00c853 0%, #64dd17 100%)' }}
          >
            Play Again
          </Button>
        )}
      </GameCard>
    </GameContainer>
  );
};

export default Game; 