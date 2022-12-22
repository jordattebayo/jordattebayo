import { useState } from "react";

export function ContactButton() {

  const [showContact, setShowContact] = useState(false)
  
  return (
    <div>
      <span id="#contact">You can reach me @ </span>
      <a href="mailto:jordan@jordanbooker.dev" >
        jordan@jordanbooker.dev
      </a>
    </div>
  );
}