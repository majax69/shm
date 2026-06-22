'use client'

import { useEffect } from 'react'

const LOADER_STORAGE_KEY = 'shm-loader-seen'

export function MarkSiteVisited() {
  useEffect(() => {
    window.sessionStorage.setItem(LOADER_STORAGE_KEY, '1')
  }, [])

  return null
}
