import { FC } from "react"

interface ComponentTypeFilterInnerWrapperProps {
  children: React.ReactNode
}

const ComponentTypeFilterInnerWrapper: FC<ComponentTypeFilterInnerWrapperProps> = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '1rem',
        width: '300px',
        borderRadius: '8px',
        position: 'relative',
      }}
    >
      { children }
    </div>
  )
}

export default ComponentTypeFilterInnerWrapper
