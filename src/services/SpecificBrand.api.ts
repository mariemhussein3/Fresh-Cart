"use server"
export async function getSpecificBrands(id:string){
    const res=await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/brands/${id}`,{
        headers:{"Content-Type": "application/json"}
    })
    const payload=await res.json()
    return payload;
}