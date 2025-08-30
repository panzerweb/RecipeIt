import React from 'react'
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Link } from 'react-router-dom';

const Create = () => {
  return (
    <div className='flex justify-end'>
        <Link to='/newrecipe'>
            <button className='bg-gray-900'>
                <NoteAddIcon fontSize='large' />
            </button>
        </Link>
    </div>
  )
}

export default Create;