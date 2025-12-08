"use client";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Navbar } from "@/components/navbar";
import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./exploreLoader";
import useExplore from "@/modules/explore/hook/useExplore"; // Adjust path as needed
import { OutfitCard } from "./outfitCard";

export function ExplorePage() {
  const { theme } = useTheme();

  const {
    outfits,
    loading,
    hasMore,
    loaderRef,
    seasonFilter,
    styleFilter,
    setSeasonFilter,
    setStyleFilter,
    dispatch,
  } = useExplore();

  const styles = ["All Styles", "Casual", "Elegant", "Street", "Boho", "Classic"];
  const seasons = ["All Seasons", "Spring", "Summer", "Fall", "Winter"];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--outfitly-bg-primary)",
      }}
    >
      <Navbar />

      <main className="pt-20 pb-16">
        {/* Page Header */}
        <PageHeader
          title="Explore Outfits"
          subtitle="Discover inspiring looks from the community"
        />

        <div className="container mx-auto px-4 max-w-7xl mt-12">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div
              className="p-6 rounded-2xl border-2 shadow-lg transition-all duration-300"
              style={{
                backgroundColor:
                  theme === "dark" ? "var(--outfitly-bg-secondary)" : "var(--outfitly-bg-white)",
                borderColor:
                  theme === "dark" ? "var(--outfitly-primary)" : "var(--outfitly-bg-secondary)",
              }}
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md"
                    style={{ backgroundColor: "var(--outfitly-primary)" }}
                  >
                    <Filter className="w-5 h-5" style={{ color: "var(--outfitly-text-light)" }} />
                  </div>
                  <span
                    className="transition-colors duration-300"
                    style={{
                      color:
                        theme === "dark" ? "var(--outfitly-text-light)" : "var(--outfitly-primary)",
                    }}
                  >
                    Filter by:
                  </span>
                </div>

                {/* Style Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 border-2 hover:scale-105"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "var(--outfitly-bg-primary)"
                            : "var(--outfitly-bg-secondary)",
                        borderColor: "var(--outfitly-primary)",
                        color:
                          theme === "dark"
                            ? "var(--outfitly-text-light)"
                            : "var(--outfitly-primary)",
                      }}
                    >
                      {styleFilter}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="border-2"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                      borderColor: "var(--outfitly-primary)",
                    }}
                  >
                    {styles.map((style) => (
                      <DropdownMenuItem
                        key={style}
                        onClick={() => setStyleFilter(style)}
                        style={{
                          color:
                            theme === "dark"
                              ? "var(--outfitly-text-light)"
                              : "var(--outfitly-primary)",
                        }}
                        className="cursor-pointer hover:bg-[#671425]/10"
                      >
                        {style}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Season Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="transition-all duration-300 border-2 hover:scale-105"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "var(--outfitly-bg-primary)"
                            : "var(--outfitly-bg-secondary)",
                        borderColor: "var(--outfitly-primary)",
                        color:
                          theme === "dark"
                            ? "var(--outfitly-text-light)"
                            : "var(--outfitly-primary)",
                      }}
                    >
                      {seasonFilter}
                      <ChevronDown className="ml-2 w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="border-2"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "var(--outfitly-bg-secondary)"
                          : "var(--outfitly-bg-white)",
                      borderColor: "var(--outfitly-primary)",
                    }}
                  >
                    {seasons.map((season) => (
                      <DropdownMenuItem
                        key={season}
                        onClick={() => setSeasonFilter(season)}
                        style={{
                          color:
                            theme === "dark"
                              ? "var(--outfitly-text-light)"
                              : "var(--outfitly-primary)",
                        }}
                        className="cursor-pointer hover:bg-[#671425]/10"
                      >
                        {season}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
              <Masonry gutter="1.5rem">
                {outfits.map((outfit, index) => (
                  <OutfitCard key={index} index={index} outfit={outfit} dispatch={dispatch} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>

          {/* Load More / Infinite Scroll Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex justify-center"
          >
            {hasMore && (
              <div ref={loaderRef}>
                {loading ? (
                  <LoadingSpinner />
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl"
                    style={{
                      backgroundColor: "var(--outfitly-primary)",
                      color: "var(--outfitly-text-light)",
                    }}
                  >
                    <span className="text-lg">Load More</span>
                  </motion.button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
