import React, { useRef } from "react";
import cx from "classnames";
import Layout from "../../components/Layout";
import BlogRoll from "../../components/BlogRoll";
import styles from "./BlogIndexPage.module.scss";
import BlogCarousel from "../../components/BlogCarousel";

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);

const BlogIndexPage = () => {
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <Layout>
      <BlogCarousel onScroll={executeScroll} />
      <section className="section" ref={myRef}>
        <div className="container">
          <p className={styles.sectionTitle}>Latest Articles</p>
          <div className="content">
            <BlogRoll />
          </div>
        </div>
        <div
          className="content"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button className={cx("button", styles.loadMoreButton)} type="button">
            More articles
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default BlogIndexPage;
