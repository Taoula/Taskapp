import { useState, useEffect } from "react";
import axios from "axios";
import cn from "classnames";
import "./styles.css";

export default function Fab({ actions }) {
  const [open, setOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const userReq = await axios.get("http://localhost:8282/auth/");
    console.log(userReq.data);
    setProfilePicture(userReq.data.profilePicture);
  }

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);

  return (
    <div
      className="fab-container"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      <div className="fab-button">
        <img
          alt="profile"
          // src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          src={profilePicture}
          className="rounded-full object-cover w-10 h-10 dark:bg-gray-200"
        />
      </div>
      <div
        className={cn("fab-actions space-y-3 mx-auto mb-4", {
          open,
        })}
      >
        {actions.map((action, index) => (
          <div
            style={{ transitionDelay: `${index * 25}ms` }}
            className={cn(
              "fab-action hover:bg-slate-200 dark:hover:bg-gray-600 dark:text-gray-200 p-2 rounded-md",
              {
                open,
              }
            )}
            key={action.label}
            onClick={action.onClick}
          >
            {action.icon}
            {/* <span className="tooltip">{action.label}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}
