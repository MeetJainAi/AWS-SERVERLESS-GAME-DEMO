import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GameContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: white;
`;

export const GameCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-top: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border: none;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1.2rem;
  text-align: center;
  
  &:focus {
    outline: 2px solid #4f9cff;
  }
`;

export const Button = styled.button`
  background: linear-gradient(45deg, #4f9cff 0%, #8940ff 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 10px;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
  }
`; 