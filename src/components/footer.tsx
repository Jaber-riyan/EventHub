import React from "react";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

const Footer = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event organizers and attendees who trust EventHub
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Sign Up Now
              <Star className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Footer;
