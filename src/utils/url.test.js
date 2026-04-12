import { describe, expect, it } from "vitest";
import { safeHref } from "./url";

describe("safeHref", () => {
  it("allows https URLs", () => {
    expect(safeHref("https://example.com", { allowRelative: false })).toBe(
      "https://example.com/",
    );
  });

  it("blocks javascript: URLs", () => {
    expect(
      safeHref("javascript:alert(1)", { allowRelative: false }),
    ).toBeNull();
  });

  it("blocks protocol-relative URLs", () => {
    expect(safeHref("//evil.com", { allowRelative: false })).toBeNull();
  });

  it("allows relative URLs when enabled", () => {
    expect(safeHref("/resume.pdf", { allowRelative: true })).toBe(
      "/resume.pdf",
    );
    expect(safeHref("#contact", { allowRelative: true })).toBe("#contact");
  });

  it("rejects relative URLs when disabled", () => {
    expect(safeHref("/resume.pdf", { allowRelative: false })).toBeNull();
  });
});
