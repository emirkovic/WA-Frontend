import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import store from '../src/components/store/index';
import axios from 'axios';

const Auth = lazy(() => import('./components/quiz/Auth'));
const Dashboard = lazy(() => import('./components/quiz/Dashboard/Dashboard'));
const KreirajKviz = lazy(() => import('./components/quiz/KreirajKviz/KreirajKviz'));
const MojiKvizevi = lazy(() => import('./components/quiz/MojiKvizevi/MojiKvizevi'));
const CommunityKvizovi = lazy(() => import('./components/quiz/CommunityKvizovi/CommunityKvizovi'));
const TakeKviz = lazy(() => import('./components/quiz/TakeKviz/TakeKviz'));
const ViewKviz = lazy(() => import('./components/quiz/ViewKviz/ViewKviz'));
const Rezultati = lazy(() => import('./components/quiz/Rezultati/Rezultati'));
const Profil = lazy(() => import('./components/quiz/Profil/Profil'));

function App() {
  useEffect(() => {
    const userId = localStorage.getItem('_ID');
    if (userId) {
      axios.get(`/api/users/${userId}`).then(res => {
        store.dispatch({
          user: res.data.user,
          type: 'set_user'
        });
      }).catch(er => {
        console.log(er);
      });
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Auth} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/create-quiz" component={KreirajKviz} />
            <Route path="/my-quizzes" component={MojiKvizevi} />
            <Route path="/community-quizzes" component={CommunityKvizovi} />
            <Route path="/view-quiz" component={ViewKviz} />
            <Route path="/take-quiz" component={TakeKviz} />
            <Route path="/view-results" component={Rezultati} />
            <Route path="/account" component={Profil} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;