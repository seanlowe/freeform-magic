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

  return (
    <div className={`component ${filterLogic}`} onClick={toggleFilterLogic}>
      <div className='overlap-group'>
        <div className='div'>
          <p className='text-wrapper'>AND</p>
          <p className='text-wrapper'>OR</p>
        </div>
        <div className='ellipse'>
        </div>
      </div>
    </div>
  )
}

export default SearchLogicSlider