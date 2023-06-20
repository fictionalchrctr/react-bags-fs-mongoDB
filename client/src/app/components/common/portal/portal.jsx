import { useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ children }) => {
  const container = useMemo(() => document.createElement('div'), [])

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [container])
  return ReactDOM.createPortal(children, container)
}

export default Portal
