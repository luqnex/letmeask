import { useContext } from 'react'
import { AuthContext } from '../constexts/AuthContext'

export function useAuth() {
    const value = useContext(AuthContext)

    return value
}