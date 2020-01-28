import React from "react";
import cx from "classnames";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer
      className={cx(
        "footer has-background-white has-text-black",
        styles.footer
      )}
    >
      2020. All rights reserved
    </footer>
  );
};

export default Footer;
