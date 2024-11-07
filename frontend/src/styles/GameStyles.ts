import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GameContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
  padding: 2rem;
`;

export const GameGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
  max-width: 800px;
  margin: 2rem auto;
`;

export const Card = styled(motion.div)<{ isFlipped: boolean }>`
  aspect-ratio: 3/4;
  background: ${props => props.isFlipped ? 'white' : 'linear-gradient(45deg, #2196f3, #21cbf3)'};
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

export const ScoreBoard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  border-radius: 1rem;
  color: white;
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;