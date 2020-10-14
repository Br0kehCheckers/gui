import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";

import { Container } from "./styles";
import Card from "../../components/Card";
import Header from "../../components/Header";
import { isAuthenticated, getCheckers, getUser } from "../../services/api";
import { Redirect, useHistory } from "react-router-dom";

function Dashboard() {
  const [checkersCount, setCheckersCount] = useState(0);
  const [user, setUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchCheckers = async () => {
      let list = await getCheckers();
      list = [...list.login, ...list.cartao];
      setCheckersCount(list.length);
    };

    const fetchUser = async () => {
      let user = await getUser();
      setUser(user);
    };

    fetchUser();
    fetchCheckers();
  }, []);

  return (
    <Container>
      {!isAuthenticated && <Redirect to="/" />}
      <Header />
      <main>
        <div className="content">
          <div className="cards">
            <Card
              title="Créditos"
              text={`$${Math.round(user.creditos * 10) / 10}`}
            />
            <Card title="Hits" text={user.hits} />
            <Card
              title="Tipo de conta"
              text={user.admin ? "ADMIN" : "USUÁRIO"}
            />
            <Card title="Checkers" text={checkersCount} />

            {user.ultimoCheckerUsado && (
              <Card
                button
                onClick={() => {
                  history.push(`/checker/${user.ultimoCheckerUsado}`);
                }}
                icon={<FaArrowRight />}
                title="Ultimo checker usado"
                text={"ABRIR " + String(user.ultimoCheckerUsado).toUpperCase()}
                backgroundColor="deepskyblue"
                color="#121212"
              />
            )}

            <Card
              button
              onClick={() => {}}
              icon={<FaShoppingCart />}
              title="20% off na primeira compra"
              text="ADICIONAR CRÉDITOS"
              backgroundColor="lime"
              color="#121212"
            />
          </div>
        </div>
      </main>
    </Container>
  );
}

export default Dashboard;
