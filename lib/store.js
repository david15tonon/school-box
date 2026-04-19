'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const StoreContext = createContext(null)

const INITIAL_STATE = {
  school: null,      // { id, name, city }
  classe: null,      // { id, label }
  box: [],           // [{ id, name, price, qty, quality, emoji, required }]
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE)

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const saved = localStorage.getItem('schoolbox-state')
      if (saved) setState(JSON.parse(saved))
    } catch {}
  }, [])

  const update = (patch) => {
    setState(prev => {
      const next = { ...prev, ...patch }
      try { localStorage.setItem('schoolbox-state', JSON.stringify(next)) } catch {}
      return next
    })
  }

  // Box helpers
  const addToBox = (item) => {
    setState(prev => {
      const exists = prev.box.find(i => i.id === item.id && i.quality === item.quality)
      let box
      if (exists) {
        box = prev.box.map(i =>
          i.id === item.id && i.quality === item.quality
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      } else {
        box = [...prev.box, { ...item, qty: 1 }]
      }
      const next = { ...prev, box }
      try { localStorage.setItem('schoolbox-state', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const removeFromBox = (id, quality) => {
    setState(prev => {
      const box = prev.box.filter(i => !(i.id === id && i.quality === quality))
      const next = { ...prev, box }
      try { localStorage.setItem('schoolbox-state', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const updateQty = (id, quality, qty) => {
    if (qty < 1) { removeFromBox(id, quality); return }
    setState(prev => {
      const box = prev.box.map(i =>
        i.id === id && i.quality === quality ? { ...i, qty } : i
      )
      const next = { ...prev, box }
      try { localStorage.setItem('schoolbox-state', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const boxTotal = state.box.reduce((s, i) => s + i.price * i.qty, 0)
  const boxCount = state.box.reduce((s, i) => s + i.qty, 0)

  return (
    <StoreContext.Provider value={{ ...state, update, addToBox, removeFromBox, updateQty, boxTotal, boxCount }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
