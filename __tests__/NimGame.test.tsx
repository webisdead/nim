import { render, screen, fireEvent, act } from "@testing-library/react";

import NimGame from "@/components/NimGame";

describe("NimGame", () => {
  it("shows splash screen initially", () => {
    render(<NimGame />);
    expect(screen.getByText("Welcome to Nim Game")).toBeInTheDocument();
    expect(screen.getByText("Random Mode")).toBeInTheDocument();
    expect(screen.getByText("Intelligent Mode")).toBeInTheDocument();
  });

  it("starts game in random mode when selected", async () => {
    render(<NimGame computerMoveDelay={0} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Random Mode"));
    });

    expect(screen.getByText("Exit Game")).toBeInTheDocument();
    expect(screen.getByText(/Sticks remaining:/)).toBeInTheDocument();
  });

  it("starts game in intelligent mode when selected", async () => {
    render(<NimGame computerMoveDelay={0} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Intelligent Mode"));
    });

    expect(screen.getByText("Exit Game")).toBeInTheDocument();
    expect(screen.getByText(/Sticks remaining:/)).toBeInTheDocument();
  });

  it("allows player to take sticks", async () => {
    render(<NimGame computerMoveDelay={0} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Random Mode"));
    });

    const takeButton = screen.getByText(/Take 2/);

    await act(async () => {
      fireEvent.click(takeButton);
      await new Promise((resolve) => setTimeout(resolve, 500));
    });

    const computerMoveMessages = screen.getAllByText(/Computer took/);
    expect(computerMoveMessages).toHaveLength(1);
  });

  it("allows exiting game", async () => {
    render(<NimGame computerMoveDelay={0} />);

    await act(async () => {
      fireEvent.click(screen.getByText("Random Mode"));
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Exit Game"));
    });

    expect(screen.getByText("Welcome to Nim Game")).toBeInTheDocument();
  });
});
