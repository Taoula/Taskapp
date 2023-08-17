import { useState } from "react";
import cn from "classnames";
import "./styles.css";

export default function Fab({ actions }) {
  const [open, setOpen] = useState(false);

  const mouseEnter = () => setOpen(true);
  const mouseLeave = () => setOpen(false);

  return (
    <div className="fab-container">
      <div className="fab-button">
        <div onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          <img
            alt="profile"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            className="rounded-full object-cover w-10 h-10"
          />
        </div>
      </div>
      <div
        className={cn("fab-actions space-y-3 mx-auto mb-4", {
          open,
        })}
      >
        {actions.map((action, index) => (
          <div
            style={{ transitionDelay: `${index * 25}ms` }}
            className={cn("fab-action hover:bg-slate-200 p-2 rounded-md", {
              open,
            })}
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
