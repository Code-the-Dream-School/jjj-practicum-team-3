"use client"; // Needed for client components

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/showtimes");
      const data = await res.json();
      setMessage(data.message);
    }
    fetchData();
  }, []);

  return (
    <h1>
      {message}
    </h1>
  );
}
