import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'

interface Props { children: ReactNode }
interface State { hasError: boolean }
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError(): State { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Application error:', error, info) }
  render() {
    if (!this.state.hasError) return this.props.children
    return <main className="min-h-screen flex items-center justify-center p-6 text-center"><div><h1 className="text-2xl font-bold mb-3">Something went wrong</h1><p className="text-[var(--color-text-secondary)] mb-5">Please reload the page to continue.</p><Button onClick={() => window.location.reload()}>Reload</Button></div></main>
  }
}
