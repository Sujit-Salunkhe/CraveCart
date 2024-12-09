"use client"
import { useRouter } from "next/router"
const HandleRedirect = (url) => {
 const router = useRouter()
 router.push('/login')
}

export default HandleRedirect
