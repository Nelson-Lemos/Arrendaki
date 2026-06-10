import { useState, useEffect, useCallback } from 'react'
import type { Property, PropertyFilters } from '../types'
import { api } from '../services/api'

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProperties = useCallback(async (filters?: PropertyFilters) => {
    setLoading(true)
    try {
      const data = await api.getProperties(filters)
      setProperties(data)
    } catch {
      // fallback to empty
      setProperties([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  return { properties, loading, fetchProperties }
}
