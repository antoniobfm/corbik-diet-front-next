import React, { createContext, ReactNode, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { BroadcastChannel } from 'broadcast-channel'

import { api } from '../services/apiClient'
import { useToast } from '@/hooks/toast'
import { useLog } from '@/hooks/logs'

type User = {
	id: string;
	name: string;
	email: string;
	avatar_url: string;

	carbohydrates: string;
	proteins: string;
	fats: string;
	calories: string;

	weight: string;
	water: string;
	muscle: string;
	fat: string;
	bones: string;

	// units: IUnit[];
}

type SignInCredentials = {
  email: string
  password: string
}

type SignInWithSmsCredentials = {
  telephone: string
  code: string
}

interface SignUpCredentials {
  telephone: string
  username: string
  code: string
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>
  signUp: (credentials: SignUpCredentials) => Promise<void>
  signOut: () => void
	update: () => Promise<void>
  user: User | undefined
  isAuthenticated: boolean
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

let authChannel: BroadcastChannel

// export function signOut() {
//   destroyCookie(undefined, 'corbik.token')
//   destroyCookie(undefined, 'corbik.refreshToken')

//   authChannel.postMessage('signOut')

//   Router.push('/')
// }

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  const { addToast } = useToast()
  const router = useRouter()

  useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          setUser(null)
          signOut()
          break
        default:
          break
      }
    }
  }, [])

  useEffect(() => {
    const { 'corbik.token': token } = parseCookies()

    if (token) {
			console.log('has token')
      api
        .get('/profile')
        .then(response => {
					console.log(response.data)
					setUser(response.data.user)
          if (!response.data.email) {
            Router.push('/welcome')
          }
        })
        .catch(() => {
          setUser(null)
          signOut()
        })
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/authenticate', {
        email,
        password
      })

      const { token, refresh_token } = response.data

      api.defaults.headers.Authorization = `Bearer ${token}`

      setCookie(undefined, 'corbik.token', token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'corbik.refreshToken', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      const profileResponse = await api.get('/profile')

      setUser(response.data.user)

      if (!profileResponse.data.email) {
        Router.push('/welcome')
        return
      }
      Router.push('/diet')
    } catch (err) {
      console.log(err)
    }
  }

  async function signUp({ telephone, username, code }) {
    try {
      const response = await api.post('/users/verify-code', {
        telephone,
        username,
        code
      })

      // console.log(response.data)

      // const { user } = response.data

      // localStorage.setItem('@Qualaboa:User', JSON.stringify(user))

      // setUserProperties({ telephone: user.telephone, username: user.username })

      // setData({ user })
      router.push('/Success')
    } catch (err) {
      addToast({
        title: 'Código inválido',
        type: 'error'
      })
    }
  }

  async function update() {
    const response = await api.get('/profile')

    setUser(response.data)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        update,
        user: user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
