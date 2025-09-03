import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabaseClient";


export const fetchRecipes = () => {
  return useQuery({
    queryKey: ["recipe"],
    queryFn: async () => {
        const {data, error} = await supabase.from('recipe').select();
        if(error){
            throw new Error(error.message);
        }
        return data
    }
  })
}

export const fetchRecipeById = (id) => {
    return useQuery({
        queryKey:["recipe"],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('recipe')
                .select()
                .eq('id', id)
            if(error){
                throw new Error(error.message);
            }
            return data
        }
    })
}