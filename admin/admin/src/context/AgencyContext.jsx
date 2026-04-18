/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useCallback, useEffect } from 'react'
import { agenciesService } from '../services/agenciesService'
import { useAuth } from '../hooks/useAuth'

export const AgencyContext = createContext()

const initialState = {
  agencies: [],
  isLoading: false,
  error: null,
}

const agencyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null }

    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload }

    case 'INIT_AGENCIES':
      return { ...state, agencies: action.payload, isLoading: false, error: null }

    case 'ADD_AGENCY':
      return {
        ...state,
        agencies: [...state.agencies, action.payload],
        isLoading: false,
        error: null,
      }

    case 'UPDATE_AGENCY':
      return {
        ...state,
        agencies: state.agencies.map(a =>
          a.id === action.payload.id ? action.payload : a
        ),
        isLoading: false,
        error: null,
      }

    case 'DELETE_AGENCY':
      return {
        ...state,
        agencies: state.agencies.filter(a => a.id !== action.payload),
        isLoading: false,
        error: null,
      }

    case 'TOGGLE_STATUS':
      return {
        ...state,
        agencies: state.agencies.map(a =>
          a.id === action.payload.id
            ? {
              ...a,
              status: action.payload.status,
            }
            : a
        ),
        isLoading: false,
        error: null,
      }

    default:
      return state
  }
}

export const AgencyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(agencyReducer, initialState)
  const { isLoggedIn } = useAuth()

  // Fetch initial data
  useEffect(() => {
    const fetchAgencies = async () => {
      if (!isLoggedIn) return;

      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const data = await agenciesService.getAgencies()
        dispatch({ type: 'INIT_AGENCIES', payload: data || [] })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      }
    }
    fetchAgencies()
  }, [isLoggedIn])

  const addAgency = useCallback(async (agencyData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await agenciesService.createAgency(agencyData)
      dispatch({ type: 'ADD_AGENCY', payload: data })
      return { success: true, data }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const updateAgency = useCallback(async (id, agencyData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await agenciesService.updateAgency(id, agencyData)
      dispatch({ type: 'UPDATE_AGENCY', payload: data })
      return { success: true, data }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const deleteAgency = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      await agenciesService.deleteAgency(id)
      dispatch({ type: 'DELETE_AGENCY', payload: id })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const toggleStatus = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const agency = state.agencies.find(a => a.id === id)
      if (!agency) throw new Error('Agency not found')

      const newStatus = await agenciesService.toggleStatus(id, agency.status)
      dispatch({
        type: 'TOGGLE_STATUS',
        payload: { id, status: newStatus },
      })
      return { success: true, data: newStatus }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [state.agencies])

  const value = {
    ...state,
    addAgency,
    updateAgency,
    deleteAgency,
    toggleStatus,
  }

  return (
    <AgencyContext.Provider value={value}>{children}</AgencyContext.Provider>
  )
}