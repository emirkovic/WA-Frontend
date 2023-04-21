import React, { useState, useEffect, useCallback } from 'react';
import qs from 'qs';
import axios from 'axios';
import './ViewKviz.css';

function ViewQuiz(props) {
    const [id, setId] = useState('');
    const [quiz, setQuiz] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [inputVal, setInputVal] = useState('');

    const checkAuth = useCallback(() => {
        if (quiz.mustBeSigned && localStorage.getItem('JWT_PAYLOAD') && localStorage.getItem('_ID')) {
            setIsAuthenticated(true);
        } else if (quiz.mustBeSigned) {
            setIsAuthenticated(false);
        }
    }, [quiz])

    const refreshQuiz = useCallback(() => {
        axios.get('/api/quizzes/get-quiz/' + qs.parse(props.location.search, { ignoreQueryPrefix: true }).id).then(res => {
            if (res.data) {
                setIsLoading(false);
                setQuiz(res.data.quiz);
                checkAuth();
            }
        }).catch(er => {
            console.log(er);
        })
    }, [props.location.search, checkAuth])

    const startQuiz = () => {
        props.history.push({ 
            pathname: "/take-quiz/" + id,
            state: {
                quiz: quiz
            }
        })
    }

    const addComment = () => {
        if (!inputVal.length) return;
        axios.post('/api/quizzes/add-comment', {quizId: id, message: inputVal, sentFromId: localStorage.getItem('_ID')}).then(res => {
            if (res.data) {
                refreshQuiz();
                setInputVal('');
            }
        }).catch(er => {
            console.log(er);
        })
    }

    useEffect(() => {
        const id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
        setId(id);
        refreshQuiz();
    }, [props.location.search, refreshQuiz])

    return !isLoading ? (
        <div className="view-quiz">
            {!isAuthenticated ? (
              <div className="not-auth">Moras se logirat za igrat</div>
            ) : (
              <div className="content">
                <div className="header">{quiz.name}</div>
                <div className="body">
                  <div className="left">
                    <div className="description">{quiz.description}</div>
                    <div className="comments">
                      {quiz.comments.map((com, idx) => (
                        <div className="comment" key={idx}>                        
                          <div>{com.message}</div>
                          <div>{com.sentFromName}</div>
                        </div>
                      ))}
                      <div className="input-field">
                        <input
                          value={inputVal}
                          onChange={(e) => setInputVal(e.target.value)}
                          type="text"
                          placeholder="Add a new comment"
                        />
                        <button onClick={addComment}>Posalji</button>
                      </div>
                    </div>
                  </div>
                  <div className="right">
                    <div className="questions-num">
                      {quiz.questions.length} Pitanja
                    </div>
                    <div
                      className={
                        quiz.createdBy === localStorage.getItem("_ID")
                          ? "questions-wrapper"
                          : "questions-wrapper no-scroll"
                      }
                    >
                      {quiz.questions.map((question, idx) => (
                        <div className="question" key={idx}>
                          <div>
                            {quiz.createdBy === localStorage.getItem("_ID")
                              ? question.questionName
                              : "question name"}
                          </div>
                          <div>
                            {quiz.createdBy === localStorage.getItem("_ID")
                              ? question.correctAnswer
                              : "answer"}
                          </div>
                        </div>
                      ))}
                      {quiz.createdBy !== localStorage.getItem("_ID") ? (
                        <div className="hidden">
                          <div>Moras biti admin za vidit kviz</div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="footer">
                  <div className="buttons-wrapper">
                    <button onClick={() => props.history.goBack()}>Natrag</button>
                    <button onClick={startQuiz}>Igraj Kviz</button>
                  </div>
                </div>
              </div>
            )}
        </div>
   ) : <h2>Loading</h2>
}

export default ViewQuiz;