import { CreateWardrobeItemDTO } from "./types/dto.types";

export const MAX_IMAGES = 5;

export type CreateWardrobeForm = Omit<CreateWardrobeItemDTO, "categoryId"> & {
  categoryName: string;
  id?: string; // Optional ID for edit mode
};

export const CREATE_WARDROBE_INITIAL_VALUES: CreateWardrobeForm = {
  brand: "",
  categoryName: "",
  color: "",
  name: "",
  notes: "",
  purchasedDate: new Date(),
  season: "",
  size: "",
  style: "CASUAL",
  imageUrls: []
}