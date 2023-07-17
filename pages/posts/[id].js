import Layout from "@/components/Layout";
import { getAllPostsIds, getPostData } from "@/lib/posts";
import utilStyles from "@/styles/utils.module.css";
import Head from "next/head";

export async function getStaticPaths() {
  //Nex.jsで用意されているもの
  const paths = getAllPostsIds();

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
        <br />
      </article>
    </Layout>
  );
}
