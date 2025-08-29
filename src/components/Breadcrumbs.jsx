import React from "react";
import { Link, useLocation } from "react-router-dom";

const AppBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  return (
    <div className="#"> 
    <nav className="px-4 py-4 mt-2 text-sm ">
      <ol className="flex flex-wrap items-center text-gray-600">
        <li>
          <Link to="/" className="font-medium hover:text-blue-600">
            Home
          </Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-[#0A174E]  capitalize font-semibold">
                  {decodeURIComponent(name).replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="capitalize hover:text-blue-600"
                >
                  {decodeURIComponent(name).replace(/-/g, " ")}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
</div>
  );
};

export default AppBreadcrumbs;
