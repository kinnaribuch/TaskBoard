import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import taskImage from "../../assets/images/task.svg";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#5094c2]">
      {/* Header */}
      <header className="bg-[#5094c2] w-full h-[3.6rem] px-3 border-b flex flex-row justify-between items-center border-b-blue-200">
        <div className="left flex items-center">
          <h3 className="text-white font-bold text-lg">TaskBoard</h3>
        </div>
        <div className="right flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-white text-[#5094c2] px-3 py-1 rounded shadow-sm hover:bg-[#f0f8ff] hover:shadow-md hover:text-[#407fa6] transition duration-300 ease-in-out"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-white text-[#5094c2] px-3 py-1 rounded shadow-sm hover:bg-[#f0f8ff] hover:shadow-md hover:text-[#407fa6] transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <motion.h1
          className="text-5xl font-extrabold mb-8 text-[#065990]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to TaskBoard
        </motion.h1>
        <motion.p
          className="text-lg text-center mb-8 max-w-2xl text-[#065990]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Manage your tasks efficiently and collaborate with your team on
          TaskBoard. <br></br> Sign up today to start organizing your projects!
        </motion.p>
        <motion.img
          src={taskImage}
          alt="Task management illustration"
          className="w-[50rem] mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
};

export default Home;
