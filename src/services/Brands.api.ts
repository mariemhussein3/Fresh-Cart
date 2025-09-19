"use server"
export async function getAllBrands(){
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands`,{
        headers:{"Content-Type": "application/json"}
    })
    const payload=await res.json()
    return payload;
}