import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Menu from "../Menu";
import { Container } from "./styles";
import { getUser } from "../../services/api";

function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [user, setUser] = useState({ login: "", creditos: 0, admin: false });

  const ref = useRef(null);

  const handleClickOutside = (event) => {
    const selector = '.item'; // any css selector for children
    const closest = event.target.closest(selector);
    if ((ref.current && !ref.current.contains(event.target)) || closest) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    async function fetchUser() {
      let user = await getUser();
      setUser(user);
    }
    fetchUser();
    setInterval(fetchUser, 20000);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return (
    <>
      <Container
        style={{
          zIndex: "9999999999999",
        }}
      >
        {!isMenuVisible ? (
          <button
            onClick={() => {
              setMenuVisible(true);
            }}
          >
            <FaBars />
          </button>
        ) : (
          <button onClick={() => setMenuVisible(false)}>
            <FaTimes />
          </button>
        )}
        <h1>
          BrokehCheckers
          <br />
          <span>{user.login}</span>{" "}
          <span
            style={{
              backgroundColor: user.creditos < 3 ? "#e24848" : "lime",
              color: "#121212",
            }}
          >
            ${Math.round(user.creditos * 10) / 10}
          </span>
        </h1>
      </Container>
      <div ref={ref}>{isMenuVisible ? <Menu /> : ""}</div>
    </>
  );
}

export default Header;
