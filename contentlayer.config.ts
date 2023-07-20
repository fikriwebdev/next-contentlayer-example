import { defineDocumentType, makeSource } from "contentlayer/source-files";

const CONTENT_PATH = "src/contents";

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    description: { type: "string", required: true },
  },
  contentType: "mdx",
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `${CONTENT_PATH}/posts/${post._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: CONTENT_PATH,
  documentTypes: [Post],
});
