const routers = {
  "/": "home",
  "/about": "about",
  "/works": "works",
  "/lab": "lab",
  "/contact": "contact",
};

const navigation = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  window.currentSection = routers[window.location.pathname];
  window.checkCurrentSection();
};

window.onpopstate = () => {
  window.currentSection = routers[window.location.pathname];
  window.checkCurrentSection();
};

export { navigation };
