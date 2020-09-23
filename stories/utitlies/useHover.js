import { useRef, useState, useEffect } from "react";

// https://usehooks.com/useHover/
// Usage
// function Component() {
//   const [hoverRef, isHovered] = useHover();

//   return (
//     <div ref={hoverRef}>
//       {isHovered ? 'true' : 'false'}
//     </div>
//   );
// }

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

export default useHover;
