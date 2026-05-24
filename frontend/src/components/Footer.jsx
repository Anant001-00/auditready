// import React from "react";
// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-12">
//       <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">

//         {/* Support */}
//         <div>
//           <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
//           <ul className="space-y-2">
//             <li>
//               <Link to="/ContactUs" className="hover:text-cyan-400 transition">
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <a href="/terms" className="hover:text-cyan-400 transition">
//                 Terms of Use
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h4 className="text-lg font-semibold text-white mb-4">Social Media</h4>
//           <ul className="space-y-2">
//             <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a></li>
//             <li><a href="https://x.com" target="_blank" rel="noreferrer">X (Twitter)</a></li>
//             <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
//             <li><a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a></li>
//             <li><a href="https://wa.me/919999999999" target="_blank" rel="noreferrer">WhatsApp</a></li>
//           </ul>
//         </div>
//       </div>

//       <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
//         © {new Date().getFullYear()} Your App Name. All rights reserved.
//       </div>
//     </footer>
//   );
// }


import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0b0f1a] to-[#06080f] text-gray-400">

      {/* Top border line */}
      <div className="border-t border-cyan-400/20" />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            Audit<span className="text-cyan-400">Ready</span>
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Building trust and transparency through secure,
            intelligent financial platforms.
          </p>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Support
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link
                to="/ContactUs"
                className="hover:text-cyan-400 transition"
              >
                Contact Us
              </Link>
            </li>
            <li className="hover:text-cyan-400 transition cursor-pointer">
              Terms of Use
            </li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Social Media
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-cyan-400 transition cursor-pointer">
              LinkedIn
            </li>
            <li className="hover:text-cyan-400 transition cursor-pointer">
              X (Twitter)
            </li>
            <li className="hover:text-cyan-400 transition cursor-pointer">
              Instagram
            </li>
            <li className="hover:text-cyan-400 transition cursor-pointer">
              Telegram
            </li>
            <li className="hover:text-cyan-400 transition cursor-pointer">
              WhatsApp
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom copyright */}
      <div className="text-center text-sm text-gray-500 pb-6">
        © {new Date().getFullYear()} AuditReady. All rights reserved.
      </div>
    </footer>
  );
}
