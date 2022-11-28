import { useState } from "react";

export function ContactButton() {

  const [showContact, setShowContact] = useState(false)
  
  return (
    <div >
      <span id="#contact">Contact</span>
      <a href="mailto:jordan@jordanbooker.com" >
        jordan@jordanbooker.com
      </a>
    </div>
  );
}