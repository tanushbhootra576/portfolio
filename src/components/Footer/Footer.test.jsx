import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("./Aurora", () => ({
  default: () => <div data-testid="aurora" />,
}));

async function renderFooter(props) {
  const { default: Footer } = await import("./Footer");
  render(<Footer {...props} />);
}

describe("Footer", () => {
  it("does not render resume link when resumeUrl is missing", async () => {
    await renderFooter({ resumeUrl: "" });
    expect(screen.queryByText(/resume/i)).toBeNull();
  });

  it("renders resume link when resumeUrl is provided", async () => {
    await renderFooter({ resumeUrl: "https://example.com/resume.pdf" });
    const resume = screen.getByRole("link", { name: /resume/i });
    expect(resume).toHaveAttribute("href", "https://example.com/resume.pdf");
  });

  it("renders external social links", async () => {
    await renderFooter({ resumeUrl: "" });
    expect(screen.getByLabelText(/github/i)).toHaveAttribute(
      "href",
      "https://github.com/tanushbhootra576",
    );
    expect(screen.getByLabelText(/linkedin/i)).toHaveAttribute(
      "href",
      "https://linkedin.com/in/tanushbhootra576",
    );
  });
});
