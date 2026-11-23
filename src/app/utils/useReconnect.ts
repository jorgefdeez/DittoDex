'use client'
import { useEffect, useRef } from "react"

export const useReconnect = (callback: () => void, enabled = true) => {
    const callbackRef = useRef(callback)

    useEffect(() => {
        callbackRef.current = callback
    })

    useEffect(() => {
        if (!enabled) return
        const run = () => {
            if (document.visibilityState === "visible" && navigator.onLine) callbackRef.current()
        }
        window.addEventListener("online", run)
        window.addEventListener("focus", run)
        document.addEventListener("visibilitychange", run)
        return () => {
            window.removeEventListener("online", run)
            window.removeEventListener("focus", run)
            document.removeEventListener("visibilitychange", run)
        }
    }, [enabled])
}
