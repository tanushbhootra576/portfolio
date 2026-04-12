import React from 'react';
import { logger } from '../utils/logger';

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        logger.error('Uncaught UI error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '2rem', color: 'white' }}>
                    <h2>Something went wrong.</h2>
                    <p>Try refreshing the page. If the problem persists, please contact me.</p>
                </div>
            );
        }

        return this.props.children;
    }
}
