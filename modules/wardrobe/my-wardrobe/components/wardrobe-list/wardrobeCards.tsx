"use client";
import { GetUserWardrobeItemResponse } from "@/modules/wardrobe/types/dto.types";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useViewMode } from "../../provider/viewMode.provider";

export function WardrobeCards({ wardrobeItems }: { wardrobeItems: GetUserWardrobeItemResponse }) {
  const router = useRouter();
  const { viewMode } = useViewMode();

  if (viewMode === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {/* Add New Item Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => router.push("/wardrobe/add")}
          className="group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#671425]/30 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#671425] via-[#8B1D35] to-[#A82444]"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>

          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
          </div>

          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
              <Plus className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-white mb-2">Add New</h3>
            <p className="text-white/80">Upload item</p>
          </div>
        </motion.div>

        {/* Wardrobe Items */}
        {wardrobeItems.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
            onClick={() => router.push(`/wardrobe/item/${item.id}`)}
            className="group relative aspect-3/4 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-[#671425]/20 transition-all duration-500"
          >
            {/* Image */}
            <Image
              src={item.primaryImageUrl}
              alt={item.primaryImageAlt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              width={100}
              height={100}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

            {/* Item Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white mb-1">{item.name}</h3>
              <p className="text-white/80 capitalize mb-3">{item.category?.name}</p>

              {/* Action Buttons */}
              <div
                className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex-1 py-2 px-3 rounded-lg bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="py-2 px-3 rounded-lg bg-red-500/20 backdrop-blur-md text-white hover:bg-red-500/30 transition-all duration-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-4"
    >
      {/* Add New Item - List View */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => router.push("/wardrobe/add")}
        transition={{ duration: 0.5 }}
        className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-[#671425] to-[#8B1D35] p-6 cursor-pointer hover:shadow-xl hover:shadow-[#671425]/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
            <Plus className="w-8 h-8 text-white" />
          </div>
          <div>
            <h3 className="text-white">Add New Item</h3>
            <p className="text-white/80">Upload a new piece to your wardrobe</p>
          </div>
        </div>
      </motion.div>

      {/* Items List */}
      {wardrobeItems.items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: (index + 1) * 0.05 }}
          onClick={() => router.push(`/wardrobe/item/${item.id}`)}
          className="group relative overflow-hidden rounded-2xl bg-white dark:bg-[#2A2A30] p-4 hover:shadow-xl transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-4">
            {/* Image */}
            <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
              <Image
                src={item.primaryImageUrl}
                alt={item.primaryImageAlt}
                width={24}
                height={24}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-[#4C1420] dark:text-white mb-1">{item.name}</h3>
              <p className="text-[#4C1420]/60 dark:text-white/60 capitalize">
                {item.category?.name}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-300"
                aria-label="Edit"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                className="p-3 rounded-xl bg-[#F2E8E3] dark:bg-[#35353D] text-[#4C1420] dark:text-white/60 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600 transition-all duration-300"
                aria-label="Delete"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
