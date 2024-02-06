import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div class="flex">
        <a
          target="_blank"
          href="https://github.com/Swarnendu0123/http-request-inspector/"
        >
          {" "}
          <FaGithub class="flex-none w-10 h-10" />{" "}
        </a>
        <h1 class="flex-auto mb-6 text-4xl font-bold">
          HTTP Request Inspector{" "}
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
