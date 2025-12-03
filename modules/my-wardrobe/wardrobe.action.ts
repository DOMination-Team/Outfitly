"use server";
import { handleError } from "@/utils/error-handler.utils";
import { createWardrobeItemService } from "./wardrobe.service";

export const createWardrobeItemAction = handleError(createWardrobeItemService);
