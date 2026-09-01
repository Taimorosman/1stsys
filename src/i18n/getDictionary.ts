import { en } from "./dictionaries/en";
import type { Dictionary } from "./dictionaries/types";
import type { Locale } from "./config";

const dictionaries: Record<Locale, Dictionary> = { en };

export type Dict = Dictionary;

export function getDictionary(_locale?: string): Dictionary {
  return dictionaries.en;
}
