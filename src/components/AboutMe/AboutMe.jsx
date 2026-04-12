import React from 'react';
import './AboutMe.css';

import MagicBento from './MagicBento';

const AboutMe = () => {
    return (
        <div className='abrakabararaa'>
            <MagicBento
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
            />
        </div>
    );
};

export default AboutMe;
