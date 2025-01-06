import React from 'react'

interface SearchChipProps {
  text: string;
  onRemove: () => void;
}

const SearchChip: React.FC<SearchChipProps> = ({ text, onRemove }) => {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid #ccc',
        borderRadius: '16px',
        backgroundColor: '#f5f5f5',
        fontSize: '14px',
        cursor: 'default',
      }}
    >
      <span style={{ marginRight: '8px' }}>{text}</span>
      <button
        onClick={onRemove}
        style={{
          border: 'none',
          background: 'none',
          color: '#999',
          cursor: 'pointer',
          fontSize: '14px',
        }}
        aria-label='Remove'
      >
        ✖
      </button>
    </div>
  )
}

export default SearchChip
