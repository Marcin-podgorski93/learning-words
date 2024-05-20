import { useEffect, useState } from "react";
import { List } from "../List/List";
import styles from "./Panel.module.css";
import { Form } from "../Form/Form";

export function Panel() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/words")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  function handleFormSubmit(formData) {
    fetch("http://localhost:3000/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((res) => {
        setData((prevValue) => [...prevValue, res]);
      });
  }

  return (
    <>
      {isLoading ? (
        <p>Ładowanie</p>
      ) : (
        <section className={styles.section}>
          <Form onFormSubmit={handleFormSubmit} />
          <List data={data}></List>
        </section>
      )}
    </>
  );
}
