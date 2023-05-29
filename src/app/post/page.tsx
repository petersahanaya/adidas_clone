import { getServerSession } from "next-auth";
import Post from "../homepage/post/Post";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const fetchCache = "force-no-store";
export const dynamic = "force-dynamic";

const PostPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return redirect("/");
  }

  return <Post />;
};

export default PostPage;
