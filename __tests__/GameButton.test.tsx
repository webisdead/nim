import { render, screen, fireEvent } from "@testing-library/react";

import GameButton from "@/components/GameButton";

describe("GameButton", () => {
  it("renders with default variant", () => {
    render(<GameButton onClick={() => {}}>Click me</GameButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("nes-btn");
  });

  it("renders with different variants", () => {
    const variants = ["primary", "success", "error", "warning"] as const;

    variants.forEach((variant) => {
      const { container } = render(
        <GameButton variant={variant} onClick={() => {}}>
          {variant} button
        </GameButton>,
      );
      const button = container.firstChild;
      expect(button).toHaveClass(`is-${variant}`);
    });
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<GameButton onClick={handleClick}>Click me</GameButton>);

    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
