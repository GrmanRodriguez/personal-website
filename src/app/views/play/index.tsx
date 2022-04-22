import React, {Suspense} from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import { ToggleNavbarProps } from '../../util'
import Loading from '../../components/loading'
import PlayHome from './home'
import NotFound from '../not-found'
const KalmanFilter = React.lazy(()=>import('./kalman-filter'))
const PIDController = React.lazy(()=>import('./pid'))

function Play({setWhiteNavbar} : ToggleNavbarProps) {
    return (
        <>
            <Helmet>
                <title>Play | Germán Rodriguez</title>
            </Helmet>
            <Routes>
                <Route path="/kalman-filter" element={
                    <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
                        <KalmanFilter setWhiteNavbar={setWhiteNavbar} />
                    </Suspense>
                }/>
                <Route path="/pid" element={
                    <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
                        <PIDController setWhiteNavbar={setWhiteNavbar} />
                    </Suspense>
                }/>
                <Route path="/" element={
                    <Suspense fallback={<Loading setWhiteNavbar={setWhiteNavbar}/>}>
                        <PlayHome setWhiteNavbar={setWhiteNavbar} />
                    </Suspense>
                }/>
                <Route path='*' element={<NotFound setWhiteNavbar={setWhiteNavbar}></NotFound>}/>
            </Routes>
        </>
    )
}

export default Play