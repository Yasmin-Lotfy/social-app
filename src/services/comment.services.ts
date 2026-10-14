import axios from "axios";


const baseUrl = import.meta.env.VITE_BASE_URL


export async  function getPostComments (postId:string ){

    const data = await axios.get(`${baseUrl}/posts/${postId}/comments` , {
        headers:{
            "Content-Type" :"application/json",
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}

export async  function createComment (postId:string, formData:FormData ){

    const data = await axios.post(`${baseUrl}/posts/${postId}/comments` , formData, {
        headers:{
           
            "Authorization":`Bearer ${localStorage.getItem("userToken")}`
        }
    } )


    return data


}