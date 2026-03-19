import React from 'react'
import Events from '../components/event'
import Schedule from '../components/schedule'
import Contact from '../components/contact'
import VideoBackground from '../components/videoBg'
import StarBackground from '../components/starBackground'
import RegisterDj from '../pages/Register-Dj'
import Sponsor from '../components/sponsor'
import EventPoster from '../components/eventPOster'
const Home = () => {
    return (
        <>
            <VideoBackground />
            <RegisterDj />
            <EventPoster />
            <Schedule />
            <Sponsor/>
            <Contact />
        </>
    )
}

export default Home