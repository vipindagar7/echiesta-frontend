import React from 'react'
import Events from '../components/event'
import Schedule from '../components/schedule'
import Contact from '../components/contact'
import VideoBackground from '../components/videoBg'
import StarBackground from '../components/starBackground'
import RegisterDj from '../pages/Register-Dj'
const Home = () => {
    return (
        <>

            <VideoBackground />
            <RegisterDj />
            <Events />
            <Schedule />
            <Contact />
        </>
    )
}

export default Home