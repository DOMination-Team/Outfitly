"use client";
import { motion } from "framer-motion";
import SignInForm from "./signInForm";

const SignInCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-[var(--outfitly-bg-white)] dark:bg-[var(--outfitly-bg-secondary)] text-card-foreground rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-sm mb-6 relative overflow-hidden border border-[var(--outfitly-border-light)]"
    >
      {/* Top Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--outfitly-gradient-start)] via-[var(--outfitly-gradient-mid)] to-[var(--outfitly-gradient-end)]" />

      {/* Welcome Text */}
      <div className="mb-8">
        <h2 className="text-[var(--outfitly-text-primary)] mb-2">Welcome Back!</h2>
        <p className="text-[var(--outfitly-text-primary)]/60">
          Sign in to continue to your wardrobe
        </p>
      </div>

      {/* Login Form */}
      <SignInForm />
    </motion.div>
  );
};

export default SignInCard;
