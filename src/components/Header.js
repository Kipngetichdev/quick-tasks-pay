import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  // Function to handle smooth scrolling to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-blue-900 text-white">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">WFH</div>
        <div className="flex space-x-4">
          {/* Hide these links on mobile (below md breakpoint) */}
          <button
            onClick={() => scrollToSection('tasks')}
            className="hidden md:block hover:text-blue-300 cursor-pointer"
          >
            Browse Tasks
          </button>
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="hidden md:block hover:text-blue-300 cursor-pointer"
          >
            How it Works
          </button>
          <button
            onClick={() => scrollToSection('earnings')}
            className="hidden md:block hover:text-blue-300 cursor-pointer"
          >
            Earnings
          </button>
          <Link to="/signin" className="hidden md:block hover:text-blue-300">
            Log In
          </Link>
          {/* Get Started button visible on all screen sizes */}
          <Link
            to="/signup"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Get Started
          </Link>
        </div>
      </nav>
      <div className="bg-blue-50 text-blue-900 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Earn Up to $20 Per Task From Home</h1>
        <p className="text-lg mb-6">
          Join thousands of freelancers earning money through translation and content writing tasks. Work on your schedule, get paid quickly.
        </p>
        <Link
          to="/signup"
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Start Earning Today
        </Link>
      </div>
    </header>
  );
}

export default Header;