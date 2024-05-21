import styles from "./FilterButton.module.css";

export function FilterButton({ children, onClick, active }) {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
