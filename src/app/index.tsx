import React, { useState } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { GlobalStyle } from './style/global-style';
import Home from './views/home';
import About from './views/about';
import Contact from './views/contact'
import NotFound from './views/not-found';
import NavigationBar from './components/navigation-bar';

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
      <Route component={NotFound} />
    </Switch>
    <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
