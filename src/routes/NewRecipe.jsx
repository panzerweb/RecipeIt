import React, { useEffect } from 'react'
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from "../context/AuthContext";
import Alert from '@mui/material/Alert';
import { Fields } from '../components/Fields';
import { Navigate, useNavigate } from 'react-router-dom';


const NewRecipe = () => {
    const {session} = UserAuth();
    const navigate = useNavigate();

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

        let imageUrl = null;

        // ✅ Handle image upload
        if (formData.image) {
            const file = formData.image;
            const filePath = `${session?.user?.id}/${Date.now()}_${file.name}`;

            const { data: uploadData, error: uploadError } = await supabase.storage
            .from("recipe")
            .upload(filePath, file, {
                cacheControl: "3600",
                upsert: false,
            });


            if (uploadError) {
                console.error("Error uploading image:", uploadError.message);
                setFormError("Image upload failed");
                return;
            }

            if (uploadData) {
                const { data: publicData } = supabase.storage
                    .from("recipe")
                    .getPublicUrl(uploadData.path);

                    imageUrl = publicData.publicUrl;
            }
        }

        // ✅ Insert into Supabase
        const { data: insertData, error: insertError } = await supabase
            .from("recipe")
            .insert([
            {
                ...formData,
                image: imageUrl,
            },
            ]);

        if (insertError) {
            console.error("Error inserting recipe:", insertError.message);
            setFormError("Recipe creation failed");
            return;
        }

        navigate('/dashboard');
    };

    

    return (
        <>
            {
                formError &&
                <Alert severity="error" variant="filled">
                    {formError}
                </Alert>
            }

            <Fields handleSubmission={handleSubmit} handleChange={handleChange} formData={formData} />
            
        </>
    );


}

export default NewRecipe