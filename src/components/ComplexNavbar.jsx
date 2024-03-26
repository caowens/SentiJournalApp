import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars2Icon,
  PlusCircleIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import { auth } from "../firebase.js";
import SJLogo from "../images/SJLogo.svg";

export function ComplexNavbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // profile menu component
  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      route: isAuthenticated ? `/signedin/${currentUser.uid}/profile` : "",
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      route: "",
    },
    {
      label: "Inbox",
      icon: InboxArrowDownIcon,
      route: "",
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      route: "",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      route: "/",
    },
  ];

  function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);

    return (
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              class="inline-block relative object-cover object-center !rounded-full w-7 h-7 border-2 border-gray-900 p-0.5"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            {/* <img
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              class="inline-block relative object-cover object-center !rounded-full w-12 h-12 border-2 border-gray-900 p-0.5"
            /> */}
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-3 w-3 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {profileMenuItems.map(({ label, icon, route }, key) => {
            const isLastItem = key === profileMenuItems.length - 1;
            return (
              <Link to={route}>
                <MenuItem
                  key={label}
                  onClick={closeMenu}
                  className={`flex items-center gap-2 rounded ${
                    isLastItem
                      ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                      : ""
                  }`}
                >
                  {React.createElement(icon, {
                    className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                    strokeWidth: 2,
                  })}
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal"
                    color={isLastItem ? "red" : "inherit"}
                  >
                    {label}
                  </Typography>
                </MenuItem>
              </Link>
            );
          })}
        </MenuList>
      </Menu>
    );
  }

  // nav list component
  const navListItems = [
    {
      label: "Entries",
      icon: Square3Stack3DIcon,
      route: isAuthenticated ? `/signedin/${currentUser.uid}` : "",
    },
    {
      label: "Account",
      icon: UserCircleIcon,
      route: isAuthenticated ? `/signedin/${currentUser.uid}/profile` : "",
    },
    {
      label: "Analysis",
      icon: ChartBarIcon,
      route: isAuthenticated ? `/signedin/${currentUser.uid}/analysis` : "",
    },
    {
      label: "New",
      icon: PlusCircleIcon,
      route: isAuthenticated ? `/signedin/${currentUser.uid}/new` : "",
    },
  ];

  function NavList() {
    return (
      <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        {navListItems.map(({ label, icon, route }, key) => (
          <Typography
            key={label}
            as="a"
            href="#"
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500"
          >
            <Link to={route}>
              <MenuItem className="flex items-center gap-2 lg:rounded-full">
                {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                <span className="text-gray-900"> {label}</span>
              </MenuItem>
            </Link>
          </Typography>
        ))}
      </ul>
    );
  }

  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 complex-nav-m complex-navbar">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          <Link to={isAuthenticated ? `/signedin/${currentUser.uid}` : "/"}>
            <div className="header-logo-container">
              <img
                className="header-logo-home filter-white"
                src={SJLogo}
                alt="SentiJournal Logo"
              />
            </div>
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
