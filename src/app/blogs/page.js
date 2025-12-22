'use client'
import { useEffect } from "react";
import Blogs from "../admin/blogs/page";

export default function BlogsForAll(){
    


    useEffect(() => {
        window.location.href ="/blogs-v2"
    }, [])

    return <></>
}