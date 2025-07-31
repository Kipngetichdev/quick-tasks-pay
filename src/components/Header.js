import React from 'react';

function Header() {
  return (
    <header className="bg-blue-900 text-white">
      <nav className="flex justify-between items-center p-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold">WFH</div>
        <div className="flex space-x-4">
          {/* Hide these links on mobile (below md breakpoint) */}
          <a href="#tasks" className="hidden md:block hover:text-blue-300">Browse Tasks</a>
          <a href="#how-it-works" className="hidden md:block hover:text-blue-300">How it Works</a>
          <a href="#earnings" className="hidden md:block hover:text-blue-300">Earnings</a>
          <a href="#login" className="hidden md:block hover:text-blue-300">Log In</a>
          {/* Get Started button visible on all screen sizes */}
          <a href="#get-started" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">Get Started</a>
        </div>
      </nav>
      <div className="bg-blue-50 text-blue-900 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Earn Up to $20 Per Task From Home</h1>
        <p className="text-lg mb-6">Join thousands of freelancers earning money through translation and content writing tasks. Work on your schedule, get paid quickly.</p>
        <a href="#get-started" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">Start Earning Today</a>
      </div>
    </header>
  );
}

export default Header;