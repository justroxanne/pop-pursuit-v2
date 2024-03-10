import React, { useState, useEffect, useContext } from 'react';
import { QuizContext } from '../../contexts/QuizContext';
import './endGame.css';

const EndGame = () => {
  const { score, questions } = useContext(QuizContext);

  const [message, setMessage] = useState(null);
  const [color, setColor] = useState(null);

  useEffect(() => {
    if (score === 0) {
      setMessage('Tu as vraiment essayé ?');
      setColor('red');
    } else if (score < questions.length / 2.5) {
      setMessage('Tu peux mieux faire !');
      setColor('pink');
    } else if (
      score < questions.length / 1.25 &&
      score >= questions.length / 2.5
    ) {
      setMessage('Pas mal !');
      setColor('orange');
    } else if (score > questions.length / 1.25 && score < questions.length) {
      setMessage('On frôle la perfection !');
      setColor('cyan');
    } else if (score === questions.length) {
      setMessage('Génie de la pop culture !');
      setColor('var(--green)');
    }
  }, []);

  return (
    <div className='end-game-container'>
      <div className='end-game' style={{ border: `5px solid ${color}` }}>
        <span className='final-message'>{message}</span>
        <span className='final-score'>
          Ton score:
          <span style={{ color: `${color}`, fontSize: '2em' }}>
            {score}/{questions.length}
          </span>
        </span>
        <button className='replay-btn' onClick={() => window.location.reload()}>
          Try again
        </button>
      </div>
    </div>
  );
};

export default EndGame;
