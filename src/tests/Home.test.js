import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../components/Home";
import { MemoryRouter } from "react-router-dom";

it("mounts without crashing", function () {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
});
