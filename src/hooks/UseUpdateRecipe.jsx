import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { fetchRecipeById } from './fetchRecipes';
import { UserAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

export const UseUpdateRecipe = () => {
    const {id} = useParams();
    const {session} = UserAuth();
    const navigate = useNavigate();
    const {data: recipes, isLoading, isError, error} = fetchRecipeById(id);
        
    const initialState = {
        name: "",
        description: "",
        ingredients: "",
        steps: "",
        prep_time: "",
        cook_time: "",
        servings: "",
        category: "Breakfast",
        difficulty: "Easy",
        image: null,
        user_id: session?.user?.identities[0]?.id

    }

    const [formData, setFormData] = useState(initialState);
    const [formError, setFormError] = useState(null);

    useEffect(() => {
        if (recipes) {
            setFormData((prev) => ({
                ...prev,
                ...recipes[0]
            }));
        }
    }, [recipes])


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: type === "file" ? files[0] : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            setFormError("Fill in the required fields");
            return;
        }

        let updatedData = {...formData};

        if (formData.image instanceof File) {
            const file = formData.image;
            const filePath = `${session?.user?.id}/${Date.now()}_${file.name}`;

            const {data, error} = await supabase.storage
                .from('recipe')
                .upload(filePath, formData.image);

            if (error) {
                setFormError("Image Upload Failed");
                return;
            }
            if (data) {
                const {data} = supabase.storage
                    .from('recipe')
                    .getPublicUrl(filePath);
                
                updatedData.image = data.publicUrl
            }

            // Finally update
            const { data: dataUpdated, error: dataError } = await supabase
                .from('recipe')
                .update(updatedData)
                .eq('id', id)

            if(dataError){
                setFormError("Error occured: ", dataError.message)
            }

            navigate('/profile')
        }
    }

    return {
        formData, formError, handleChange, handleSubmit, isLoading, isError, error
    }
}

export const LikedPost = () => {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        console.log(!isLiked);
        setIsLiked(!isLiked);
    }

    return {
        isLiked, handleLike
    }
}