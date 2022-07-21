import { useState } from "react";
import styles from "./contactbutton.module.sass";
import { useSpring, animated } from "react-spring"

export default function ContactButton() {

  const [showContact, setShowContact] = useState(false)
  const props = useSpring({opacity: showContact ? 1 : 0})
  
  return (
    <div className={styles.btnContainer}>
      <animated.div style={props} className={styles.contactText}>
        Email: jordan@jordanbooker.com
      </animated.div>
      <button tabIndex={0} className={styles.contactBtn} onClick={() => setShowContact(!showContact)}>
        <a >
          <span>Contact</span>
        </a>
      </button>
    </div>
  );
}

