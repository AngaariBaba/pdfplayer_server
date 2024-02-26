import React, { useState } from 'react';
import Loader from './loader.js'
import WelcomeBox from './components/WelcomeBox.js';
import buttonstyle from './components/Button.module.css'
import CardComponent from './components/cardcomponent.js';
import AI from './components/AI.js';



const Display = ({ answers, loading }) => {
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
           <CardComponent question={answer}/>
          ))}
        </div>
      )}
      {!loading && answers.length === 0 && <h1 style={noAnswersStyle}>No questions available.</h1>}
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

        const response = await fetch('https://resurai2-51dl.onrender.com/upload', {
          method: 'POST',
          body: formData,
        });

        const responseData = await response.json();
        console.log('File uploaded successfully:', responseData);
        setAnswers(responseData.questions || []); // Assuming the response has a "questions" field
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
        <label htmlFor="pdfFile" className={buttonstyle.button}>Choose a PDF file:</label>
        <input type="file" id="pdfFile" accept=".pdf" style={{display: 'none'}} />
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
  backgroundColor : 'black'
};

const uploadHeaderStyle = {
  fontSize: '24px',
  color: '#333',
};

const uploadFormStyle = {
  marginTop: '10px',
  height: '100%'
};

const fileLabelStyle = {
  display: 'block',
  marginTop: '10px',
  fontSize: '16px',
  color: '#555',
};

const fileInputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const uploadButtonStyle = {
  marginTop: '10px',
  padding: '10px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};



const displayContainerStyle = {

  position: 'relative',
};

const loadingStyle = {
  color: '#4CAF50',
  fontSize: '18px',
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



export default Home;
