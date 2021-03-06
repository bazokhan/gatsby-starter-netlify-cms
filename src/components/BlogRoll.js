import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import styles from "./BlogRoll.module.scss";

const BlogRoll = props => {
  const { data } = props;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts &&
        posts.map(({ node: post }) => (
          <div className="is-parent column is-4" key={post.id}>
            <article
              className={cx(
                `blog-list-item tile ${
                  post.frontmatter.featuredpost ? "is-featured" : ""
                }`,
                styles.postCard
              )}
            >
              <header className={styles.postHeader}>
                {post.frontmatter.featuredimage ? (
                  <div className="featured-thumbnail">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.frontmatter.featuredimage,
                        alt: `featured image thumbnail for post ${post.frontmatter.title}`
                      }}
                    />
                  </div>
                ) : null}
                <div className={styles.postMeta}>
                  <Link className="is-size-5" to={post.fields.slug}>
                    {post.frontmatter.title}
                  </Link>
                  <span className="is-block">{post.frontmatter.date}</span>
                </div>
              </header>
              <p className={styles.postBody}>
                {post.excerpt}
                <br />
                <br />
              </p>
              <div className={styles.postFooter}>
                <Link className="button is-text" to={post.fields.slug}>
                  - Read more
                </Link>
              </div>
            </article>
          </div>
        ))}
    </div>
  );
};

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
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
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
