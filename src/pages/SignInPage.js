import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SignInPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-blue-50 text-blue-900">
        <section className="max-w-7xl mx-auto py-12 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Left: Image and Content */}
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/6457571/pexels-photo-6457571.jpeg"
                alt="Freelancer collaborating online"
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h2 className="text-3xl font-bold mb-4">Welcome Back to WFH</h2>
              <p className="text-lg mb-4">
                Sign in to access your tasks, track your earnings, and continue freelancing from anywhere.
              </p>
              <p className="text-lg">
                Not a member yet? Join our community to start earning today.
              </p>
            </div>
            {/* Right: Sign In Form */}
            <div className="md:w-1/2 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-6 text-center">Sign In to Your Account</h3>
              <div className="space-y-4">
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
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
                >
                  Sign In
                </button>
              </div>
              <p className="text-center mt-4 text-sm">
                Don’t have an account?{' '}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
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

export default SignInPage;