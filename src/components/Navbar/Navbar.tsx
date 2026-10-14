import logo from "../../assets/route.svg";
import { Button, Dropdown, Label, Tabs } from "@heroui/react";
import { House, Menu, MessageCircle, Settings, User } from "lucide-react";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router";
import { useContext } from "react";
import { UserContext, type UserContextType } from "../../context/UserContext";

export default function Navbar() {
  const { setToken } = useAuth();
  const { userDetails }: UserContextType = useContext(UserContext);

  function logout() {
    //  delete local
    localStorage.removeItem("userToken");

    // navigate
    // navigate("/auth/login")
    setToken(null);
  }

  return (
    <>
      <nav className="bg-gray-300 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="nav-logo">
            <img src={logo} alt="route Logo" width={100} />
          </div>

          <div className="nav-links">
            <Tabs className="w-full max-w-md">
              <Tabs.ListContainer>
                <Tabs.List aria-label="Options">
                  <Tabs.Tab id="feed " className="flex gap-3">
                    <House />
                    <Link to="/home">Feed</Link>

                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="profile" className="flex gap-3">
                    <User />
                    <Link to="/profile">Profile</Link>

                    <Tabs.Indicator />
                  </Tabs.Tab>
                  <Tabs.Tab id="notifications" className="flex gap-3">
                    <MessageCircle />
                    <Link to="/notification">Notifications</Link>

                    <Tabs.Indicator />
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs.ListContainer>
            </Tabs>
          </div>

          <div className="nav-actions">
            <Dropdown>
              <Button
                aria-label="Menu"
                variant="secondary"
                className="flex gap-3"
              >
                <div className="w-8 h-8">
                  <img src={userDetails?.photo} alt="" className="w-full rounded-full" />
                </div>

                {userDetails?.name}

                <Menu />
              </Button>
              <Dropdown.Popover>
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item id="profile" textValue="profile">
                    <User />
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item id="Settings" textValue="Settings">
                    <Settings />
                    <Label>Settings</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="Logout"
                    textValue="Logout"
                    variant="danger"
                    onClick={logout}
                  >
                    <Label>Logout</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </div>
        </div>
      </nav>
    </>
  );
}
