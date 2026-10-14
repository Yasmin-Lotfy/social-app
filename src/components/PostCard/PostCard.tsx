import {
  Globe,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import type { PostCardI, TopComment } from "../../types/postCard.type";
import { Link } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { getPostComments } from "../../services/comment.services";
import PostComment from "./PostComment";
import { AlertDialog, Button, Dropdown, Label } from "@heroui/react";
import { UserContext, type UserContextType } from "../../context/UserContext";
import EditPost from "./EditPost";
import { deletePost } from "../../services/post.services";
import toast from "react-hot-toast";
import LikeButton from "../LikeButton/LikeButton";

export default function PostCard({ post , getPosts }: { post: PostCardI , getPosts:()=>void}) {
  // console.log(post);

  const [allComments, setAllComments] = useState<TopComment[] | []>([]);
  const [visisbleComment, setVisisbleComment] = useState(1);
  const { userDetails }: UserContextType = useContext(UserContext);
  const [showEditPost, setshowEditPost] = useState<boolean>(false);
  const [showDeleteDialouge, setshowDeleteDialouge] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState(post.likesCount)
  
  const alreadyLiked = Boolean(
    userDetails?._id && post.likes?.includes(userDetails._id),
  )

  const restOfComments = allComments.filter(
    (comment) => comment._id !== post.topComment._id,
  );

  async function getAllComments(postId: string) {
    try {
      const { data } = await getPostComments(postId);
      console.log(data.data.comments, "all comments");
      setAllComments(data.data.comments);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllComments(post._id);
  }, []);
async function deleteMyPost(postId : string){
  try {

    const {data}= await deletePost(postId);
    console.log(data);
    toast.success(data.message)
    
    getPosts()
  } catch (error) {
    console.log(error);
    
    
  }
}
  return (
    <>
      {post && (
        <>
          <article className="mx-auto w-full my-7 max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {/* Post creator name, profile image, username, privacy, and time */}
            <header className="flex items-center gap-3 p-4">
              <img
                className="h-11 w-11 rounded-full object-cover"
                src={post.user.photo}
                alt={post.user.name}
              />
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold text-gray-900">
                  {post.user.name}
                </h2>
                <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
                  <span>{post.user.username}</span>
                  <span aria-hidden="true">&middot;</span>
                  <span>
                    {new Date(post.createdAt).toLocaleString("en-us", {
                      dateStyle: "medium",
                      timeStyle: "long",
                    })}
                  </span>
                  <span aria-hidden="true">&middot;</span>
                  <span
                    className="inline-flex items-center gap-1"
                    aria-label={"post.privacy"}
                  >
                    <Globe size={12} />
                    {post.privacy}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                aria-label="More post options"
              >
                {post.user._id === userDetails?._id ? (
                  <>
                    <Dropdown>
                      <Button aria-label="Menu" variant="ghost">
                        <MoreHorizontal size={20} />
                      </Button>
                      <Dropdown.Popover>
                        <Dropdown.Menu
                          onAction={(key) => console.log(`Selected: ${key}`)}
                        >
                          <Dropdown.Item id="copy-Post" textValue="Copy Post">
                            <Label>Save Post</Label>
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => setshowEditPost(true)}
                            id="edit-Post"
                            textValue="Edit Post"
                          >
                            <Label>Edit Post</Label>
                          </Dropdown.Item>
                          <Dropdown.Item 
                          onClick={()=>setshowDeleteDialouge(true)}
                            id="delete-Post"
                            textValue="Delete Post"
                            variant="danger"
                          >
                            <Label>Delete Post</Label>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </>
                ) : (
                  ""
                )}
              </button>
            </header>
            {/*  delete dialouge */}
             <AlertDialog isOpen={showDeleteDialouge}>
  
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button onClick={()=> setshowDeleteDialouge(false)} slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button  onClick={()=>deleteMyPost(post._id)}   slot="close" variant="danger">
                Delete Post
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
            {/*  edit form  */}
            {showEditPost ? (
              <EditPost getPosts={getPosts} postId={post._id} setshowEditPost={setshowEditPost} />
            ) : (
              <>
                {/* Post content */}
                <p className="px-4 pb-4 text-sm leading-6 text-gray-800">
                  {post.body}
                </p>

                {/* Post image */}
                {post.image && (
                  <>
                    <img
                      className="max-h-[480px] w-full object-cover"
                      src={post.image}
                      alt="Ocean waves at the coast"
                    />
                  </>
                )}
              </>
            )}

            {/* Like, share, and comment counts */}
            <div className="flex items-center justify-between px-4 py-3 text-sm text-gray-500">
              <span>{likesCount} likes</span>
              <div className="flex gap-3">
                <span>{post.commentsCount} comments</span>
                <span>{post.sharesCount} shares</span>
              </div>
            </div>

            {/* Like, comment, and share buttons */}
            <div className="mx-4 flex items-center border-y border-gray-200 py-1">
              <LikeButton
                postId={post._id}
                initialLikes={post.likesCount}
                initialLiked={alreadyLiked}
                onLikesChange={setLikesCount}
                className="flex-1"
              />
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <MessageCircle size={18} />
                Comment
              </button>
              <button
                type="button"
                className="flex flex-1 items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
              >
                <Share2 size={18} />
                Share
              </button>
              <Link to={`/postDetails/${post._id}`}>View Details</Link>
            </div>

            {/* Top comment and expandable list of remaining comments */}
            <section className="space-y-3 p-4" aria-label="Comments">
              <button
                type="button"
                className="text-sm font-semibold text-gray-500 hover:text-gray-800"
                onClick={() => setVisisbleComment(visisbleComment + 1)}
              >
                Show More comment
              </button>

              {post.topComment && (
                <>
                  <div className="flex items-start gap-2">
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={post.topComment.commentCreator.photo}
                      alt=""
                    />
                    <div className="flex justify-between w-full">
                      <div className="rounded-2xl  bg-gray-100 px-3 py-2">
                        <div className="text-xs flex flex-col gap-1  font-semibold text-gray-900">
                          <h2 className="text-green-400 text-sm font-black">
                            Top Comment
                          </h2>
                          <p> {post.topComment.commentCreator.name}</p>
                        </div>
                        <p className="text-sm text-gray-700">
                          {post.topComment.content}
                        </p>
                      </div>
                      {post.topComment.commentCreator._id ===
                      userDetails?._id ? (
                        <>
                          <Dropdown>
                            <Button aria-label="Menu" variant="ghost">
                              <MoreHorizontal size={20} />
                            </Button>
                            <Dropdown.Popover>
                              <Dropdown.Menu
                                onAction={(key) =>
                                  console.log(`Selected: ${key}`)
                                }
                              >
                                <Dropdown.Item
                                  id="edit-Commnet"
                                  textValue="Edit Commnet"
                                >
                                  <Label>Edit Commnet</Label>
                                </Dropdown.Item>
                                <Dropdown.Item
                                  id="delete-Commnet"
                                  textValue="Delete Commnet"
                                  variant="danger"
                                >
                                  <Label>Delete Commnet</Label>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown.Popover>
                          </Dropdown>
                        </>
                      ) : (
                        <Dropdown>
                          <Button aria-label="Menu" variant="ghost">
                            <MoreHorizontal size={20} />
                          </Button>
                          <Dropdown.Popover>
                            <Dropdown.Menu
                              onAction={(key) =>
                                console.log(`Selected: ${key}`)
                              }
                            >
                              <Dropdown.Item
                                id="delete-Commnet"
                                textValue="Delete Commnet"
                                variant="danger"
                              >
                                <Label>Delete Commnet</Label>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      )}
                    </div>
                  </div>
                </>
              )}

              {restOfComments &&
                restOfComments.slice(0, visisbleComment).map((comment) => {
                  return (
                    <React.Fragment key={comment._id}>
                      <div className="flex items-start gap-2" key={comment._id}>
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={comment.commentCreator.photo}
                          alt=""
                        />
                        <div className="flex justify-between w-full">
                          <div className="rounded-2xl bg-gray-100 px-3 py-2">
                            <div className="text-xs  font-semibold text-gray-900">
                              <p> {comment.commentCreator.name}</p>
                            </div>
                            <p className="text-sm text-gray-700">
                              {comment.content}
                            </p>
                            {comment.image && (
                              <>
                                <div>
                                  <img
                                    src={comment.image}
                                    alt=""
                                    className="w-full h-40 object-cover"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                          {comment.commentCreator._id === userDetails?.id ? (
                            <>
                              <Dropdown>
                                <Button aria-label="Menu" variant="ghost">
                                  <MoreHorizontal size={20} />
                                </Button>
                                <Dropdown.Popover>
                                  <Dropdown.Menu
                                    onAction={(key) =>
                                      console.log(`Selected: ${key}`)
                                    }
                                  >
                                    <Dropdown.Item
                                      id="edit-Commnet"
                                      textValue="Edit Commnet"
                                    >
                                      <Label>Edit Commnet</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      id="delete-Commnet"
                                      textValue="Delete Commnet"
                                      variant="danger"
                                    >
                                      <Label>Delete Commnet</Label>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown.Popover>
                              </Dropdown>
                            </>
                          ) : (
                            <Dropdown>
                              <Button aria-label="Menu" variant="ghost">
                                <MoreHorizontal size={20} />
                              </Button>
                              <Dropdown.Popover>
                                <Dropdown.Menu
                                  onAction={(key) =>
                                    console.log(`Selected: ${key}`)
                                  }
                                >
                                  <Dropdown.Item
                                    id="delete-Commnet"
                                    textValue="Delete Commnet"
                                    variant="danger"
                                  >
                                    <Label>Delete Commnet</Label>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown.Popover>
                            </Dropdown>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}

              {/* Add a comment */}
              {/* form to create comment */}
              <PostComment postId={post._id} getAllComments={getAllComments} />
            </section>
          </article>
        </>
      )}
    </>
  );
}
