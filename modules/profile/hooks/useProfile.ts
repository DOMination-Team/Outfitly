import { useState, useEffect, useCallback } from "react";
import type { TabType, User, Outfit, LikedProduct, WardrobeItem } from "../profile.types";
import { useAuth } from "@/providers/auth/auth.provider";
import {
  getUserProfile,
  getUserOutfitsPaginated,
  getLikedOutfitsPaginated,
  getLikedProductsPaginated,
  updateProfile,
  getUserWardrobeItemsPaginated,
} from "../profile.service";
import type { IPaginationQuery } from "@/@types/database.type";

export function useProfile() {
  const { user: authUser } = useAuth();

  const [activeTab, setActiveTab] = useState<TabType>("outfits");
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [likedOutfits, setLikedOutfits] = useState<Outfit[]>([]);
  const [likedProducts, setLikedProducts] = useState<LikedProduct[]>([]);

  /* ---------------- FETCH FUNCTIONS ---------------- */

  const fetchProfile = useCallback(async () => {
    if (!authUser?.id) return;

    try {
      setLoading(true);
      const profile = await getUserProfile(authUser.id);
      if (profile) {
        setUser(profile);
        setEditForm(profile);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  }, [authUser?.id]);

  const fetchOutfits = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        const result = await getUserOutfitsPaginated(authUser.id, query);
        setOutfits(result.data);
      } catch (error) {
        console.error("Failed to fetch outfits:", error);
      }
    },
    [authUser?.id]
  );

  const fetchWardrobeItems = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        const result = await getUserWardrobeItemsPaginated(authUser.id, query);
        setItems(result.data);
      } catch (error) {
        console.error("Failed to fetch wardrobe items:", error);
      }
    },
    [authUser?.id]
  );

  const fetchLikedOutfits = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        const result = await getLikedOutfitsPaginated(authUser.id, query);
        setLikedOutfits(result.data);
      } catch (error) {
        console.error("Failed to fetch liked outfits:", error);
      }
    },
    [authUser?.id]
  );

  const fetchLikedProducts = useCallback(
    async (query: IPaginationQuery = { page: 1, limit: 10 }) => {
      if (!authUser?.id) return;

      try {
        const result = await getLikedProductsPaginated(authUser.id, query);
        setLikedProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch liked products:", error);
      }
    },
    [authUser?.id]
  );

  /* ---------------- INITIAL LOAD ---------------- */

  useEffect(() => {
    if (!authUser?.id) return;

    fetchProfile();
    fetchOutfits();
    fetchWardrobeItems();
    fetchLikedOutfits();
    fetchLikedProducts();
  }, [
    authUser?.id,
    fetchProfile,
    fetchOutfits,
    fetchWardrobeItems,
    fetchLikedOutfits,
    fetchLikedProducts,
  ]);

  /* ---------------- EDITING ---------------- */

  const startEditing = () => {
    if (user) {
      setEditForm(user);
      setIsEditing(true);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm(user);
  };

  const saveEditing = async () => {
    if (!editForm || !authUser?.id) return;

    if (!editForm.name.trim()) {
      alert("Name is required");
      return;
    }

    await updateProfile(authUser.id, {
      name: editForm.name.trim(),
      bio: editForm.bio || undefined,
      location: editForm.location || undefined,
      website: editForm.website || undefined,
      avatarUrl: editForm.avatarUrl || undefined,
    });

    await fetchProfile();
    setIsEditing(false);
  };

  const updateEditForm = (field: keyof User, value: string) => {
    setEditForm((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  /* ---------------- RETURN ---------------- */

  return {
    activeTab,
    setActiveTab,
    user,
    isEditing,
    editForm,
    loading,
    outfits,
    items,
    likedOutfits,
    likedProducts,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
    fetchOutfits,
    fetchLikedOutfits,
    fetchLikedProducts,
    fetchWardrobeItems,
  };
}
