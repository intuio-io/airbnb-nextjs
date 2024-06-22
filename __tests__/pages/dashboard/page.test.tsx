import React from "react";
import {render, screen} from "@testing-library/react";
import DashboardIndexPage from "@/app/dashboard/page";

describe("Dashboard page", () => {
    it("Should render properly", () => {
        render(<DashboardIndexPage/>);
        expect(screen.getByText("hit")).toBeInTheDocument();
    })
})