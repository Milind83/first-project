const menu = [
  {
    icon: "cart-fill",
    text: "Dashboard",
    link: "/",
  },
  {
    icon: "tile-thumb-fill",
    text: "Admin",
    active: false,
    subMenu: [
      {
        text: "Admin User",
        link: "/admin-user-list",
      },
      {
        text: "Admin User Role",
        link: "/admin-user-role-list",
      },
    ],
  },
];
export default menu;
