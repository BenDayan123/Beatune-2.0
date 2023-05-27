import React, { useState, useRef, useLayoutEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { FilterItem } from "./item";
import "./style.scss";

interface Props {
  baseURL: string;
}

const items = [
  { name: "All", to: "/" },
  { name: "Songs", to: "songs" },
  { name: "Artists", to: "artists" },
  { name: "Playlists", to: "playlists" },
  { name: "Users", to: "users" },
];

const FilterNav: React.FC<Props> = ({ baseURL }) => {
  const [showLeft, setLeft] = useState(false);
  const [showRight, setRight] = useState(false);
  const list = useRef<HTMLUListElement>(null);

  function scrollLeft(scroll: number) {
    const { current } = list;
    current && (current.scrollLeft += scroll);
  }

  function handleScroll(e: React.UIEvent<HTMLUListElement, UIEvent>) {
    const { scrollLeft, offsetWidth, scrollWidth } = e.currentTarget;
    setLeft(scrollLeft !== 0);
    setRight(scrollLeft + offsetWidth < scrollWidth);
  }

  useLayoutEffect(() => {
    function handleResize() {
      const { current } = list;
      if (current) {
        setRight(current.scrollWidth !== current.offsetWidth);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [list]);

  return (
    <nav className="filter-nav">
      {showLeft && (
        <div onClick={() => scrollLeft(-350)} className="arrow left">
          <KeyboardArrowLeftIcon className="icon" />
        </div>
      )}
      <ul className="list" ref={list} onScroll={handleScroll}>
        {items.map((item, i) => {
          return (
            <FilterItem key={item.to} to={baseURL + item.to}>
              {item.name}
            </FilterItem>
          );
        })}
      </ul>
      {showRight && (
        <div onClick={() => scrollLeft(350)} className="arrow right">
          <KeyboardArrowRightIcon className="icon" />
        </div>
      )}
    </nav>
  );
};

export default FilterNav;
