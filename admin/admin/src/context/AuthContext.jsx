/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useCallback } from 'react'
import { authService } from '../services/authService'

export const AuthContext = createContext()

const initialState = {
  user: null,
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || sessionStorage.getItem('isLoggedIn') === 'true',
  isLoading: false,
  error: null,
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isLoading: false,
        error: null,
      }
    case 'LOGIN_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = useCallback(async (email, password, rememberMe) => {
    dispatch({ type: 'LOGIN_START' })

    try {
      const response = await authService.login(email, password, rememberMe)
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.user })
      return true
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error.message || 'Login failed' })
      return false
    }
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    dispatch({ type: 'LOGOUT' })
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const value = {
    ...state,
    login,
    logout,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}