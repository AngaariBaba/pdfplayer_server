import React, { useState, useEffect } from 'react';
import Loader from './loader.js';
import WelcomeBox from './components/WelcomeBox.js';
import buttonstyle from './components/Button.module.css';
import AI from './components/AI.js';

const Display = ({ answers, loading }) => {
  const [playingIndex, setPlayingIndex] = useState(null);

  useEffect(() => {
    if (answers.length > 0) {
      // Play the first answer automatically when the component mounts
      setPlayingIndex(0);
    }
  }, [answers]);

  useEffect(() => {
    if (playingIndex !== null) {
      const utterance = new SpeechSynthesisUtterance(answers[playingIndex]);
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        // Move to the next answer when the current one ends
        if (playingIndex < answers.length - 1) {
          setPlayingIndex(playingIndex + 1);
        } else {
          // Reset to the beginning when all answers have been played
          setPlayingIndex(0);
        }
      };
    }
  }, [playingIndex, answers]);

  return (
    <>
      <div>
        <style jsx global>{`
          body {
            margin: 0px;
            padding: 0px;
          }
        `}</style>
      </div>
      <div style={displayContainerStyle}>
        {loading && <Loader />}
        {!loading && answers.length > 0 && (
          <div>
            <h1 style={questionsHeaderStyle}>Questions:</h1>
            {answers.map((answer, index) => (
              <div key={index}>
                <p style={questionItemStyle}>{answer}</p>
              </div>
            ))}
          </div>
        )}
        {!loading && answers.length === 0 && (
          <h1 style={noAnswersStyle}>No questions available.</h1>
        )}
      </div>
    </>
  );
};

const Home = () => {
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const uploadPDF = async () => {
    setIsLoading(true);
    const fileInput = document.getElementById('pdfFile');
    const file = fileInput.files[0];

    if (file) {
      try {
        const formData = new FormData();
        formData.append('pdfFile', file);

        const response = await fetch('http://localhost:3002/upload', {
          method: 'POST',
          body: formData,
        });

        const responseData = await response.json();
        console.log('File uploaded successfully:', responseData);
        setAnswers(responseData.questions || []);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error('No file selected');
      setIsLoading(false);
    }
  };

  return (
    <div style={homeContainerStyle}>
      <WelcomeBox />
      <form id="pdfForm" encType="multipart/form-data" style={uploadFormStyle}>
        <label htmlFor="pdfFile" className={buttonstyle.button}>
          Choose a PDF file:
        </label>
        <input type="file" id="pdfFile" accept=".pdf" style={{ display: 'none' }} />
        <button type="button" onClick={uploadPDF} className={buttonstyle.button}>
          Submit
        </button>
      </form>

      <Display answers={answers} loading={isLoading} />
    </div>
  );
};

// Internal CSS styles
const homeContainerStyle = {
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif',
  backgroundColor: 'black',
};

const displayContainerStyle = {
  position: 'relative',
};

const questionsHeaderStyle = {
  fontSize: '20px',
  color: '#333',
};

const questionItemStyle = {
  fontSize: '16px',
  color: '#555',
  marginBottom: '5px',
};

const noAnswersStyle = {
  fontSize: '18px',
  color: 'red',
};

const uploadFormStyle = {
  marginTop: '10px',
  height: '100%',
};

export default Home;
