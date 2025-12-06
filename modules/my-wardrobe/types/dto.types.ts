import { WardrobeItemWithImages, WardrobeItemWithoutAddedAtAndId } from ".";

export type CreateWardrobeItemDTO = WardrobeItemWithoutAddedAtAndId & { imageUrls: string[] };
export type CreateWardrobeItemResponse = WardrobeItemWithImages;

export type UpdateWardrobeItemDTO = Partial<WardrobeItemWithoutAddedAtAndId & { imageUrls: string[] }> & { id: string, userId: string };
export type UpdateWardrobeItemResponse = WardrobeItemWithImages;