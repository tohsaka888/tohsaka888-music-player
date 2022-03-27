import React from "react";
import { render, screen } from "@testing-library/react";
import MusicPlayer from "./MusicPlayer"

test("renders learn react link", () => {
  render(<MusicPlayer musicId={-1} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
