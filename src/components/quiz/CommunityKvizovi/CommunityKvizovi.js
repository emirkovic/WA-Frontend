import React, { useState, useEffect } from 'react';
import Sidebar from '../Menu/Menu';
import Toast from '../Toast/Toast';
import axios from 'axios';
import './CommunityKvizovi.css';

function CommunityQuizzes(props) {
    const [quizzes, setQuizzes] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('/api/quizzes/all-quizzes').then(res => {
            if (Array.isArray(res.data) && res.data.length > 0) {
                setQuizzes(res.data);
            }
        })
    }, [])

    const likeQuiz = async (quizId) => {
        const res = await axios.post('/api/quizzes/like-quiz', { quizId, userId: localStorage.getItem('_ID') });
        setShowToast(true);
        setMessage(res.data.message);
        if (Array.isArray(res.data) && res.data.length > 0) {
            setQuizzes(res.data);
        }
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
    }


    const takeQuiz = (quizId) => {
        props.history.push('/view-quiz?id=' + quizId);
    }

    return (
        <div className="community-quizzes-wrapper">
            <Toast model={showToast} message={message} />
                <Sidebar />
            <div className="body">
                <div className="header-top">Community Kvizevi</div>
                <div className="quizzes-wrapper">
                    {quizzes.map((quiz, idx) => (
                        <div key={idx} className="quiz-card card">
                            <img src={quiz.imgUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYTSZhA70noK1wworcCoSC9zEV5VjK3ouoqA&usqp=CAU"} alt="Community Kviz" />
                            <div className="quiz-name">{quiz.name}</div>
                            <div className="category">{quiz.category}</div>
                            <div className="questions">{quiz.questions.length} Pitanja </div>
                            <div className="take-quiz btn" onClick={() => takeQuiz(quiz._id)}> Zapocni kviz </div>

                            <div className="likes">
                                {quiz.likes}{' '}
                                <img style={{ cursor: 'pointer', padding: '5px', width: '20px', height: '20px' }} onClick={() => likeQuiz(quiz._id)} src="https://www.pngall.com/wp-content/uploads/5/Like-Button-PNG.png" alt="Community Likes" />
                            </div>
                          </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CommunityQuizzes;