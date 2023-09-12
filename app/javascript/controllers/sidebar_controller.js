import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="sidebar"
export default class extends Controller {
  static targets = [
    "button",
    "menu",
    "userButton",
    "userMenu",
    "pathUserButton",
    "svgUserButton",
  ];

  connect() {
    // user menu event listeners
    this.userButtonTarget.addEventListener(
      "click",
      this.toggleUserMenu.bind(this)
    );

    document.addEventListener(
      "mousedown",
      this.handleClickOutsideUser.bind(this)
    );

    // sidebar event listener
    this.buttonTarget.addEventListener("click", this.toggleSidebar.bind(this));
  }

  toggleSidebar() {
    if (this.menuTarget.classList.contains("-translate-x-full")) {
      this.menuTarget.classList.remove("-translate-x-full");
      this.menuTarget.classList.add("translate-x-0");
    } else {
      this.menuTarget.classList.remove("translate-x-0");
      this.menuTarget.classList.add("-translate-x-full");
    }
  }

  toggleUserMenu() {
    if (this.userMenuTarget.classList.contains("hidden")) {
      this.userMenuTarget.classList.remove("hidden");
      this.userMenuTarget.classList.add("block");
    } else {
      this.userMenuTarget.classList.remove("block");
      this.userMenuTarget.classList.add("hidden");
    }
  }

  handleClickOutsideUser(event) {
    if (
      this.userMenuTarget.classList.contains("block") &&
      this.userButtonTarget !== event.target &&
      this.svgUserButtonTarget !== event.target &&
      this.pathUserButtonTarget !== event.target &&
      !this.userMenuTarget.contains(event.target)
    ) {
      this.userMenuTarget.classList.remove("block");
      this.userMenuTarget.classList.add("hidden");
    }
  }

  disconnect() {
    this.buttonTarget.removeEventListener(
      "click",
      this.toggleSidebar.bind(this)
    );
    this.userButtonTarget.removeEventListener(
      "click",
      this.toggleUserMenu.bind(this)
    );
    document.removeEventListener(
      "mousedown",
      this.handleClickOutsideUser.bind(this)
    );
  }
}
