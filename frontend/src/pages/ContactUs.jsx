// import React, { useState } from "react";

// export default function ContactUs() {
//   const [form, setForm] = useState({
//     name: "",
//     number: "",
//     email: "",
//     feedback: "",
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Contact Form:", form);
//     setSubmitted(true);
//     setForm({ name: "", number: "", email: "", feedback: "" });
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center
//                     bg-gradient-to-br from-black via-[#050b1e] to-black
//                     relative overflow-hidden">

//       <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 blur-3xl rounded-full" />
//       <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />

//       <div className="relative z-10 w-full max-w-md
//                       bg-white/10 backdrop-blur-xl
//                       border border-cyan-400/30
//                       shadow-[0_0_40px_rgba(34,211,238,0.3)]
//                       rounded-2xl p-8 text-white">

//         <h2 className="text-3xl font-extrabold text-center mb-6
//                        bg-gradient-to-r from-cyan-400 to-purple-400
//                        bg-clip-text text-transparent">
//           Contact Us
//         </h2>

//         {submitted ? (
//           <p className="text-center text-green-400 font-semibold">
//             ✅ Thank You for Contacting us.
//             <br />
//             We will reach you as soon as possible.
//           </p>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Your Name"
//               required
//               className="w-full px-4 py-2 rounded-lg
//                          bg-black/30 border border-cyan-400/30
//                          outline-none"
//             />

//             <input
//               name="number"
//               value={form.number}
//               onChange={handleChange}
//               placeholder="Phone Number"
//               required
//               className="w-full px-4 py-2 rounded-lg
//                          bg-black/30 border border-cyan-400/30
//                          outline-none"
//             />

//             <input
//               type="email"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="Email Address"
//               required
//               className="w-full px-4 py-2 rounded-lg
//                          bg-black/30 border border-cyan-400/30
//                          outline-none"
//             />

//             <textarea
//               name="feedback"
//               value={form.feedback}
//               onChange={handleChange}
//               placeholder="Your Feedback"
//               rows={4}
//               required
//               className="w-full px-4 py-2 rounded-lg
//                          bg-black/30 border border-cyan-400/30
//                          outline-none"
//             />

//             <button
//               type="submit"
//               className="w-full py-2 rounded-lg font-semibold
//                          bg-gradient-to-r from-cyan-400 to-purple-500">
//               Submit
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    number: "",
    email: "",
    feedback: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        "service_q8xa5f8",     // ✅ replace
        "template_grvsvrf",    // ✅ replace
        {
          name: form.name,
          number: form.number,
          email: form.email,
          feedback: form.feedback,
        },
        "UlKjTjsqaKfBNxIKe"      // ✅ replace
      )
      .then(() => {
        setSubmitted(true);
        setLoading(false);
        setForm({ name: "", number: "", email: "", feedback: "" });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        alert("Failed to send message. Please try again.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center
                    bg-gradient-to-br from-black via-[#050b1e] to-black
                    relative overflow-hidden">

      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/30 blur-3xl rounded-full" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/30 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-md
                      bg-white/10 backdrop-blur-xl
                      border border-cyan-400/30
                      shadow-[0_0_40px_rgba(34,211,238,0.3)]
                      rounded-2xl p-8 text-white">

        <h2 className="text-3xl font-extrabold text-center mb-6
                       bg-gradient-to-r from-cyan-400 to-purple-400
                       bg-clip-text text-transparent">
          Contact Us
        </h2>

        {submitted ? (
          <p className="text-center text-green-400 font-semibold">
            ✅ Thank You for Contacting us.
            <br />
            We will reach you as soon as possible.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded-lg
                         bg-black/30 border border-cyan-400/30
                         outline-none"
            />

            <input
              name="number"
              value={form.number}
              onChange={handleChange}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 rounded-lg
                         bg-black/30 border border-cyan-400/30
                         outline-none"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-2 rounded-lg
                         bg-black/30 border border-cyan-400/30
                         outline-none"
            />

            <textarea
              name="feedback"
              value={form.feedback}
              onChange={handleChange}
              placeholder="Your Feedback"
              rows={4}
              required
              className="w-full px-4 py-2 rounded-lg
                         bg-black/30 border border-cyan-400/30
                         outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg font-semibold
                         bg-gradient-to-r from-cyan-400 to-purple-500
                         hover:opacity-90 transition">
              {loading ? "Sending..." : "Submit"}
            </button>

          </form>
        )}
      </div>
    </div>
  );
}
