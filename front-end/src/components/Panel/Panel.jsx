import { useEffect, useState } from "react";
import { List } from "../List/List";
import styles from "./Panel.module.css";
import { Form } from "../Form/Form";
import { FilterButton } from "../FilterButton/FilterButton";

export function Panel() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  function handleDeleteItem(id) {
    fetch(`http://localhost:3000/words/${id}`, {
      method: "DELETE",
    }).then(() => {
      setData((prevData) => prevData.filter((item) => item.id !== id));
    });
  }

  function handleFilterClick(category) {
    const params = category ? `?category=${category}` : "";
    fetch(`http://localhost:3000/words${params}`)
      .then((res) => res.json())
      .then((res) => setData(res));
    setSelectedCategory(category);
  }

  return (
    <>
      {isLoading ? (
        <p>Ładowanie</p>
      ) : (
        <section className={styles.section}>
          <Form onFormSubmit={handleFormSubmit} />
          <div className={styles.filters}>
            <FilterButton
              active={selectedCategory === null}
              onClick={() => handleFilterClick(null)}
            >
              Wszystkie
            </FilterButton>
            <FilterButton
              active={selectedCategory === "noun"}
              onClick={() => handleFilterClick("noun")}
            >
              Rzeczowniki
            </FilterButton>
            <FilterButton
              active={selectedCategory === "verb"}
              onClick={() => handleFilterClick("verb")}
            >
              Czasowniki
            </FilterButton>
          </div>
          <List data={data} onDeleteItem={handleDeleteItem}></List>
        </section>
      )}
    </>
  );
}
