// "use client"
// import React, { useState } from 'react';

// const Footer = () => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');

//   const validateEmail = (email) => {
//     // Basic email regex for validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (!validateEmail(email)) {
//       setError('Please enter a valid email address.');
//     } else {
//       setError('');
//       // Add your subscribe functionality here, e.g., send to backend
//       console.log('Subscribed:', email);
//     }
//   };

//   return (
//     <footer className="bg-gray-100 py-12">
//       <div className="container mx-auto px-6">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold mb-2">Subscribe to Newsletter</h2>
//           <p className="text-gray-600 mb-6">
//             Enter your email address to register to our newsletter subscription delivered on regular basis!
//           </p>
//           <form onSubmit={handleSubmit} className="flex flex-col items-center">
//             <div className="flex">
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
//               />
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-green-500 text-white font-semibold rounded-r-lg hover:bg-green-600 focus:outline-none"
//               >
//                 Subscribe
//               </button>
//             </div>
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//           </form>
//         </div>
//         <div className="flex justify-center space-x-4 mt-6">
//           <a href="#" className="text-gray-500 hover:text-indigo-600">
//             <i className="fab fa-facebook-f"></i>
//           </a>
//           <a href="#" className="text-gray-500 hover:text-indigo-600">
//             <i className="fab fa-twitter"></i>
//           </a>
//           <a href="#" className="text-gray-500 hover:text-indigo-600">
//             <i className="fab fa-youtube"></i>
//           </a>
//           <a href="#" className="text-gray-500 hover:text-indigo-600">
//             <i className="fab fa-google"></i>
//           </a>
//         </div>
//         <div className="text-center text-gray-500 mt-6">
//           <p>Copyright &copy; 2024 multilanguage news article website</p>
//           <p>Powered by Next.js and Strapi</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;




"use client";
import React, { useState } from 'react';

const footer = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, subject, message }),
      });

      if (res.ok) {
        setStatus('Email sent successfully!');
      } else {
        const errorData = await res.json();
        setStatus(`Failed to send email: ${errorData.message}`);
      }
    } catch (error) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
          <p className="text-gray-600 mb-6">
            Stay updated! Enter your email to receive our newsletter.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 w-full md:w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-4 py-2 w-full md:w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="px-4 py-2 w-full md:w-2/3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {status && <p className="text-green-500 text-sm mt-2">{status}</p>}
        </div>
      </div>
    </div>
  );
};

export default footer;
