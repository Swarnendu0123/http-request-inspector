import { Link } from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import Login from "./auth/login.auth";

const Navbar = () => {
  return (
    <div>
      <div className="flex mb-4">
        <Link
          className="flex justify-center"
          target="_blank"
          href="https://github.com/Swarnendu0123/http-request-inspector/"
        >
          {/* <FaGithub className="mr-2 w-10 h-10" /> */}
          <p className="m-3 decoration-black sm:block hidden font-bold font-mono text-2xl">
            AI API Generator
          </p>
        </Link>
        <h1 className="flex-auto mb-6 text-2xl sm:text-4xl font-bold ">
          
        </h1>
        <Login/>
      </div>
    </div>
  );
};

export default Navbar;
