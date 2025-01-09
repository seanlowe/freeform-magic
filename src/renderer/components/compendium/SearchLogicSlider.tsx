import { Dispatch, SetStateAction } from 'react'
import './SearchLogicSlider.css'

interface SearchLogicSliderProps {
  filterLogic: 'AND' | 'OR'
  setFilterLogic: Dispatch<SetStateAction<'AND' | 'OR'>>
}

const SearchLogicSlider: React.FC<SearchLogicSliderProps> = ({ filterLogic, setFilterLogic }) => {
  const toggleFilterLogic = () => {
    const newValue = filterLogic === 'AND' ? 'OR' : 'AND'
    setFilterLogic( newValue )
  }

  // return (
  //   <div style={{
  //     marginBottom: '1rem',
  //     position: 'relative',
  //     width: '200px',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //   }}>
  //     <div
  //       onClick={toggleFilterLogic}
  //       style={{
  //         display: 'flex',
  //         alignItems: 'center',
  //         justifyContent: 'space-between',
  //         background: '#ddd',
  //         borderRadius: '15px',
  //         padding: '0.5rem',
  //         cursor: 'pointer',
  //         position: 'relative',
  //         width: '83px',
  //         height: '10px',
  //       }}
  //     >
  //       <div
  //         style={{
  //           position: 'absolute',
  //           width: '50px',
  //           height: '100%',
  //           background: '#007bff',
  //           borderRadius: '15px',
  //           transition: 'transform 0.3s ease',
  //           transform: filterLogic === 'AND' ? 'translateX(-16%)' : 'translateX(82%)',
  //           zIndex: 0,
  //         }}
  //       >
  //       </div>
  //     </div>
  //     Searching with fitlering logic: <b>{filterLogic}</b>
  //   </div>
  // )

  return (
    <div className={`component ${filterLogic}`} onClick={toggleFilterLogic}>
      <div className='overlap-group'>
        <div className='div'>
          <p className='text-wrapper'>AND</p>
          {/* <p className='text-wrapper'>DARK<br />MODE</p> */}
          <p className='text-wrapper'>OR</p>
          {/* <p className='text-wrapper'>LIGHT<br />MODE</p> */}
        </div>
        <div className='ellipse'>
          {/* <img src={img} className='image' /> */}
        </div>
      </div>
    </div>
  )
}

export default SearchLogicSlider