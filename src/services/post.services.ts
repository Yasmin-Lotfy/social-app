import axios from "axios";




const baseUrl = import.meta.env.VITE_BASE_URL


export async  function getSinglePost (postId:string ){

    const data = await axios.get(`${baseUrl}/posts/${postId}` , {
        headers:{
            "Content-Type" :"application/json",
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}

export async  function createPost ( formData:FormData ){

    const data = await axios.post(`${baseUrl}/posts` , formData, {
        headers:{
           
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}

export async  function updatePost (postId:string ,  formData:FormData ){

    const data = await axios.put(`${baseUrl}/posts/${postId}` , formData, {
        headers:{
           
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}

export async  function deletePost (postId:string    ){

    const data = await axios.delete(`${baseUrl}/posts/${postId}` , {
        headers:{
           
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}

export async  function likePost (postId:string ){

    const data = await axios.put(`${baseUrl}/posts/${postId}/like` , {}, {
        headers:{
            "Content-Type" :"application/json",
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}