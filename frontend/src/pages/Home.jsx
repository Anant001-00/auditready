// // src/pages/Home.jsx
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { supabase } from '../supabaseClient';

// const Home = () => {
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check user session on load
//     const checkUser = async () => {
//       const { data: { user } } = await supabase.auth.getUser();
//       setUser(user);
//       setLoading(false);
//     };

//     checkUser();

//     // Listen for auth changes (login/logout)
//     const { data: subscription } = supabase.auth.onAuthStateChange(
//       (_event, session) => {
//         setUser(session?.user || null);
//       }
//     );

//     return () => subscription.subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return <p className="text-center mt-16">Loading...</p>;
//   }

//   if (!user) {
//     // Before login: show signup/login options
//     return (
//       <div className="text-center mt-16">
//         <h1 className="text-4xl font-bold mb-4">Welcome to AuditReady</h1>
//         <p className="mb-6">Register your startup, upload financial docs, and stay audit-ready.</p>
//         <div className="flex justify-center gap-4">
//           <Link to="/signup" className="px-5 py-3 bg-blue-600 text-white rounded">Get Started</Link>
//           <Link to="/login" className="px-5 py-3 border border-blue-600 text-blue-600 rounded">Login</Link>
//         </div>
//       </div>
//     );
//   }

//   // After login: show platform info + About Us
//   return (
//     <div className="max-w-4xl mx-auto mt-16 px-4">
//       <section className="mb-12 text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome back to AuditReady</h1>
//         <p className="text-lg text-gray-700">
//           AuditReady helps startups stay audit-ready by organizing your financial documents, tracking uploads, and simplifying compliance.
//         </p>
//       </section>

//       <section className="bg-white rounded-lg shadow p-8">
//         <h2 className="text-2xl font-semibold mb-4">About Us</h2>
//         <p className="text-gray-700 leading-relaxed">
//           AuditReady was founded with the mission to empower startups with seamless financial documentation and audit readiness.
//           Our platform automates document storage, milestone tracking, and real-time audit preparation, so you can focus on growing your business.
//           We prioritize security, transparency, and user-friendly design.
//         </p>
//       </section>
//     </div>
//   );
// };

// export default Home;



import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import HomeBeforeLogin from './HomeBeforeLogin';
import HomeAfterLogin from './HomeAfterLogin';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    checkUser();

    const { data: subscription } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });

    return () => subscription.subscription.unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-16">Loading...</p>;
  }

  return user ? <HomeAfterLogin /> : <HomeBeforeLogin />;
};

export default Home;
