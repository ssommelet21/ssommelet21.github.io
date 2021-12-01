import React, { useState } from "react";
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = ({ article }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditContent] = useState("");
  const [error, setError] = useState(false);

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = (e) => {
    e.preventDefault();
    const data = {
      author: article.author,
      content: editedContent ? editedContent : article.content,
      date: article.date,
    };

    if (data.content.length < 140) {
      setError(true);
    } else {
      axios
        .put("http://localhost:3003/articles/" + article.id, data)
        .then(() => {
          setIsEditing(false);
        });
    }
  };

  return (
    <div
      className="article"
      style={{ background: isEditing ? "#f3feff" : "white" }}
    >
      <div className="card-header">
        <h3>{article.author}</h3>
        <em>Posté le {dateParser(article.date)}</em>
      </div>
      {isEditing ? (
        <div>
          <textarea
            style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
            defaultValue={editedContent ? editedContent : article.content}
          ></textarea>
          {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
        </div>
      ) : (
        <p>{editedContent ? editedContent : article.content}</p>
      )}

      <div className="btn-container">
        {isEditing ? (
          <button onClick={handleEdit}>Valider</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        <DeleteArticle id={article.id} />
      </div>
    </div>
  );
};

export default Article;
