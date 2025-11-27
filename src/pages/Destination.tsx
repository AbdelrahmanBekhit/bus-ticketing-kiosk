import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Destination() {
    const nav = useNavigate()

    useEffect(() => {
        // Redirect to map page
        nav('/map', { replace: true })
    }, [nav])

    return null
}
