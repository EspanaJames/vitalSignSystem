"use strict";
import { actionButtons, contentBox } from "./variables.js";

export function showDataBox() {
  actionButtons.classList.add("hidden");
  setTimeout(() => {
    contentBox.classList.add("show");
  }, 300);
}
