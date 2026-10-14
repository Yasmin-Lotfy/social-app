import axios from "axios";
import PostCard from "../../components/PostCard/PostCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import SuggestedFriends from "../../components/SuggestedFriends/SuggestedFriends";
import { getAllPosts } from "../../services/newsFeed.service";
import React, { useEffect, useState } from "react";
import type { PostCardI } from "../../types/postCard.type";
import PostSkeleton from "../../components/PostCard/PostSkeleton";
import CreatePost from "../../components/PostCard/CreatePost";

export default function Home() {
  const [allPosts, setAllPosts] = useState<PostCardI[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getPosts() {
    setIsLoading(true);
    try {
      const { data } = await getAllPosts();
      // console.log(data.data.posts);
      setAllPosts(data.data.posts);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getPosts();
  }, []);
  return (
    <>
      <main>
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-2">
              {/*  side bar */}
              <Sidebar />
            </div>
            <div className="col-span-7">
              {/* create Post */}
              <CreatePost getPosts={getPosts}/>
              {/*  component */}
              { isLoading?  <PostSkeleton/> :      allPosts.map((post) => {
                return (
                  <React.Fragment key={post._id}>
                    <PostCard post={post} getPosts={getPosts} />
                  </React.Fragment>
                );
              })}
            </div>
            <div className="col-span-3">
              {/*  suggested friends  */}
              <SuggestedFriends />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
