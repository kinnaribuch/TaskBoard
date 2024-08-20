import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import taskImage from "../../assets/images/task.svg";
import boardImage from "../../assets/images/board-image.png";
import listImage from "../../assets/images/list-image.png";
import cardImage from "../../assets/images/card-image.png";

const Home = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    vertical: true,
    verticalSwiping: true,
    pauseOnHover: true,
    arrows: false,
  };

  const slides = [
    {
      title: "Boards",
      description:
        "Boards act as your digital workspace, where you can categorize projects or tasks into visual lanes. Whether it's a personal project or a team collaboration, Boards give you a bird's-eye view of everything in progress, helping you manage multiple projects effortlessly.",
      image: boardImage,
    },
    {
      title: "Lists",
      description:
        "Lists break down your projects into manageable stages. From 'To-Do' to 'Done', each list represents a step in your process. Easily move tasks between lists to visualize progress, ensuring nothing falls through the cracks.",
      image: listImage,
    },
    {
      title: "Cards",
      description:
        "Cards are the building blocks of your projects. Each Card contains all the details you need to get work done—attachments, due dates, comments, and more. Drag and drop Cards between Lists as tasks evolve, keeping everything organized and on track.",
      image: cardImage,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#5094c2]">
      <header className="bg-[#5094c2] w-full h-[3.6rem] px-3 border-b flex flex-row justify-between items-center border-b-blue-200">
        <div className="left flex items-center">
          <h3 className="text-white font-bold text-lg">TaskBoard</h3>
        </div>
        <div className="right flex items-center space-x-4">
          <Link
            to="/login"
            className="bg-white text-[#5094c2] px-3 py-1 rounded shadow-sm hover:bg-[#0e5d93] hover:text-white hover:shadow-md transition duration-300 ease-in-out"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-[#5094c2] px-3 py-1 rounded shadow-sm hover:bg-[#0e5d93] hover:text-white hover:shadow-md transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 flex flex-col items-center justify-center flex-grow">
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
          TaskBoard. <br /> Sign up today to start organizing your projects!
        </motion.p>
        <motion.img
          src={taskImage}
          alt="Task management illustration"
          className="w-[50rem]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Vertical Slider Section */}
      <div className="pt-20 bg-[#f0f8ff] text-center">
        <h2 className="text-4xl font-extrabold text-[#065990] mb-4">
          Collaborate Seamlessly
        </h2>
        <p className="text-lg text-[#5094c2] max-w-3xl mx-auto mb-8">
          Invite team members to collaborate on projects in real-time. Track
          progress, share ideas, and ensure everyone stays on the same page with
          clear, organized boards.
        </p>
        <div className="container mx-auto px-4" style={{ width: "1200px", height: "480px" }}>
          <Slider className="taskboard-slide" {...sliderSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="slider-item">
                <div
                  className="flex items-center justify-between text-left"
                  style={{ display: "flex", width: "100%" }}
                >
                  {/* Left Side: Text Content */}
                  <div className="w-[35%] p-4 mr-6">
                    <motion.h3
                      className="text-3xl font-bold mb-4 text-[#065990]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-[#5094c2]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                    >
                      {slide.description}
                    </motion.p>
                  </div>

                  {/* Right Side: Image Content */}
                  <div className="w-[65%] p-4">
                    <motion.img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-auto max-w-3xl ml-auto rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-[#5094c2] w-full py-4 text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TaskBoard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
