import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import './GithubGraph.css';

const GithubGraph = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 640px)');
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener('change', update);
        return () => media.removeEventListener('change', update);
    }, []);

    return (
        <div className="github-graph-card">
            <h2 className="github-graph-title">Days I Code</h2>
            <div className="github-graph-scroll">
                <GitHubCalendar
                    username="tanushbhootra576"
                    colorScheme="dark"
                    blockSize={isMobile ? 10 : 13}
                    blockMargin={isMobile ? 3 : 4}
                    fontSize={isMobile ? 10 : 12}
                    theme={{
                        dark: ['#121a26', '#174a31', '#1f8f4a', '#23c55e', '#66ff99']
                    }}
                />
            </div>
        </div>
    );
};

export default GithubGraph;