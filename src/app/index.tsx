import React, { useState, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { GlobalStyle } from './style/global-style';
import Home from './views/home';
import NotFound from './views/not-found';
import NavigationBar from './components/navigation-bar';
import Loading from './components/loading';

const About = React.lazy(()=>import('./views/about'));
const Contact = React.lazy(()=>import('./views/contact'));
const Play = React.lazy(()=>import('./views/play'));
const KalmanFilter = React.lazy(()=>import('./views/play/kalman-filter'));
const PIDController = React.lazy(()=>import('./views/play/pid'));


function App() {

  // Navbar state logic is lifted up from necessary view components
  const [whiteNavbar, setWhiteNavbar] = useState<boolean>(false);

  return (
    <BrowserRouter>
    <Helmet>
      <meta name="GermanRodriguez" content="Hi! I'm Germán. I'm a robotics engineer and developer." />
    </Helmet>
    <NavigationBar white={whiteNavbar}/>
    <Switch>
      <Route exact path="/" >
        <Home setWhiteNavbar={setWhiteNavbar} />
      </Route>
      <Route exact path="/about">
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <About setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      </Route>
      <Route exact path="/contact">
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <Contact setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      </Route>
      <Route exact path="/play">
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <Play setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      </Route>
      <Route exact path="/play/kalman-filter">
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <KalmanFilter setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      </Route>
      <Route exact path="/play/pid">
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <PIDController setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      </Route>
      <Route>
        <NotFound setWhiteNavbar={setWhiteNavbar}></NotFound>
      </Route>
    </Switch>
    <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
