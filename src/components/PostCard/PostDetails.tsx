import {
  ArrowLeft,
  ChevronDown,
  Globe2,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { getSinglePost } from "../../services/post.services";
import React, { useContext, useEffect, useState } from "react";
import type { PostCardI, TopComment } from "../../types/postCard.type";
import { getPostComments } from "../../services/comment.services";
import PostComment from "./PostComment";
import LikeButton from "../LikeButton/LikeButton";
import { UserContext } from "../../context/UserContext";



function PostDetails() {
  const { id } = useParams();
  const userDetails = useContext(UserContext)?.userDetails;
  const [details, setDetails] = useState<PostCardI | null>(null)
  const [likesCount, setLikesCount] = useState(0)
  const [allComments, setAllComments] = useState<TopComment[] | []>([]);
  const [visisbleComment, setVisisbleComment] = useState(1);

  const restOfComments = allComments.filter((comment)=> comment._id !== details?.topComment._id)


   async function getAllComments (postId : string){
  
      try {

        const { data} = await getPostComments(postId);
        console.log(data.data.comments , "all comments");
        setAllComments(data.data.comments )
        
      } catch (error) {
        console.log(error);
        
        
      }
  
    }


  async function getPostDetails(postId: string) {
    try {
      const { data } = await getSinglePost(postId);
setDetails(data.data.post)
setLikesCount(data.data.post.likesCount)
      // console.log(data.data.post);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPostDetails(id!);
     getAllComments(id!)
  }, [id]);

  return (
    <>

    {details && <>
       <div className="mx-auto mt-6 w-full  px-4 sm:px-5">
        <Link
          className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 hover:text-gray-900"
          to="/home"
        >
          <ArrowLeft aria-hidden="true" size={17} />
          Back to feed
        </Link>
      </div>
      <article className="mx-auto mb-6 mt-2 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <header className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <img
              className="size-11 shrink-0 rounded-full object-cover ring-2 ring-white"
              src={details.user.photo}
              alt={details.user.name}
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="truncate text-sm font-semibold text-gray-900">
                  {details.user.name}
                </span>
                <span className="truncate text-xs text-gray-500">
                  {details.user.username}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
                <span>
                  {new Date(details.createdAt).toLocaleString("en-us", {
                    timeStyle: "short",
                    dateStyle: "full",
                  })}
                </span>
                <span aria-hidden="true">·</span>
                <Globe2 aria-label="Public" size={13} />
                <span>{details.privacy}</span>
              </div>
            </div>
          </div>
          <button
            aria-label="More post options"
            className="-mr-2 flex size-9 shrink-0 items-center justify-center rounded-full
             text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            type="button"
          >
            <MoreHorizontal size={21} />
          </button>
        </header>

        <div className="px-4 pb-3 pt-3 text-sm leading-6 text-gray-800 sm:px-5">
          <p>{details.body}</p>
        </div>

        {details.image && (
          <img
            className="block max-h-[520px] w-full bg-gray-100 object-cover"
            src={details.image}
            alt={details.body}
          />
        )}

        <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-gray-500 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="flex size-[18px] items-center justify-center rounded-full bg-rose-500 text-white">
              <Heart aria-hidden="true" fill="currentColor" size={11} />
            </span>
            <span>{likesCount} likes</span>
          </div>
          <div className="flex gap-3">
            <span>{details.commentsCount} comments</span>
            <span>{details.sharesCount} shares</span>
          </div>
        </div>

        <div className="mx-4 flex border-y border-gray-200 sm:mx-5">
          <LikeButton
            postId={details._id}
            initialLikes={details.likesCount}
            initialLiked={Boolean(
              userDetails?._id && details.likes?.includes(userDetails._id),
            )}
            onLikesChange={setLikesCount}
            className="min-h-11 flex-1"
          />
          <button
            className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            type="button"
          >
            <MessageCircle size={18} />
            Comment
          </button>
          <button
            className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
            type="button"
          >
            <Share2 size={18} />
            Share
          </button>
        </div>
        {/* {shareMessage && (
        <p aria-live="polite" className="px-5 pt-2 text-xs text-gray-500">
          {shareMessage}
        </p>
      )} */}

        <section aria-label="Comments" className="px-4 pb-4 pt-3 sm:px-5">
          <button
            className="mb-3 flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
            type="button"
            onClick={()=> setVisisbleComment(visisbleComment +1)}
          >
            Show more comments
            <ChevronDown size={16} />
          </button>

       
                      {details.topComment && (
                       <>
                         <div className="flex items-start gap-2">
                           <img
                             className="h-8 w-8 rounded-full object-cover"
                             src={details.topComment.commentCreator.photo}
                             alt=""
                           />
                           <div className="rounded-2xl bg-gray-100 px-3 py-2">
                             <div className="text-xs flex flex-col gap-1  font-semibold text-gray-900">
                              <h2 className="text-green-400 text-sm font-black"> Top Comment</h2>
                             <p>  {details.topComment.commentCreator.name}</p>
                             </div>
                             <p className="text-sm text-gray-700">
                               {details.topComment.content}
                             </p>
                                {details.topComment.image && <>
                               <div>
                              <img src={details.topComment.image} alt="" className="w-full h-40 object-cover" />
                             </div>
                             </>}
                           </div>
                         </div>
                       </>
                     )}
                     
                  {restOfComments && restOfComments.slice(0,visisbleComment).map((comment)=> {
       
                   return <React.Fragment key={comment._id }>
                   
                      <div className="flex items-start gap-2" key={comment._id}>
                           <img
                             className="h-8 w-8 rounded-full object-cover"
                             src={comment.commentCreator.photo}
                             alt=""
                           />
                           <div className="rounded-2xl bg-gray-100 px-3 py-2">
                             <div className="text-xs  font-semibold text-gray-900">
                            
                             <p>  {comment.commentCreator.name}</p>
                             </div>
                             <p className="text-sm text-gray-700">
                               {comment.content}
                             </p>
                             {comment.image && <>
                               <div>
                              <img src={comment.image} alt="" className="w-full h-40 object-cover" />
                             </div>
                             </>}
                           
                           
                           </div>
                         </div>
                   </React.Fragment>
                  })}

          {/* form to create comment */}
          <PostComment  postId={id!}  getAllComments={getAllComments}/>
        </section>
      </article>
    
    </>}
   
    </>
  );
}

export default PostDetails;
