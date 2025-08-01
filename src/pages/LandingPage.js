import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-blue-50 text-blue-900">
        {/* Choose Your Specialty Section */}
        <section id="tasks" className="max-w-7xl mx-auto py-12 px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Choose Your Specialty</h2>
          <p className="text-lg mb-8">Pick the type of work that matches your skills and start earning immediately.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">🌐 Translation Tasks</h3>
              <p className="text-lg mb-2">$15-20 per task</p>
              <p>Translate content between different languages with accuracy and cultural sensitivity.</p>
              <ul className="list-disc list-inside mt-4 text-left">
                <li>Multiple language pairs</li>
                <li>Flexible deadlines</li>
                <li>Quality reviews</li>
                <li>Instant payments</li>
              </ul>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Translation Tasks
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4">✍️ Content Writing</h3>
              <p className="text-lg mb-2">$10-15 per task</p>
              <p>Create engaging articles, blog posts, and marketing content for various industries.</p>
              <ul className="list-disc list-inside mt-4 text-left">
                <li>Diverse topics</li>
                <li>Research included</li>
                <li>SEO optimization</li>
                <li>Revision support</li>
              </ul>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Content Writing
              </Link>
            </div>
          </div>
        </section>

        {/* Earnings Section */}
        <section id="earnings" className="bg-blue-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Earnings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-2xl font-semibold">$15-20</p>
                <p>Average per translation task</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">$10-15</p>
                <p>Average per writing task</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">24/7</p>
                <p>Tasks available anytime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tasks Section */}
        <section className="max-w-7xl mx-auto py-12 px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Featured Tasks Available Now</h2>
          <p className="text-lg mb-8 text-center">Start with these high-paying tasks and build your reputation.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Translate Marketing Brochure</h3>
              <p className="text-sm text-gray-600">Translation • Intermediate • $18 • 2 days</p>
              <p className="mt-2">Translate a 500-word marketing brochure for a tech startup from English to Spanish.</p>
              <p className="mt-2 text-sm">Languages: EN → ES</p>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply for Task
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Blog Post: Tech Trends 2024</h3>
              <p className="text-sm text-gray-600">Content Writing • Beginner • $12 • 3 days</p>
              <p className="mt-2">Write an engaging blog post about emerging technology trends for 2024.</p>
              <p className="mt-2 text-sm">Length: 800 words</p>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply for Task
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Legal Document Translation</h3>
              <p className="text-sm text-gray-600">Translation • Expert • $20 • 5 days</p>
              <p className="mt-2">Translate legal terms and conditions from French to English with legal accuracy.</p>
              <p className="mt-2 text-sm">Languages: FR → EN</p>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply for Task
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">Product Description Writing</h3>
              <p className="text-sm text-gray-600">Content Writing • Beginner • $10 • 1 day</p>
              <p className="mt-2">Create compelling product descriptions for an e-commerce electronics store.</p>
              <p className="mt-2 text-sm">Length: 300 words</p>
              <Link
                to="/signup"
                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Apply for Task
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/signup"
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
            >
              View All Available Tasks
            </Link>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-blue-100 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">How It Works</h2>
            <p className="text-lg mb-8">Start earning in just 4 simple steps</p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-4xl mb-4 block">👤</span>
                <h3 className="text-xl font-semibold mb-2">1. Sign Up & Complete Profile</h3>
                <p>Create your account and showcase your language skills and writing experience.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-4xl mb-4 block">🔍</span>
                <h3 className="text-xl font-semibold mb-2">2. Browse & Apply for Tasks</h3>
                <p>Choose from available translation and content writing tasks that match your skills.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-4xl mb-4 block">✅</span>
                <h3 className="text-xl font-semibold mb-2">3. Complete Your Work</h3>
                <p>Submit high-quality work within the deadline using our easy-to-use platform.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="text-4xl mb-4 block">💰</span>
                <h3 className="text-xl font-semibold mb-2">4. Get Paid Instantly</h3>
                <p>Receive payment immediately after your work is approved. No waiting periods.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default LandingPage;