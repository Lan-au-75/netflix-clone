import { async } from '@firebase/util'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logOut: () => Promise<void>
    error: string | null
    loading: boolean
}

const AuthContext = createContext<IAuth>({
    user: null,
    signUp: async () => {},
    signIn: async () => {},
    logOut: async () => {},
    error: null,
    loading: false,
})

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const router = useRouter()
    const [error, setError] = useState(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [initialLoading, setInitialLoading] = useState(true)

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged in...
                    setUser(user)
                    setLoading(false)
                } else {
                    // Not logged in...
                    setUser(null)
                    setLoading(true)
                    router.push('/login')
                }

                setInitialLoading(false)
            }),
        [auth]
    )

    const signUp = async (email: string, password: string) => {
        setLoading(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user)
                router.push('/')
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const signIn = async (email: string, password: string) => {
        setLoading(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setUser(userCredential.user)
                router.push('/')
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const logOut = async () => {
        setLoading(true)

        signOut(auth)
            .then(() => {
                setUser(null)
            })
            .catch((error) => alert(error.message))
            .finally(() => setLoading(false))
    }

    const memoedValue = useMemo(
        () => ({ user, signUp, signIn, error, loading, logOut }),
        [user, loading, error]
    )

    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext)
}
