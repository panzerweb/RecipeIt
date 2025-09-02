import React, {useEffect, useState} from 'react'
import { UpdateFields } from './Fields';
import { UseUpdateRecipe } from '../hooks/UseUpdateRecipe';

export const UpdateRecipe = () => {
    const { formData, formError, handleChange, handleSubmit, isLoading, isError, error} = UseUpdateRecipe();

    if (isLoading) return <div className="text-gray-400 text-center mt-10">Loading recipe...</div>;
    if (isError) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;

    return (
        <div>
            <UpdateFields handleSubmission={handleSubmit} handleChange={handleChange} recipe={formData} />
        </div>
        
    )
}
