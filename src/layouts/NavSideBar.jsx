import React, { useState, useEffect, useRef } from "react";
import Bars3Solid from '~icons/heroicons/bars-3-solid';
import IconamoonClose from '~icons/iconamoon/close';
const NavSideBar = ({ user = null, logo = null, items = [] }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const toggleRef = useRef(null);
  // Equivale a $("body").addClass/removeClass("overlay-active")
  useEffect(() => {
    if (!sidebarOpen) return;
    const handleOutsideClick = (e) => {
      if (sidebarRef.current?.contains(e.target)) return;
      if (toggleRef.current?.contains(e.target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.classList.toggle("overlay-active", sidebarOpen);
    return () => document.body.classList.remove("overlay-active");
  }, [sidebarOpen]);

  return (
    <>
      {/* navbar */}
      <div
        className="navbar-header"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <button
          ref={toggleRef}
          type="button"
          className="sidebar-mobile-toggle"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Solid />
        </button>
      </div>

      {/* sidebar */}
      <aside ref={sidebarRef} className={`sidebar${sidebarOpen ? " sidebar-open" : ""}`}>
        <button
          type="button"
          className="sidebar-close-btn"
          onClick={() => setSidebarOpen(false)}
        >
          <IconamoonClose />
        </button>

        {logo && (
          <div>
            <a className="sidebar-logo">
              <img src={logo} alt="site logo" className="light-logo" />
            </a>
          </div>
        )}

        <div className="sidebar-menu-area">
          <ul className="sidebar-menu" id="sidebar-menu">
            {items.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}

export default NavSideBar;
