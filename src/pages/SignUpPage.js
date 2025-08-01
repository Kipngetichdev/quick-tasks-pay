import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignUpPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-blue-50 text-blue-900">
        <section className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left: Image and Content */}
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg"
                alt="Freelancer working on laptop"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-bold mb-4">Join Our Freelance Community</h2>
              <p className="text-lg mb-4">
                Start earning up to $20 per task from home. Work on translation and content writing projects that fit your schedule.
              </p>
              <p className="text-lg">
                Sign up today to access thousands of tasks and get paid instantly for your work.
              </p>
            </div>
            {/* Right: Sign Up Form */}
            <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-center">Create Your Account</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </div>
              <p className="text-center mt-4 text-sm">
                Already have an account?{' '}
                <a href="/signin" className="text-blue-500 hover:underline">
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SignUpPage;