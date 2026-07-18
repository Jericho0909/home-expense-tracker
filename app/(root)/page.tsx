'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ZaraFamilyExpenses = () => {
    const router = useRouter()
    const [ isLoading, setIsLoading ] = useState<boolean>(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/dashboard")
            setIsLoading(false)
        }, 4000)

        return () => clearTimeout(timer)
    }, [])

    if(isLoading) {
        return (
            <section className="flex flex-col items-center justify-center h-screen w-full">
                <div className="text-2xl text-[#5C4033] font-bold">
                    Loading...
                </div>
            </section>
        )
    }

    return (
        null
    )
}
export default ZaraFamilyExpenses;