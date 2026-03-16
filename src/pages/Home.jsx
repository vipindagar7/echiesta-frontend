import React from 'react'
import Events from '../components/event'
import Schedule from '../components/schedule'
import Contact from '../components/contact'
import VideoBackground from '../components/videoBg'
import StarBackground from '../components/starBackground'
import HeroSection from '../components/hero-section'
const Home = () => {
    return (
        <>

            <VideoBackground />
            <HeroSection />
            <Events />
            <Schedule />
            <Contact />
        </>
    )
}

export default Home