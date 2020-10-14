import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCheckers } from "../../services/api";
import { Container } from "./styles";

function Menu(props) {
  let [checkersCartao, setCheckersCartao] = useState([]);
  let [checkersLogin, setCheckersLogin] = useState([]);

  useEffect(() => {
    const fetchCheckers = async () => {
      let list = await getCheckers();
      setCheckersCartao(list.cartao);
      setCheckersLogin(list.login);
    };
    fetchCheckers();
  }, []);

  return (
    <Container className="menu">
      <section>
        <Link to="/dashboard">
          <div className="item">
            <span>INÍCIO</span>
          </div>
        </Link>
      </section>
      <section>
        <div className="category">CARTÕES</div>
        {checkersCartao.map((checker) => (
          <Link key={checker.nome} to={`/checker/${checker.nome}/`}>
            <div className="item">
              <span>{checker.nome}</span>
            </div>
          </Link>
        ))}
      </section>

      <section>
        <div className="category">LOGINS</div>
        {checkersLogin.map((checker) => (
          <Link key={checker.nome} to={`/checker/${checker.nome}/`}>
            <div className="item">
              <span>{checker.nome}</span>
            </div>
          </Link>
        ))}
      </section>
    </Container>
  );
}

export default Menu;
