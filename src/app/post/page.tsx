import { getServerSession } from "next-auth";
import Post from "../homepage/post/Post";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const PostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return <Post />;
};

export default PostPage;
