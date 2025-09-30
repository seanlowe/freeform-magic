import { FC } from 'react'

interface ComponentTypeFilterProps {
  componentType: string
  children: React.ReactNode
  visible: boolean
  useInnerWrapper?: boolean
}

const ComponentTypeFilter: FC<ComponentTypeFilterProps> = ({
  componentType,
  children,
  visible,
  useInnerWrapper = true
}) => {
  if ( !visible ) {
    return null
  }

  return (
    <div
      className='search-spells-form-component'
      style={{ padding: '0.5rem', marginBottom: '1rem', marginTop: '1rem' }}
    >
      <label
        style={{
          background: 'white',
          position: 'relative',
          top: '10px',
          zIndex: 1,
        }}
      >
        {componentType} Options:
      </label>
      { useInnerWrapper
        ? (
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
        : children
      }
    </div>
  )
}

export default ComponentTypeFilter
