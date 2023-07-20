import Image from "next/image";
import { Inter } from "next/font/google";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Post, allPosts } from "contentlayer/generated";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <main className={`min-h-screen p-24 ${inter.className}`}>
      <h1 className="text-white text-3xl font-semibold text-center mb-8">
        next-contentlayer-example
      </h1>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => {
          return (
            <Link key={post._id} href={post._raw.flattenedPath}>
              <div className="border rounded-md p-4">
                <h1 className="text-xl font-semibold">{post.title}</h1>
                <p className="font-light">{post.description}</p>
                <p>{new Date(post.date).toLocaleDateString()}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps<{ posts: Post[] }> = () => {
  return {
    props: {
      posts: allPosts,
    },
  };
};
