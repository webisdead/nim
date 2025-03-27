import { render, screen } from "@testing-library/react";

import SticksDisplay from "@/components/SticksDisplay";

describe("SticksDisplay", () => {
  it("renders correct number of sticks", () => {
    const count = 5;
    render(<SticksDisplay count={count} />);

    const sticks = screen.getAllByRole("presentation");
    expect(sticks).toHaveLength(count);
  });

  it("renders no sticks when count is 0", () => {
    render(<SticksDisplay count={0} />);

    const sticks = screen.queryAllByRole("presentation");
    expect(sticks).toHaveLength(0);
  });

  it("applies correct styling to sticks", () => {
    render(<SticksDisplay count={1} />);

    const stick = screen.getByRole("presentation");
    expect(stick).toHaveClass("nes-icon", "coin", "is-medium");
  });
});
