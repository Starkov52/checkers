import { test, expect } from "@playwright/test";

test.describe("E2E", () => {
 test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await expect(page).toHaveTitle("MineCheckers");
 });
 test("testTitle", async ({ page }) => {
  await expect(
   page.getByRole("heading", {
    name: "Checkers",
   }),
  ).toBeVisible();
 });
 test("testRout", async ({ page }) => {
  await page
   .getByRole("button", {
    name: "Игра друг с другом",
   })
   .click();
  await page.getByText("Ходят белые");
 });
});

