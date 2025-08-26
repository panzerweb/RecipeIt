import React, { useEffect } from 'react'
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { UserAuth } from "../context/AuthContext";
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

    // useEffect(() => {
    //     console.log(session?.user?.identities[0]?.id);
    // }, [session])

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
    <form
        onSubmit={handleSubmit}
        className="max-w-100 mx-auto p-6 shadow-lg rounded-2xl"
    >
        <h2 className="text-2xl font-bold mb-6">Add a New Recipe</h2>

        {/* Grid Layout 2x2 */}
        <div className="grid grid-cols-2 gap-6">
        {/* 🟢 Left Column */}
        <div className="space-y-6">
            {/* Basic Info */}
            <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

            <label className="block mb-2 font-semibold">Recipe Name</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
                
            />

            <label className="block mb-2 font-semibold">Description</label>
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="3"
            />
            </div>

            {/* Preparation */}
            <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Preparation</h3>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                <label className="block mb-2 font-semibold">
                    Prep Time (mins)
                </label>
                <input
                    type="number"
                    name="prep_time"
                    value={formData.prep_time}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                </div>

                <div>
                <label className="block mb-2 font-semibold">
                    Cook Time (mins)
                </label>
                <input
                    type="number"
                    name="cook_time"
                    value={formData.cook_time}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />
                </div>
            </div>

            <label className="block mb-2 font-semibold">Servings</label>
            <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />
            </div>
        </div>

        {/* 🔵 Right Column */}
        <div className="space-y-6">
            {/* Recipe Details */}
            <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Recipe Details</h3>

            <label className="block mb-2 font-semibold">Ingredients</label>
            <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
                rows="4"
                placeholder="One ingredient per line"
            />

            <label className="block mb-2 font-semibold">
                Steps / Instructions
            </label>
            <textarea
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="4"
                placeholder="Step-by-step instructions"
            />
            </div>

            {/* Classification */}
            <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Classification</h3>

            <label className="block mb-2 font-semibold">Category</label>
            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border p-2 rounded mb-4"
            >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Dessert</option>
                <option>Snack</option>
            </select>

            <label className="block mb-2 font-semibold">Difficulty</label>
            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>
            </div>

            {/* Image Upload */}
            <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Image</h3>
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
            />
            </div>
        </div>
        </div>

        {/* Submit Button Full Width */}
        <div className="mt-6">
        <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
            Submit Recipe
        </button>
        </div>
    </form>
    );


}

export default NewRecipe