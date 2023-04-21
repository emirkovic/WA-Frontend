import React, { useState } from 'react';
import Sidebar from '../Menu/Menu';
import Dialog from '../Dialog/Dialog';
import Toast from '../Toast/Toast';
import axios from 'axios';
import './KreirajKviz.css';

function CreateQuiz() {
     const [categories] = useState(['Math', 'Science', 'Technology', 'Sports', 'History', 'Misc']);
     const [categoryVal, setCategoryVal] = useState('Math');
     const [mustBeSignedIn, setMustBeSignedIn] = useState(false);
     const [questions, setQuestions] = useState([]);
     const [name, setName] = useState('');
     const [addQuestion, setAddQuestion] = useState(false);
     const [questionName, setQuestionName] = useState('');
     const [answers, setAnswers] = useState([]);
     const [correctAnswer, setCorrectAnswer] = useState('');
     const [showToast, setShowToast] = useState(false);
     const [imgUrl, setImgUrl] = useState('');

function selectPrivate(e) {
     if (e.target.checked === true) {
       setMustBeSignedIn(e.target.checked);
    } else {
       setMustBeSignedIn(false);
    }
  }

function addAnswer() {
     setAnswers([...answers, '']);
  }

function updateAnswer(e, i) {
     let newArr = Object.assign([], answers);
     newArr[i] = e.target.value;
     setAnswers(newArr);
  }

function saveQuestion() {
     let question = {
       answers: answers,
       correctAnswer: correctAnswer,
       questionName: questionName
     };
     setQuestions([...questions, question]);
     setAddQuestion(false);
     setQuestionName('');
     setAnswers([]);
     setCorrectAnswer('');
  }

function removeQuestion(question) {
     setQuestions(questions.filter(ques => ques.questionName !== question.questionName));
  }

function saveQuiz() {
     let quiz = {
       mustBeSignedIn: mustBeSignedIn,
       name: name,
       questions: questions,
       category: categoryVal,
       imgUrl: imgUrl
     };
     axios.post('/api/quizzes/create', { quiz, createdBy: localStorage.getItem('_ID') })
       .then(res => {
         if (res.data.success) {
           setQuestions([]);
           setAnswers([]);
           setCategoryVal('Math');
           setShowToast(true);
           setTimeout(() => {
           setShowToast(false);
           }, 3000);
         }
       }).catch(er => {
         console.error(er);
       });
  }

  return (
    <div className="create-quiz-wrapper">
      <Toast model={showToast} message="Kviz Created" />
        <Sidebar />
      <div className="main">
        <div className="header">Napravi Kviz</div>
        <div className="form card">
          <input className="input" onChange={e => setName(e.target.value)} value={name} placeholder="Ime Kviza" />
          <br></br>
          <input className="input" onChange={e => setImgUrl(e.target.value)} value={imgUrl} placeholder="Img url" />
          <br></br>
          <select value={categoryVal} onChange={e => setCategoryVal(e.target.value)} className="input select" placeholder="Category">
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <div className="checkbox">
                <span>Mora biti logiran </span>
                <input checked={mustBeSignedIn} onChange={selectPrivate} type="checkbox" placeholder="Mora biti logiran" />
            </div>
            {questions.map((ques, idx) => (
                <div className="question" key={idx}>
                    <div>{ques.questionName}</div>
                    <div>Tocan odgovor: {ques.correctAnswer}</div>
                    <div>Broj odgovora: {ques.answers.length}</div>
                    <span className="btn delete" onClick={() => removeQuestion(ques)}>Delete</span>
                </div>
            ))}

      <div className="questions">
        <div className="add-question" onClick={() => setAddQuestion(true)}> Dodaj pitanje </div>
      </div>

      <span onClick={() => saveQuiz()} className="btn save-quiz"> Save Kviz </span>

      <Dialog model={addQuestion}>
        <div className="new-question-form">
          <input className="input" placeholder="Pitanje" value={questionName} onChange={(e) => setQuestionName(e.target.value)} />
          <div>Odgovor</div>
          {answers.map((ans, idx) => (
            <div className="answer-form" key={idx}>
              <input type="radio" value={ans} onChange={(e) => setCorrectAnswer(ans)} name="answer"/>{' '} <input className="input" type="text" placeholder="Odgovor" value={answers[idx]} onChange={(e) => updateAnswer(e, idx)} />
            </div>
          ))}
          <div className="add-answer" onClick={addAnswer}> Dodaj odgovor </div>
          <div className="btn-wrapper">
            <div className="btn" onClick={() => setAddQuestion(false)}> Close </div>
            <div className="btn" onClick={saveQuestion}> Save </div>
                      </div>
                   </div>
                </Dialog>
             </div>
         </div>
      </div>
    )
}

export default CreateQuiz;