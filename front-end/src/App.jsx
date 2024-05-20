import { useState } from "react";
import styles from "./App.module.css";
import { Panel } from "./components/Panel/Panel";
import { Button } from "./components/Button/Button";

function App() {
  const [isPanelShown, setPanelShown] = useState(true);
  return (
    <main className={styles.main}>
      <Button
        onClick={() => {
          setPanelShown((prevPanel) => !prevPanel);
        }}
      >
        {isPanelShown ? "Schowaj Panel" : "Pokaz panel"}
      </Button>
      {isPanelShown && <Panel />}
    </main>
  );
}

export default App;
