import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="navbar bg-gray-200 border-b-2 border-red-500 text-gray-800 p-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-white"
            >
              <li>
                <Link href={"/sports"}>
                  <h2 className="font-semibold">Sports</h2>
                </Link>
              </li>
              {/* <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li> */}
              <li>
                <Link href={"/politics"}>
                  <h2 className="font-semibold">Politics</h2>
                </Link>
              </li>
              <li>
                <Link href={"/category2"}>
                  <h2 className="font-semibold">Category2</h2>
                </Link>
              </li>
            </ul>
          </div>
          <Link href="/" className="btn btn-ghost text-4xl text-gray-900">
            ChasNews
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={"/sports"}>
                <h2 className="font-semibold text-lg">Sports</h2>
              </Link>
            </li>
            <li>
              <Link href={"/politics"}>
                <h2 className="font-semibold text-lg">Politics</h2>
              </Link>
            </li>
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
            <li>
              <Link href={"/category2"}>
                <h2 className="font-semibold text-lg">Category2</h2>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Button</a>
        </div>
      </nav>
    </div>
  );
}
