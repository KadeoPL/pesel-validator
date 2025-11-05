import { describe, it, expect } from "vitest";
import { validatePesel } from "./validatePesel";

describe("validatePesel", () => {
  it("returns true for a valid PESEL", () => {
    const digits = "02270803628".split(""); // błędy pesel
    expect(validatePesel(digits)).toBe(true);
  });

  it("returns false for PESEL with invalid control digit", () => {
    const digits = "02270803629".split(""); // ostatnia cyfra zmieniona
    expect(validatePesel(digits)).toBe(false);
  });

  it("returns false for PESEL with invalid length", () => {
    const digits = "0227080362".split(""); // 10 cyfr zamiast 11
    expect(validatePesel(digits)).toBe(false);
  });

  it("returns false for PESEL with invalid date (31 February)", () => {
    const digits = "02223112345".split(""); // 31.02.2002 – nie istnieje
    expect(validatePesel(digits)).toBe(false);
  });

  it("returns false for PESEL with letters", () => {
    const digits = "02A70803628".split(""); // zawiera literę
    expect(validatePesel(digits)).toBe(false);
  });

  it("returns false for PESEL from invalid month code", () => {
    const digits = "02330803628".split(""); // 33 -> brak takiego zakresu
    expect(validatePesel(digits)).toBe(false);
  });
});
