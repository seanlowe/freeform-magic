import { FC } from 'react'

interface ComponentTypeFilterProps {
  componentType: string
  children: React.ReactNode
  visible: boolean
}

const ComponentTypeFilter: FC<ComponentTypeFilterProps> = ({ componentType, children, visible }) => {
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
      { children }
    </div>
  )
}

export default ComponentTypeFilter
