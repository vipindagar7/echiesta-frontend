import React from 'react'
import Schedule from '../components/schedule'
import Contact from '../components/contact'
import VideoBackground from '../components/videoBg'
import RegisterDj from './Register-Dj'
import Sponsor from '../components/sponsor'
import EventPoster from '../components/eventPoster'
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