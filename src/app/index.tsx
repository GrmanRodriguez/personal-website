import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { GlobalStyle } from './style/global-style';
import Home from './views/home';
import About from './views/about';
import Contact from './views/contact'
import Play from './views/play';
import NotFound from './views/not-found';
import NavigationBar from './components/navigation-bar';
import KalmanFilter from './views/play/kalman-filter';

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
        <About setWhiteNavbar={setWhiteNavbar} />
      </Route>
      <Route exact path="/contact">
        <Contact setWhiteNavbar={setWhiteNavbar} />
      </Route>
      <Route exact path="/play">
        <Play setWhiteNavbar={setWhiteNavbar} />
      </Route>
      <Route exact path="/play/kalman-filter">
        <KalmanFilter setWhiteNavbar={setWhiteNavbar} />
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
