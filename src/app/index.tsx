import React, { useState, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { GlobalStyle } from './style/global-style';
import Home from './views/home';
import NotFound from './views/not-found';
import NavigationBar from './components/navigation-bar';
import Loading from './components/loading';

const About = React.lazy(()=>import('./views/about'));
const Contact = React.lazy(()=>import('./views/contact'));
const Play = React.lazy(()=>import('./views/play'));


function App() {

  // Navbar state logic is lifted up from necessary view components
  const [whiteNavbar, setWhiteNavbar] = useState<boolean>(false);

  return (
    <BrowserRouter>
    <Helmet>
      <meta name="GermanRodriguez" content="Hi! I'm Germán. I'm a robotics engineer and developer." />
    </Helmet>
    <NavigationBar white={whiteNavbar}/>
    <Routes>
      <Route path="/" element={<Home setWhiteNavbar={setWhiteNavbar} />} />
      <Route path="/about" element={
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <About setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      }/>
      <Route path="/contact" element={
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
        <Contact setWhiteNavbar={setWhiteNavbar} />
      </Suspense>
      }/>        
      <Route path="/play/*" element={
        <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
          <Play setWhiteNavbar={setWhiteNavbar} />
        </Suspense>
      }/>
      <Route path='*' element={<NotFound setWhiteNavbar={setWhiteNavbar}></NotFound>}/>
    </Routes>
    <GlobalStyle/>
    </BrowserRouter>
  );
}

export default App;
