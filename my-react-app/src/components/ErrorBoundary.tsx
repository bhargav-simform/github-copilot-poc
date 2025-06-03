import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
    error?: Error
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div role="alert" style={{
                    padding: '20px',
                    margin: '20px',
                    border: '1px solid #ff0000',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(255,0,0,0.1)'
                }}>
                    <h2>Something went wrong</h2>
                    <p>An error occurred in the application. Please try refreshing the page.</p>
                    {process.env.NODE_ENV === 'development' && (
                        <pre style={{ 
                            whiteSpace: 'pre-wrap',
                            marginTop: '10px',
                            padding: '10px',
                            backgroundColor: 'rgba(0,0,0,0.1)'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                    )}
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
