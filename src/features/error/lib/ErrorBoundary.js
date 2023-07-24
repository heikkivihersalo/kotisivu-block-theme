import { __ } from "@wordpress/i18n";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: false };
    }

    static getDerivedStateFromError(error) {
        return { error: error };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
    }

    render() {
        if (this.state.error) {
            // Create a custom fallback UI here
            return (
                <div>{__('Error occurred', 'kotisivu-block-theme')}</div>
            );
        }

        return this.props.children;
    }
}

export { ErrorBoundary };