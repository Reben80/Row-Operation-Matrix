'use client';

import React, { useState, useEffect } from 'react';
import './App.css';
import Matrix from './Matrix';
import { generateRandomMatrix, applyRandomRowOperation, generateOptions } from './utils';

type Tab = 'game' | 'instructions';

const App: React.FC = () => {
  const [matrixA, setMatrixA] = useState<number[][]>(generateRandomMatrix());
  const [matrixB, setMatrixB] = useState<number[][]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('Choose an operation to transform Matrix A to Matrix B');
  const [score, setScore] = useState<{ correct: number, incorrect: number }>({ correct: 0, incorrect: 0 });
  const [activeTab, setActiveTab] = useState<Tab>('game');

  useEffect(() => {
    generateNewChallenge();
  }, []);

  const generateNewChallenge = () => {
    const newMatrixA = generateRandomMatrix();
    const { newMatrix, operation } = applyRandomRowOperation(newMatrixA);
    setMatrixA(newMatrixA);
    setMatrixB(newMatrix);
    const newOptions = generateOptions(operation);
    setOptions(newOptions);
    setCorrectOption(operation);
    setFeedback('Choose an operation to transform Matrix A to Matrix B');
  };

  const handleOptionClick = (option: string) => {
    if (option === correctOption) {
      setFeedback('Correct!');
      setScore(prevScore => ({ ...prevScore, correct: prevScore.correct + 1 }));
    } else {
      setFeedback(`Incorrect. The correct answer was: ${correctOption}`);
      setScore(prevScore => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Matrix <span className="highlight">Mastery</span></h1>
        <h2>Elementary Row Operations Challenge</h2>
      </header>
      <div className="tab-container">
        <button 
          className={`tab ${activeTab === 'game' ? 'active' : ''}`} 
          onClick={() => setActiveTab('game')}
        >
          Game
        </button>
        <button 
          className={`tab ${activeTab === 'instructions' ? 'active' : ''}`} 
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </button>
      </div>
      {activeTab === 'instructions' && (
        <div className="info-section">
          <h3>Row Operations of Matrices</h3>
          <p>Elementary row operations are used to simplify matrices and solve systems of linear equations. The three types of operations are:</p>
          <ol>
            <li>
              <strong>Swapping two rows:</strong> R<sub>i</sub> ↔ R<sub>j</sub>
              <p>Example: R<sub>1</sub> ↔ R<sub>2</sub> swaps the first and second rows</p>
              <div className="example-matrix">
                <Matrix data={[[1, 2, 3], [4, 5, 6], [7, 8, 9]]} />
                <div className="operation-arrow">
                  <span className="operation-text">R<sub>1</sub> ↔ R<sub>2</sub></span>
                </div>
                <Matrix data={[[4, 5, 6], [1, 2, 3], [7, 8, 9]]} />
              </div>
            </li>
            <li>
              <strong>Multiplying a row by a non-zero scalar:</strong> R<sub>i</sub> → cR<sub>i</sub>
              <p>Example: R<sub>2</sub> → 2R<sub>2</sub> multiplies the second row by 2</p>
              <div className="example-matrix">
                <Matrix data={[[1, 2, 3], [4, 5, 6], [7, 8, 9]]} />
                <div className="operation-arrow">
                  <span className="operation-text">R<sub>2</sub> → 2R<sub>2</sub></span>
                </div>
                <Matrix data={[[1, 2, 3], [8, 10, 12], [7, 8, 9]]} />
              </div>
            </li>
            <li>
              <strong>Adding a multiple of one row to another row:</strong> R<sub>i</sub> → R<sub>i</sub> + cR<sub>j</sub>
              <p>Example: R<sub>3</sub> → R<sub>3</sub> + 2R<sub>1</sub> adds twice the first row to the third row</p>
              <div className="example-matrix">
                <Matrix data={[[1, 2, 3], [4, 5, 6], [7, 8, 9]]} />
                <div className="operation-arrow">
                  <span className="operation-text">R<sub>3</sub> → R<sub>3</sub> + 2R<sub>1</sub></span>
                </div>
                <Matrix data={[[1, 2, 3], [4, 5, 6], [9, 12, 15]]} />
              </div>
            </li>
          </ol>
          <p>In this game, you'll be presented with two matrices (A and B) and asked to identify which operation transforms A into B.</p>
        </div>
      )}
      {activeTab === 'game' && (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            fontSize: '18px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Correct:</span>
              <span style={{
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: '#4CAF50',
                color: 'white'
              }}>{score.correct}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '5px' }}>Incorrect:</span>
              <span style={{
                fontWeight: 'bold',
                padding: '5px 10px',
                borderRadius: '5px',
                backgroundColor: '#F44336',
                color: 'white'
              }}>{score.incorrect}</span>
            </div>
          </div>
          <div className="matrices">
            <div>
              <h2>Matrix A</h2>
              <Matrix data={matrixA} />
            </div>
            <div>
              <h2>Matrix B</h2>
              <Matrix data={matrixB} />
            </div>
          </div>
          <div className="options">
            {options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(option)}>
                {option}
              </button>
            ))}
            <button className="new-challenge" onClick={generateNewChallenge}>New Challenge</button>
            <div className="feedback">{feedback}</div>
          </div>
        </>
      )}
      <footer>
        <div className="footer-content">
          <span>Created by Rebin</span>
          <a href="https://twitter.com/rebin3" target="_blank" rel="noopener noreferrer">@rebin3</a>
          <a href="https://rebinmuhammad.com" target="_blank" rel="noopener noreferrer">rebinmuhammad.com</a>
        </div>
      </footer>
    </div>
  );
}

export default App;