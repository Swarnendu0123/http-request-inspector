import React from "react";
import { FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
      <div class="flex">
        <h1 class="flex-auto mb-6 text-2xl sm:text-4xl font-bold ">
          HTTP Request Inspector{" "}
        </h1>

        <a
          class="flex justify-center"
          target="_blank"
          href="https://github.com/Swarnendu0123/http-request-inspector/"
        >
          <p class="mt-1 decoration-black sm:block hidden">
            {" "}
            Swarnendu0123/http-request-inspector{" "}
          </p>
          <FaGithub class="ml-2 w-10 h-10" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
