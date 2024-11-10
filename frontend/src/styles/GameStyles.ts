import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GameContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #0f172a, #1e1b4b);
  padding: 2rem;
`;

export const GameGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 2rem auto;
`;

export const Card = styled(motion.div)<{ isFlipped: boolean }>`
  aspect-ratio: 3/4;
  background: ${props => props.isFlipped 
    ? 'linear-gradient(135deg, #6366f1, #a855f7)' 
    : 'linear-gradient(135deg, #1e293b, #0f172a)'};
  border-radius: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  perspective: 1000px;
  transform-style: preserve-3d;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

  &:hover {
    transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0) translateY(-5px)'};
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

export const ScoreBoard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;