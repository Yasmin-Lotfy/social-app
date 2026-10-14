import { ImagePlus, Send, X } from "lucide-react";
import React, { useState } from "react";
import { createComment } from "../../services/comment.services";
import toast from "react-hot-toast";
import { Spinner } from "@heroui/react";

function PostComment({postId, getAllComments}:{postId: string, getAllComments:(postId:string)=> void}) {

  //  content api
  const [content, setContent] = useState<string>("");
  //  image api
  const [image, setImage] = useState<File | null>(null);

  // display image 
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false)

  const formData = new FormData()


  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(e.currentTarget.files?.[0]);
    const file = e.currentTarget.files?.[0];
    if(file){
      setImage(file);
      setImagePreview(URL.createObjectURL(file))
    }
    

  }

  function handleClosePreveiew(){
setImage(null)
    setImagePreview(null)

  }


async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
  e.preventDefault()
  console.log(content);
  setIsLoading(true)

  try {

    formData.append("content", content);
    
    if(image){
      formData.append("image", image)
    }

    const {data} = await createComment(  postId  , formData);

    console.log(data);

    setContent("")
    setImage(null)
    setImagePreview(null);

    toast.success(data.message);
    getAllComments(postId)
    
  } catch (error) {

    console.log(error);
    
    
  }finally{
    setIsLoading(false)
  }
  
}
  

  return (
  <>
  
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 pb-5">
      <div className="flex items-center gap-2.5">
        <img
          alt="Your profile"
          className="size-8 shrink-0 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=96&h=96&q=80"
        />
        <div className="flex min-w-0 flex-1 items-center rounded-full bg-gray-100 pr-1.5 focus-within:ring-2 focus-within:ring-blue-200">
          <span className="sr-only">Write a comment</span>
          <input
            className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-500"
            id="post-details-comment"
            placeholder="Write a comment..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />
          <label className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-100">
            <span className="sr-only">Add an image</span>
            <input
              accept="image/*"
              className="sr-only"
              type="file"
              onChange={handleImage}
             
            />
            <ImagePlus size={16} />
          </label>
          <button
            aria-label="Post comment"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-100 disabled:text-gray-400 disabled:hover:bg-transparent"
            type="submit"
          >
            {isLoading? <Spinner size="md" /> :  <Send size={16} /> }
          
          </button>
        </div>
      </div>
     
    </form>

    {/* display comment image */}

    {imagePreview && <>
       <div className=" w-50 h-50 relative">
      <X className="top-0 right-0 cursor-pointer absolute"  onClick={handleClosePreveiew}/>
      <img src={imagePreview!} alt="" className="w-50 h-50 object-cover" />
    </div>
    </>}

 
  </>
  );
}

export default PostComment;
