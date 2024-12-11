// Inline styles
const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#333',
  color: '#fff',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
}

const titleStyle: React.CSSProperties = {
  margin: 0,
}

const userContainerStyle: React.CSSProperties = {
  position: 'relative',
  cursor: 'pointer',
  marginRight: '5vw',
}

const usernameStyle: React.CSSProperties = {
  color: '#fff',
}

const dropdownStyle: React.CSSProperties = {
  position: 'absolute',
  top: '100%',
  right: 0,
  backgroundColor: '#444',
  border: '1px solid #555',
  padding: '5px',
}

const dropdownButtonStyle: React.CSSProperties = {
  background: 'none',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  padding: '5px 10px',
  width: '100%',
  textAlign: 'left',
}

const placeholderStyle: React.CSSProperties = {
  color: '#ccc',
  marginRight: '5vw',
}

export {
  headerStyle,
  titleStyle,
  userContainerStyle,
  usernameStyle,
  dropdownStyle,
  dropdownButtonStyle,
  placeholderStyle,
}
