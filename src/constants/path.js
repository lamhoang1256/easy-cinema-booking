export const path = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  resizeImage: (url, width = "", height = "") =>
    `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`,
};
