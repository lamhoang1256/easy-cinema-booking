export const path = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  detail: "/detail",
  profile: "/profile",
  history: "/history",
  article: "/article",
  booking: "/booking",
  bookingHistory: "/booking-history",
  dashboard: "/dashboard",
  userManage: "/user-manage",
  movieManage: "/movie-manage",
  userUpdate: "/user-update",
  movieUpdate: "/movie-update",
  resizeImage: (url, width = "", height = "") =>
    `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&h=${height}&fit=outside`,
};
