import { supabase } from './supabase'

/**
 * Fetches all products from the Supabase 'products' table.
 * If the table doesn't exist yet, it returns the local data as a fallback.
 */
export const fetchProductsFromSupabase = async () => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching products from Supabase:', error.message)
        return null // Return null so we know it failed
    }
}

/**
 * Example function to fetch a single product by ID
 */
export const fetchProductById = async (id) => {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    } catch (error) {
        console.error('Error fetching product:', error.message)
        return null
    }
}
