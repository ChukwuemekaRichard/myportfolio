import React, { useState } from "react";
import avatarFocused from "../assets/avatar_focused.png";
import avatarSmiling from "../assets/avatar_smiling.png";
import "./FloatingAvatar.css";

export default function FloatingAvatar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`floating-avatar-widget ${isHovered ? "is-hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Hover to see me smile! 😊"
    >
      <div className="avatar-circle-frame">
        <img
          src={avatarFocused}
          alt="Emeka Avatar Focused"
          draggable="false"
          className={`avatar-img avatar-focused ${!isHovered ? "active" : ""}`}
        />
        <img
          src={avatarSmiling}
          alt="Emeka Avatar Smiling"
          draggable="false"
          className={`avatar-img avatar-smiling ${isHovered ? "active" : ""}`}
        />
      </div>

      <div className="avatar-tooltip">
        <span>{isHovered ? "Happy to connect! 😊" : "Hover to see me smile! 👋"}</span>
      </div>
    </div>
  );
}
