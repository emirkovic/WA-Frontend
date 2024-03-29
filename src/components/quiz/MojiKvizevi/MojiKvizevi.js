import React, { useEffect, useState } from 'react';
import Sidebar from '../Menu/Menu';
import axios from 'axios';
import './MojiKvizevi.css';

function MyQuizzes(props) {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        axios.get('/api/quizzes/my-quizzes/' + localStorage.getItem('_ID'))
            .then(res => {
                setQuizzes(res.data);
            });
    }, [])

    function takeQuiz(quizId) {
        props.history.push('/view-quiz?id=' + quizId);
    }

    return (
        <div className="my-quizzes-wrapper">
                <Sidebar />
            <div className="body">
                <div className="header-top">Moji Kvizevi</div>
                <div className="quizzes-wrapper">
                    {quizzes.map((quiz, idx) => (
                        <div key={idx} className="quiz-card card">
                            <img src={quiz.imgUrl || "https://png.pngtree.com/png-clipart/20220910/original/pngtree-quiz-time-png-image_8530811.png"} alt="" />
                            <div className="quiz-name">{quiz.name}</div>
                            <div className="category">{quiz.category}</div>
                            <div className="questions">{quiz.questions.length} Pitanja</div>
                            <div className="take-quiz btn" onClick={() => takeQuiz(quiz._id)}>Odradi Kviz</div>
                            <div className="top-section">                                
                                <div className="likes" img style={{  padding: '5px', width: '20px', height: '20px' }}>{quiz.likes} <img src="https://www.pngall.com/wp-content/uploads/5/Like-Button-PNG.png" alt="Likes" /></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MyQuizzes;