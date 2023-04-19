import React, { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import Sidebar from '../Menu/Menu';
import './Rezultati.css';

function ViewResults(props) {
    const [result, setResult] = useState(null);
    const [quiz, setQuiz] = useState(null);

    useEffect(() => {
        if (!localStorage.getItem("_ID")) {
            props.history.push('/');
            localStorage.clear();
        } else {
            let id = qs.parse(props.location.search, { ignoreQueryPrefix: true }).id;
            if (!id) {
                props.history.push('/');
            } else {
                axios.get('/api/quizzes/results/' + id).then(res => {
                    setResult(res.data.score);
                    setQuiz(res.data.quiz);
                })
            }
        }
    }, [props.history, props.location.search])

    const getBorderLeft = idx => {
        if (result.answers[idx]) {
            return '5px green';
        } else {
            return '5px red';
        }
    }

    const getScore = () => {
        let len = result.answers.length;
        let right = result.answers.filter(ans => ans === true);
        return (100 * (right.length / len)) + '%';
    }
    
    return (
        <div className="view-results-wrapper">
            <div>
                <Sidebar/>
            </div>
            {(quiz && result) && 
                <div className="body">
                    <div className="header"> Kviz Rezultati </div>
                    <div className="quiz-data">
                        <div className="left">
                            <div className="header">{quiz.name}</div>
                            <div className="category">{quiz.category}</div>
                            <div className="comments">{quiz.comments.length} Komentari </div>
                        </div>
                        <div className="right">
                            <div className="likes">{quiz.likes} Likes</div>
                            <div className="others">{quiz.scores.length} Ljudi koji su vidjeli ovaj kviz </div>
                        </div>
                    </div>

                    <div className="score">
                       Rezultat: {getScore()}
                    </div>

                    <div className="answers"> 
                        {quiz.questions.map((q, idx) => (
                            <div key={idx} className="answer" style={{borderLeft: getBorderLeft(idx)}}>
                                <div>{q.questionName}</div>
                            </div> 
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default ViewResults;