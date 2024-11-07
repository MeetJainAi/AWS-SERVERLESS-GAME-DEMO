import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from './auth/LoginForm';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContainer, GameGrid, Card, ScoreBoard } from '../styles/GameStyles';
import ConfettiGenerator from 'confetti-js';

const GAME_ICONS = ['🎮', '🎲', '🎯', '🎪', '🎨', '🎭', '🚀', '🎸', '🎹', '🎬'];

interface GameCard {
  id: number;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function Game() {
  const { isAuthenticated, displayName, signOut } = useAuth();
  const [cards, setCards] = useState<GameCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [bestScore, setBestScore] = useState<number>(0);

  useEffect(() => {
    initializeGame();
    const savedBestScore = localStorage.getItem('bestScore');
    if (savedBestScore) {
      setBestScore(parseInt(savedBestScore));
    }
  }, []);

  useEffect(() => {
    if (gameWon) {
      const confetti = new ConfettiGenerator({
        target: 'confetti-canvas',
        max: 80,
        size: 1.5,
        animate: true,
        props: ['circle', 'square', 'triangle', 'line'],
        colors: [
          ['165', '104', '246'], // Purple
          ['230', '61', '135'],  // Pink
          ['0', '199', '228'],   // Cyan
          ['253', '214', '126']  // Yellow
        ],
      });
      confetti.render();
      
      if (score > bestScore) {
        setBestScore(score);
        localStorage.setItem('bestScore', score.toString());
      }

      return () => confetti.clear();
    }
  }, [gameWon, score, bestScore]);

  function initializeGame() {
    const gameIcons = GAME_ICONS.slice(0, 8);
    const shuffledCards = [...gameIcons, ...gameIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setScore(0);
    setMoves(0);
    setGameWon(false);
    setFlippedCards([]);
  }

  function handleCardClick(cardId: number) {
    if (flippedCards.length === 2 || cards[cardId].isMatched || cards[cardId].isFlipped) return;

    const newCards = [...cards];
    newCards[cardId].isFlipped = true;
    setCards(newCards);

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].icon === cards[secondCard].icon) {
        newCards[firstCard].isMatched = true;
        newCards[secondCard].isMatched = true;
        const matchScore = Math.max(50 - moves * 2, 10);
        setScore(prev => prev + matchScore);
        setFlippedCards([]);
        
        if (newCards.every(card => card.isMatched)) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => {
          newCards[firstCard].isFlipped = false;
          newCards[secondCard].isFlipped = false;
          setCards(newCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  }

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <GameContainer>
      <canvas id="confetti-canvas" className="fixed inset-0 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">Memory Match</h1>
        <div className="flex items-center gap-4">
          <span className="text-white font-medium">Welcome, {displayName}</span>
          <button 
            onClick={signOut}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-4">
        <ScoreBoard className="md:sticky md:top-6">
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>Current Score: {score}</p>
          <p>Best Score: {bestScore}</p>
          <p>Moves: {moves}</p>
          <button
            onClick={initializeGame}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            New Game
          </button>
        </ScoreBoard>

        <GameGrid
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        >
          <AnimatePresence>
            {cards.map(card => (
              <Card
                key={card.id}
                isFlipped={card.isFlipped}
                onClick={() => handleCardClick(card.id)}
                whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                className={card.isMatched ? 'opacity-75' : ''}
              >
                {card.isFlipped && (
                  <motion.span
                    initial={{ opacity: 0, rotateY: 180 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    className="text-4xl md:text-5xl"
                  >
                    {card.icon}
                  </motion.span>
                )}
              </Card>
            ))}
          </AnimatePresence>
        </GameGrid>
      </div>

      {gameWon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 md:p-8 text-center max-w-md w-full"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Congratulations! 🎉</h2>
            <p className="text-lg mb-2">You won with {score} points!</p>
            <p className="text-gray-600 mb-6">in {moves} moves</p>
            {score > bestScore && (
              <p className="text-green-600 font-semibold mb-6">New Best Score! 🏆</p>
            )}
            <button
              onClick={initializeGame}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Play Again
            </button>
          </motion.div>
        </motion.div>
      )}
    </GameContainer>
  );
}