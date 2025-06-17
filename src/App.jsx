import React from 'react'
import Footer from './components/Footer/Footer'
import { LandingCmp1 } from './components/Landing/LandingCmp1'
import Compo from './components/RotatingText/Compo'
import AboutMe from './components/AboutMe/AboutMe'
import CurtainAnimation from './components/CurtainAnimation'
import SkillsProgress from './components/Skills/SkillsProgress'
import Projects3DSection from './components/projects/Projects3DSection'
import CustomCursor from './components/CustomCursor/CustomCursor'
import ScrollVelocity from './components/CustomCompo/ScrollVelocity';
import Timeline from './components/timeline/TimeLine'
import Certification from './components/Certification/Certification'
const App = () => {
  return (
    <>
      <Compo />
      <CustomCursor />
      <LandingCmp1 />
      <CurtainAnimation triggerId="about-section">
        <AboutMe />
      </CurtainAnimation >
      <SkillsProgress />
      <Certification />
      <Projects3DSection />
      <ScrollVelocity
        texts={["Engineer by Degree, Developer by Passion | ", "From Code to Creation | ", "Turning ideas into code | ", "Building the future | ", "Innovating through code | "]}
        velocity={150}
        className="custom-scroll-text"
      />
      <Timeline />
      <Footer />
    </>
  )
}

export default App