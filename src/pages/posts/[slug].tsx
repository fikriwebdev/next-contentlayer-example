import { Post, allPosts } from "contentlayer/generated";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import React from "react";

import { useMDXComponent } from "next-contentlayer/hooks";

const Button = () => {
  return (
    <button className="h-10 px-4 py-2 text-white bg-gray-600 rounded-md">
      Button Component
    </button>
  );
};

export default function Post({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const MDXContent = useMDXComponent(post.body.code);

  return (
    <main className={`min-h-screen p-24`}>
      <h1 className="text-white text-3xl font-semibold text-center mb-8">
        {post.title}
      </h1>

      <h1 className="text-xl font-semibold">{post.title}</h1>
      <p className="font-light">{post.description}</p>
      <p>{new Date(post.date).toLocaleDateString()}</p>

      <hr className="border-gray-500 w-full my-4" />

      <MDXContent
        components={{
          Button,
          h1: (props) => (
            <h1 {...props} className="text-2xl font-semibold underline mb-4" />
          ),
          p: (props) => (
            <p {...props} className="text-lg text-gray-500 mb-4"></p>
          ),
          // another custom component
        }}
      />
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allPosts.map((post) => ({
      params: {
        slug: post._raw.flattenedPath.replace("posts/", ""),
      },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  { post: Post },
  { slug: string }
> = ({ params }) => {
  const post = allPosts.find((post) =>
    post._raw.flattenedPath.includes(params?.slug.toString() || "")
  );

  if (!post)
    return {
      notFound: true,
    };

  return {
    props: {
      post,
    },
  };
};
