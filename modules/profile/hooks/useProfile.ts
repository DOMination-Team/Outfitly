import { useState } from "react";
import type { TabType, User } from "../profile.types";
import { mockUser } from "../profile.constants";

export function useProfile() {
  const [activeTab, setActiveTab] = useState<TabType>("outfits");
  const [user, setUser] = useState<User>(mockUser); // Local state for user data
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<User>(mockUser); // Temporary form data

  const startEditing = () => {
    setEditForm(user); // Copy current user data to form
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm(user); // Reset form
  };

  const saveEditing = () => {
    // Basic validation (expand as needed)
    if (!editForm.name.trim()) {
      alert("Name is required");
      return;
    }
    setUser(editForm); // Update user data
    setIsEditing(false);
  };

  const updateEditForm = (field: keyof User, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    activeTab,
    setActiveTab,
    user,
    isEditing,
    editForm,
    startEditing,
    cancelEditing,
    saveEditing,
    updateEditForm,
  };
}