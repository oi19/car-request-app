"use client"

import type React from "react"
import { createContext, useContext } from "react"
import axios from "axios"

// Create an axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "https://6820b96e259dad2655ad68e1.mockapi.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Create a context for the API client
const ApiContext = createContext(axiosInstance)

// Custom hook to use the API client
export const useApi = () => useContext(ApiContext)

// Provider component to make the API client available throughout the app
interface ApiProviderProps {
  children: React.ReactNode
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  return <ApiContext.Provider value={axiosInstance}>{children}</ApiContext.Provider>
}
