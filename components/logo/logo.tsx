import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SIZE_CONFIG } from "./constants";

interface IProps {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  linkTo?: string;
  className?: string;
}


const Logo = ({ size = "md", animated = true, linkTo = "/", className = "" }: IProps) => {
  const logoContent = (
    <motion.div
      className={`${SIZE_CONFIG[size]} rounded-full overflow-hidden bg-white dark:bg-white shadow-lg ${className}`}
      initial={animated ? { opacity: 0, y: -10 } : undefined}
      animate={animated ? { opacity: 1, y: 0 } : undefined}
      transition={animated ? { duration: 0.6, delay: 0.1 } : undefined}
    >
      <Image src={"/logo.png"} alt="Outfitly Logo" className="w-full h-full object-cover" />
    </motion.div>
  );

  if (linkTo) {
    return (
      <Link href={linkTo}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          {logoContent}
        </motion.div>
      </Link>
    );
  }

  return logoContent;
};

export default Logo;
