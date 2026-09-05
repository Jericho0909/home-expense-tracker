'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const FallBack = () => {
    const router = useRouter()
    useEffect(() => {
        router.back()
    }, [])

    return null
}

export default FallBack