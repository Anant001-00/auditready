import { supabase } from '../supabaseClient'

// LOGIN INVESTOR
export const investorLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) throw error
    return data
}

// SIGNUP INVESTOR
export const investorSignup = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) throw error

    // insert investor profile
    const { error: insertError } = await supabase
        .from('investors')
        .insert([
            {
                id: data.user.id,
                name,
                email,
            },
        ])

    if (insertError) throw insertError

    return data
}

// FETCH INVESTOR DATA FOR DASHBOARD
export const getInvestorDashboardData = async (investorId) => {
    const { data, error } = await supabase
        .from('investors')
        .select('*')
        .eq('id', investorId)
        .single()

    if (error) throw error
    return data
}
