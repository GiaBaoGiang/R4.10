import { useState } from "react";

export const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    console.log("Email soumis:", email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFocus = () => {
    console.log("Input focus");
  };

  const handleBlur = () => {
    console.log("Input blur");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Email"
      />
      <button type="submit">Envoyer</button>
    </form>
  );
};
