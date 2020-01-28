import React, { useState, useMemo, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaDotCircle,
  FaRegDotCircle
} from "react-icons/fa";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styles from "./BlogCarousel.module.scss";

const BlogCarousel = props => {
  const { data, onScroll } = props;
  const { edges } = data.allMarkdownRemark;
  const [activeIndex, setActiveIndex] = useState(0);

  const posts = useMemo(() => (edges ? edges.map(({ node }) => node) : []), [
    edges
  ]);

  const otherPosts = useMemo(
    () => posts.filter((_, index) => index !== activeIndex),
    [activeIndex, posts]
  );

  const activePost = useMemo(() => posts[activeIndex], [posts, activeIndex]);

  const getNextPost = () =>
    setActiveIndex(Math.min(activeIndex + 1, posts.length - 1));
  const getPrevPost = () => setActiveIndex(Math.max(activeIndex - 1, 0));

  const parentRef = useRef(null);
  const childRef = useRef(null);
  const executeScroll = () =>
    parentRef && parentRef.current && childRef && childRef.current
      ? parentRef.current.scrollTo(childRef.current.offsetLeft, 0)
      : // ? childRef.current.scrollIntoView(false)
        null;

  useEffect(() => {
    executeScroll();
  }, [activeIndex]);

  return (
    <div className={styles.hero}>
      <div className={styles.heroBackground}>
        <PreviewCompatibleImage
          style={{ width: "100%" }}
          imageInfo={{
            image:
              activePost.frontmatter.featuredimage || "/img/blog-index.jpg",
            alt: `featured image thumbnail for post ${activePost.frontmatter.title}`
          }}
        />
      </div>
      <button className={styles.carouselNavButton} onClick={getPrevPost}>
        <FaAngleLeft />
      </button>
      <div className={styles.carouselContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.postMeta}>
            <Link to={activePost.fields.slug}>
              {activePost.frontmatter.title}
            </Link>
          </div>
          <p className={styles.postBody}>
            {activePost.excerpt}
            <br />
            <br />
          </p>
          <div className={styles.postFooter}>
            <Link className="button is-text" to={activePost.fields.slug}>
              - Read more
            </Link>
          </div>
          <div className={styles.subCarousel} ref={parentRef}>
            {posts &&
              posts.map((post, index) => (
                <div
                  className={styles.miniThumbnail}
                  key={post.id}
                  ref={index === activeIndex ? childRef : null}
                >
                  <header className={styles.miniBackground}>
                    {post.frontmatter.featuredimage ? (
                      <PreviewCompatibleImage
                        style={{ borderRadius: "5px" }}
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`
                        }}
                      />
                    ) : null}
                  </header>
                  <Link className={styles.miniTitle} to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <p className={styles.miniExcerpet}>
                    {post.excerpt}
                    <br />
                    <br />
                  </p>
                  <div className={styles.miniButton}>
                    <Link className="button is-text" to={post.fields.slug}>
                      - Read more
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <div className={styles.pagination}>
            {posts &&
              posts.map((post, index) => (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={styles.paginationDot}
                  key={post.id}
                >
                  {index === activeIndex ? <FaDotCircle /> : <FaRegDotCircle />}
                </button>
              ))}
          </div>
          <button className={styles.scrollButton} onClick={onScroll}>
            <FaAngleDown />
          </button>
        </div>
      </div>
      <button className={styles.carouselNavButton} onClick={getNextPost}>
        <FaAngleRight />
      </button>
    </div>
  );
};

BlogCarousel.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  }),
  onScroll: PropTypes.func.isRequired
};

export default ({ onScroll }) => (
  <StaticQuery
    query={graphql`
      query BlogCarouselQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => (
      <BlogCarousel data={data} count={count} onScroll={onScroll} />
    )}
  />
);
