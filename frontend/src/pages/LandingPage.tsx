import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen w-full bg-gradient-to-br from-gray-900 to-black text-white"
    >
      {/* Navbar */}
      <nav className=" fixed w-full px-8 py-5 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-300">AutoConnect</h1>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-32 px-6">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }} 
          className="text-5xl md:text-6xl font-bold text-blue-400 drop-shadow-lg"
        >
          The Future of Video Communication
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg text-gray-300 max-w-2xl"
        >
          Connect instantly with high-quality video, superior audio, and seamless collaboration tools.
        </motion.p>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Button className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-600 transition">Start Your Call</Button>
        </motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {["Crystal-Clear Video", "End-to-End Security", "Intuitive Screen Sharing"].map((feature, index) => (
          <motion.div 
            key={feature} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 * index, duration: 0.5 }}
            className="p-8 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl hover:scale-105 transition-transform"
          >
            <h3 className="text-2xl font-semibold text-blue-400">{feature}</h3>
            <p className="mt-2 text-gray-300">{index === 0 ? "Experience ultra HD video clarity with adaptive bitrate streaming." : index === 1 ? "We ensure your conversations stay private with enterprise-level security." : "Easily share your screen in real time with zero lag."}</p>
          </motion.div>
        ))}
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-4xl font-bold text-blue-400">How It Works</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-10">
          {["Create Your Meeting", "Invite Participants", "Enjoy Uninterrupted Calls"].map((step, index) => (
            <motion.div 
              key={step} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 * index, duration: 0.5 }}
              className="p-8 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-2xl rounded-xl hover:scale-105 transition-transform"
            >
              <h3 className="text-2xl font-semibold text-blue-400">{index + 1}. {step}</h3>
              <p className="mt-2 text-gray-300">{index === 0 ? "Set up your secure meeting room instantly." : index === 1 ? "Share a simple link—no downloads required." : "Experience top-notch video and audio with zero interruptions."}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 1, duration: 1 }}
        className="bg-gray-900 bg-opacity-90 text-white text-center py-8"
      >
        <p className="text-gray-400">&copy; 2025 AutoConnect - All Rights Reserved.</p>
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;