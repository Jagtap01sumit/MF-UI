"use client";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ListItemPrefix } from "@material-tailwind/react";

import CustomizedSwitches from "@/app/components/common/Toggle";
import useFundStore from "@/app/store/useFundStore";

export default function Sidebar({ menuItems, theme }) {
  const { isSidebarOpen, toggleSidebar , activeMenu, setActiveMenu} = useFundStore();
  console.log(isSidebarOpen);

  return (
    <>
      {/* Mobile Burger */}
      <button
        onClick={() => toggleSidebar()}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        style={{
          background: theme.sidebar,
          color: theme.text.primary,
          border: `1px solid ${theme.border}`,
        }}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => toggleSidebar()}
          />

          <div
            className="fixed top-0 left-0 h-screen w-72 z-50 lg:hidden transition-all duration-300"
            style={{
              background: theme.sidebar,
              color: theme.text.primary,
              borderRight: `1px solid ${theme.border}`,
            }}
          >
            {/* Header */}
            <div
              className="flex justify-between items-center p-5"
              style={{
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              <div>
                <h2 className="font-bold text-xl">MF Analytics</h2>

                <p
                  className="text-sm"
                  style={{
                    color: theme.text.secondary,
                  }}
                >
                  Portfolio Insights
                </p>
              </div>

              <button onClick={() => toggleSidebar()}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Menu */}
            <div className="p-3">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex rounded-xl py-3 mb-2 cursor-pointer gap-4 px-3 transition-all duration-200"
                    style={{
                      color: theme.text.primary,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = theme.cardHover;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                   
                    onClick={() => setActiveMenu(item.key)}
                  >
                    <ListItemPrefix className="flex items-center justify-center">
                      <Icon
                        className="h-5 w-5"
                        style={{
                          color: theme.primary,
                        }}
                      />
                    </ListItemPrefix>

                    {item.title}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Desktop Sidebar */}

      <aside
        className="hidden lg:flex flex-col w-64 h-screen"
        style={{
          background: theme.sidebar,
          color: theme.text.primary,
          borderRight: `1px solid ${theme.border}`,
        }}
      >
        {/* Header */}
        <div className="flex justify-between">
          <div
            className="p-5"
            style={{
              borderBottom: `1px solid ${theme.border}`,
            }}
          >
            <h2 className="font-bold text-xl">MF Analytics</h2>

            <p
              className="text-sm"
              style={{
                color: theme.text.secondary,
              }}
            >
              Portfolio Insights
            </p>
          </div>
          <div className="flex justify-center items-center">
            <CustomizedSwitches />
          </div>
        </div>

        {/* Menu */}
        <div className="p-3 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex rounded-xl py-3 mb-2 cursor-pointer gap-4 px-3 transition-all duration-200"
                style={{
                  color: theme.text.primary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = theme.cardHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
                 onClick={() => setActiveMenu(item.key)}
              >
                <ListItemPrefix className="flex items-center justify-center">
                  <Icon
                    className="h-5 w-5"
                    style={{
                      color: theme.primary,
                    }}
                  />
                </ListItemPrefix>

                {item.title}
              </div>
            );
          })}
        </div>
      </aside>
    </>
  );
}
