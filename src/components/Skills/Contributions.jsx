import React from 'react';

export default function CodingActivity({ githubUsername = "tanushbhootra576", leetcodeUsername = "tanushbhootra576" }) {
    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Coding Activity</h3>
                <span style={styles.badge}>Live</span>
            </div>

            <div style={styles.grid}>
                {/* GitHub Card */}
                <a
                    href={`https://github.com/${githubUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.card}
                    className="activity-card"
                >
                    <div style={styles.cardHeader}>
                        <svg height="20" width="20" viewBox="0 0 16 16" fill="white"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
                        <span style={styles.cardTitle}>GitHub Contributions</span>
                    </div>
                    <div style={styles.graphContainer}>

                        <img
                            src={`https://ghchart.rshah.org/00ff88/${githubUsername}`}
                            alt="GitHub Graph"
                            style={styles.ghImage}
                        />


                    </div>
                </a>

                {/* LeetCode Card */}
                {/* <a
                    href={`https://leetcode.com/${leetcodeUsername}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.card}
                    className="activity-card"
                >
                    <div style={styles.cardHeader}>
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFA116"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.173 5.823a1.375 1.375 0 0 0 0 1.941l5.349 5.389a1.375 1.375 0 0 0 2.434-.97V2.292c0-.757-.616-1.375-1.375-1.375h-.098zM2.128 17.251a1.673 1.673 0 0 0-1.673 1.673v2.242a1.673 1.673 0 0 0 1.673 1.673h13.352a1.673 1.673 0 0 0 1.673-1.673v-2.242a1.673 1.673 0 0 0-1.673-1.673H2.128z" /></svg>
                        <span style={styles.cardTitle}>LeetCode Stats</span>
                    </div>
                    <div style={styles.graphContainer}>
                     
                <img
                    src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Inter&ext=heatmap`}
                    alt="LeetCode Stats"
                    style={styles.lcImage}
                />
            </div>
        </a> */}
            </div >
        </div >
    );
}

const styles = {
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px'
    },
    title: {
        fontSize: '1rem',
        fontWeight: '700',
        color: '#eee',
        margin: 0
    },
    badge: {
        background: 'rgba(0, 255, 136, 0.1)',
        color: '#00ff88',
        fontSize: '0.75rem',
        padding: '2px 8px',
        borderRadius: '12px',
        fontWeight: '600',
        border: '1px solid rgba(0, 255, 136, 0.2)'
    },
    grid: {
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap', // Allows stacking on small screens
        height: '100%'
    },
    card: {
        flex: '1 1 300px', // Responsive width
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '16px',
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        minHeight: '140px'
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px'
    },
    cardTitle: {
        color: '#ccc',
        fontSize: '0.9rem',
        fontWeight: '600'
    },
    graphContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: '6px'
    },
    ghImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        opacity: 0.9
    },
    lcImage: {
        width: '100%',
        height: 'auto',
        objectFit: 'contain',
        maxWidth: '350px' // Prevents it from getting too huge
    }
};