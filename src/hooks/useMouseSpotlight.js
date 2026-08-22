import { useEffect } from 'react'

// Hook to add mouse-tracking spotlight effect to elements
export function useMouseSpotlight(ref) {
  useEffect(() => {
    const elements = ref.current?.querySelectorAll('.hover-spotlight')
    if (!elements) return

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      e.currentTarget.style.setProperty('--mouse-x', `${x}%`)
      e.currentTarget.style.setProperty('--mouse-y', `${y}%`)
    }

    elements.forEach((el) => {
      el.addEventListener('mousemove', handleMouseMove)
    })

    return () => {
      elements.forEach((el) => {
        el.removeEventListener('mousemove', handleMouseMove)
      })
    }
  }, [ref])
}
