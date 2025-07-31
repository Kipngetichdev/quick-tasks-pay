import React from 'react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WFH</h3>
            <p>Connecting freelancers with high-paying translation and content writing opportunities.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Freelancers</h4>
            <ul className="space-y-2">
              <li><a href="#tasks" className="hover:text-blue-300">Browse Tasks</a></li>
              <li><a href="#how-to-apply" className="hover:text-blue-300">How to Apply</a></li>
              <li><a href="#payment-info" className="hover:text-blue-300">Payment Info</a></li>
              <li><a href="#success-stories" className="hover:text-blue-300">Success Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2">
              <li><a href="#post-task" className="hover:text-blue-300">Post a Task</a></li>
              <li><a href="#find-freelancers" className="hover:text-blue-300">Find Freelancers</a></li>
              <li><a href="#quality-guarantee" className="hover:text-blue-300">Quality Guarantee</a></li>
              <li><a href="#enterprise" className="hover:text-blue-300">Enterprise</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#help-center" className="hover:text-blue-300">Help Center</a></li>
              <li><a href="#contact-us" className="hover:text-blue-300">Contact Us</a></li>
              <li><a href="#terms" className="hover:text-blue-300">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:text-blue-300">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 Work From Home. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;