import React, { useRef } from "react";
import cx from "classnames";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import styles from "./BlogIndexPage.module.scss";

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const BlogIndexPage = () => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <Layout>
      <div
        className={cx("full-width-image-container margin-top-0", styles.hero)}
        style={{
          backgroundImage: `url('/img/blog-index.jpg')`
        }}
      >
        <h1
          className="has-text-weight-bold is-size-1"
          style={{
            boxShadow: "0.5rem 0 0 #f40, -0.5rem 0 0 #f40",
            backgroundColor: "#f40",
            color: "white",
            padding: "1rem"
          }}
        >
          Bazo Latest Posts
        </h1>
        <button onClick={executeScroll}> Click to scroll </button>
      </div>
      <section className="section" ref={myRef}>
        <div className="container">
          <div className="content">
            <BlogRoll />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndexPage;
