import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { likePost } from "../../services/post.services";

type LikeButtonProps = {
  postId: string;
  initialLikes: number;
  initialLiked?: boolean;
  onLikesChange?: (likesCount: number) => void;
  className?: string;
};

export default function LikeButton({
  postId,
  initialLikes,
  initialLiked = false,
  onLikesChange,
  className = "",
}: LikeButtonProps) {
  
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setLikesCount(initialLikes);
    setIsLiked(initialLiked);
  }, [initialLikes, initialLiked, postId]);

  async function handleToggleLike() {
    if (isUpdating) {
      return;
    }

    const nextLiked = !isLiked;
    const nextCount = nextLiked
      ? likesCount + 1
      : Math.max(0, likesCount - 1);

    setIsLiked(nextLiked);
    setLikesCount(nextCount);
    onLikesChange?.(nextCount);
    setIsUpdating(true);

    try {
      const { data } = await likePost(postId);
      const serverLiked = data?.data?.liked;
      const serverCount = data?.data?.likesCount;

      if (typeof serverLiked === "boolean") {
        setIsLiked(serverLiked);
      }

      if (typeof serverCount === "number") {
        setLikesCount(serverCount);
        onLikesChange?.(serverCount);
      }
    } catch (error) {
      setIsLiked(isLiked);
      setLikesCount(likesCount);
      onLikesChange?.(likesCount);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Could not update like");
      }
    } finally {
      setIsUpdating(false);
    }
  }

  const ariaLabel = isLiked ? "Unlike this post" : "Like this post";

  return (
    <button
      type="button"
      onClick={handleToggleLike}
      disabled={isUpdating}
      aria-label={ariaLabel}
      aria-pressed={isLiked}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 ${
        isLiked ? "text-rose-500" : "text-gray-600"
      } ${className}`}
    >
      <Heart
        aria-hidden="true"
        size={18}
        fill={isLiked ? "currentColor" : "none"}
      />
      <span>{likesCount}</span>
    </button>
  );
}
