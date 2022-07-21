import { useState } from "react";

export default function ContactButton() {

  const [showContact, setShowContact] = useState(false)
  
  return (
    <div >
      <div >
        Email: jordan@jordanbooker.com
      </div>
      <button tabIndex={0} onClick={() => setShowContact(!showContact)}>
        <a >
          <span>Contact</span>
        </a>
      </button>
    </div>
  );
}
