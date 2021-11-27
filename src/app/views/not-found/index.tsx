import React from 'react';
import { useEffect } from 'react';
import Helmet from 'react-helmet';
import { ToggleNavbarProps } from '../../util';

function NotFound( {setWhiteNavbar} : ToggleNavbarProps ) {

  useEffect(()=>{
    setWhiteNavbar(false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <Helmet>
      <title>Not found | Germán Rodriguez</title>
    </Helmet>
    <div> 404 </div>
    </>
  );
}
  
export default NotFound;