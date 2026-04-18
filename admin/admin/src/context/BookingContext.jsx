/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer, useCallback, useEffect } from 'react'
import { bookingsService } from '../services/bookingsService'
import { useAuth } from '../hooks/useAuth'

export const BookingContext = createContext()

const initialState = {
  bookings: [],
  isLoading: false,
  error: null,
}

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload, error: null }

    case 'SET_ERROR':
      return { ...state, isLoading: false, error: action.payload }

    case 'INIT_BOOKINGS':
      return { ...state, bookings: action.payload, isLoading: false, error: null }

    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
        isLoading: false,
        error: null,
      }

    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id ? action.payload : b
        ),
        isLoading: false,
        error: null,
      }

    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(b => b.id !== action.payload),
        isLoading: false,
        error: null,
      }

    case 'CHANGE_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id
            ? { ...b, status: action.payload.status }
            : b
        ),
        isLoading: false,
        error: null,
      }

    default:
      return state
  }
}

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState)
  const { isLoggedIn } = useAuth()

  // Fetch initial data
  useEffect(() => {
    const fetchBookings = async () => {
      // If not logged in, we might still want to fetch or show nothing
      // But typically we fetch after login
      if (!isLoggedIn) return;

      dispatch({ type: 'SET_LOADING', payload: true })
      try {
        const data = await bookingsService.getBookings()
        dispatch({ type: 'INIT_BOOKINGS', payload: data || [] })
      } catch (err) {
        dispatch({ type: 'SET_ERROR', payload: err.message })
      }
    }
    fetchBookings()
  }, [isLoggedIn])

  const addBooking = useCallback(async (bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await bookingsService.createBooking(bookingData)
      dispatch({ type: 'ADD_BOOKING', payload: data })
      return { success: true, data }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const updateBooking = useCallback(async (id, bookingData) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await bookingsService.updateBooking(id, bookingData)
      dispatch({ type: 'UPDATE_BOOKING', payload: data })
      return { success: true, data }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const deleteBooking = useCallback(async (id) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      await bookingsService.deleteBooking(id)
      dispatch({ type: 'DELETE_BOOKING', payload: id })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const changeStatus = useCallback(async (id, status) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      const data = await bookingsService.changeStatus(id, status)
      dispatch({
        type: 'CHANGE_STATUS',
        payload: { id, status: data.status },
      })
      return { success: true }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message })
      return { success: false, error: error.message }
    }
  }, [])

  const value = {
    ...state,
    addBooking,
    updateBooking,
    deleteBooking,
    changeStatus,
  }

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  )
}