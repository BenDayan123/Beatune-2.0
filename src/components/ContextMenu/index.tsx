import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  ControlledMenu,
  useMenuState,
  MenuItem,
  SubMenu as CustomSubMenu,
  MenuDivider,
  SubMenuProps,
} from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { KeyboardArrowRight } from "@mui/icons-material";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  items: React.ReactNode;
}

export const ContextMenuWrapper: React.FC<Props> = ({
  children,
  items,
  ...props
}) => {
  const { id: targetID, ...rest } = props;
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [menuProps, toggleMenu] = useMenuState();
  const contextRef = useRef<any>(null);
  const itemRef = useRef<any>(null);

  useEffect(() => {
    const contextMenuEventHandler = (e: MouseEvent) => {
      if (itemRef.current && itemRef.current.contains(e.target)) {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      } else if (contextRef.current && !contextRef.current.contains(e.target)) {
        toggleMenu(false);
      }
    };

    const offClickHandler = (e: MouseEvent | Event) => {
      toggleMenu(false);
      // if (contextRef.current && !contextRef.current.contains(e.target)) {
      // }
    };

    document.addEventListener("scroll", offClickHandler, true);
    document.addEventListener("contextmenu", contextMenuEventHandler);
    document.addEventListener("click", offClickHandler);
    return () => {
      document.removeEventListener("contextmenu", contextMenuEventHandler);
      document.removeEventListener("click", offClickHandler);
      document.removeEventListener("scroll", offClickHandler, true);
    };
  }, [menuProps, anchorPoint, targetID]);

  useLayoutEffect(() => {
    if (anchorPoint.x + contextRef.current?.offsetWidth > window.innerWidth) {
      setAnchorPoint((prev) => ({
        ...prev,
        x: anchorPoint.x - contextRef.current?.offsetWidth,
      }));
    }
    if (anchorPoint.y + contextRef.current?.offsetHeight > window.innerHeight) {
      setAnchorPoint((prev) => ({
        ...prev,
        y: anchorPoint.y - contextRef.current?.offsetHeight,
      }));
    }
  }, [anchorPoint]);

  return (
    <>
      <div ref={itemRef} {...rest}>
        {children}
      </div>
      <ControlledMenu
        {...menuProps}
        anchorPoint={anchorPoint}
        ref={contextRef}
        transition
      >
        {items}
      </ControlledMenu>
    </>
  );
};

export const SubMenu: React.FC<SubMenuProps> = ({
  children,
  label,
  ...rest
}) => {
  return (
    <CustomSubMenu
      {...rest}
      label={
        <>
          {label}
          <KeyboardArrowRight className="arrow" />
        </>
      }
    >
      {children}
    </CustomSubMenu>
  );
};

export { MenuItem, MenuDivider };
