"use client";
import MotionField from "@/components/motioned-input/motionedInput";
import { Form, FormikProvider } from "formik";
import { motion } from "framer-motion";
import useSignIn from "../hook/useSignIn";
import { Mail, Lock } from "lucide-react";

const SignInForm = () => {
  const { formik } = useSignIn();
  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6">
        <MotionField
          name="email"
          isPassword={false}
          label="Email"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
        />

        <MotionField
          name="password"
          isPassword={true}
          label="Password"
          placeholder="••••••••"
          icon={<Lock size={18} />}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-right"
        >
          <button
            type="button"
            className="text-[var(--outfitly-primary)] hover:text-[var(--outfitly-primary-hover)] dark:hover:text-[var(--outfitly-primary-active)] transition-colors duration-300"
          >
            Forgot Password?
          </button>
        </motion.div>

        <motion.button
          type="submit"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[var(--outfitly-gradient-start)] to-[var(--outfitly-gradient-mid)] hover:from-[var(--outfitly-primary-hover)] hover:to-[var(--outfitly-gradient-end)] text-[var(--outfitly-text-light)] shadow-lg shadow-[var(--outfitly-shadow)] hover:shadow-xl hover:shadow-[var(--outfitly-shadow)] transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10">Sign In</span>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.button>
      </Form>
    </FormikProvider>
  );
};

export default SignInForm;
