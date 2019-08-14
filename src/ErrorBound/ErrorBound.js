import React from 'react';

class ErrorBound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true}
    }
    

    render () {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>We're sorry, something went wrong</h1>
                    <p>Please refresh the page and try again.</p>
                </div>
    
            );
        }
        return this.props.children
        
    }
}

export default ErrorBound