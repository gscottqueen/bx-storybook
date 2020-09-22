import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BxColorBlack } from "bx-tokens/js/bx_es_variables";
import hexToRgba from "hex-to-rgba";
import styled from "styled-components";

function useHover() {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);

      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  });

  return [ref, value];
}

// build rgba value
const underlineColour = ({ lineColor, opacity }) => {
  return hexToRgba(
    !lineColor ? BxColorBlack : lineColor,
    !opacity ? 0.5 : opacity
  );
};

//styles
const UnderlineLink = styled.span`
  a {
    text-decoration: none;
    padding: 0px 4px;
    box-sizing: border-box;
    box-shadow: inset 0
      ${(props) => (props.action !== undefined ? `-100px` : `-2px`)} 0
      ${underlineColour};
    transition: box-shadow 0.2s ease-in-out;
    cursor: pointer;
  }
`;

const DecorativeLink = ({
  id,
  lineColor,
  opacity,
  href,
  children,
  ...linkAttr
}) => {
  // envoking our hover event
  const [hoverRef, isHovered] = useHover();
  // build our class list
  const classList = id
    ? `decorative-link decorative-link--${id}`
    : "decorative-link";
  // if it is a React element, like a Gatsby Link, we need to return the object
  const childrenWithClass = React.Children.map(children, (child, i) =>
    React.cloneElement(<UnderlineLink>{child}</UnderlineLink>, {
      className: classList,
      action: isHovered ? isHovered.toString() : undefined,
      ref: hoverRef,
    })
  );

  return href ? (
    <UnderlineLink
      action={isHovered ? isHovered.toString() : undefined}
      lineColor={lineColor}
      opacity={opacity}
    >
      <a
        className={classList}
        id={id}
        rel="noreferrer"
        target="_blank"
        href={href}
        {...linkAttr}
        ref={hoverRef}
      >
        {children}
      </a>
    </UnderlineLink>
  ) : (
    childrenWithClass
  );
}

DecorativeLink.propTypes = {
  id: PropTypes.string,
  lineColor: PropTypes.string,
  opacity: PropTypes.number,
  href: PropTypes.string,
  action: PropTypes.bool,
  children: PropTypes.oneOfType([ PropTypes.string, PropTypes.element ]).isRequired,
};

DecorativeLink.defaultProps = {
  id: null,
  lineColor: BxColorBlack,
  opacity: 0.5,
  href: null,
  action: false,
  children: null,
};

export default DecorativeLink;
