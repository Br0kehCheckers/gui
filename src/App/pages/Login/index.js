import React, { useState } from "react";
import { useAlert } from "react-alert";
import {
  FaUniversity,
  FaBarcode,
  FaCreditCard,
  FaBitcoin,
} from "react-icons/fa";

import { api, isAuthenticated } from "../../services/api";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container } from "./styles";
import { Redirect } from "react-router-dom";

function Login() {
  const alerts = useAlert();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (!login || !senha) {
      return alerts.error("Digite login e senha!");
    }

    let res = await api.post("/sessions", { login, senha });

    if (res.data.error) {
      return alerts.error(res.data.error);
    }

    localStorage.setItem("token", res.data.token);

    alerts.success("Logado com sucesso! Redirecionando...");

    setTimeout(() => {
      setSuccess(true);
    }, 2000);
  }

  async function handleRegister(event) {
    event.preventDefault();

    if (!login || !senha) {
      return alerts.error("Digite login e senha!");
    }

    let res = await api.post("/users", { login, senha }).catch((err) => {
      return alerts.error("Erro de conexão.");
    });

    if (res.data.error) {
      return alerts.error(res.data.error);
    }

    alerts.success("Usuário criado com sucesso! Redirecionando...");

    setTimeout(() => {
      setSuccess(true);
    }, 2000);
  }

  return (
    <Container>
      {isAuthenticated() || success ? <Redirect to="/dashboard" /> : ""}
      <form action="" class="login">
        <div className="title">
          <h1>
            <strong>Brokeh</strong>
            <br />
            Checkers
          </h1>
          <span
            style={{
              fontSize: "11px",
              color: "#121212",
              fontWeight: "bold",
              backgroundColor: "#ddd",
              padding: "3px",
              borderRadius: "13px",
              transform: "rotate(2deg)",
              position: "absolute",
            }}
          >
            BOTANDO A CONCORRÊNCIA PRA MAMAR!
          </span>
        </div>
        <Input
          onChange={(e) => setLogin(e.target.value)}
          placeholder="usuário"
          type="text"
          name=""
          id=""
        />
        <Input
          onChange={(e) => setSenha(e.target.value)}
          placeholder="senha"
          type="password"
          name=""
          id=""
        />
        <Button onClick={handleLogin}>Entrar</Button>

        <Button
          style={{ width: "100%" }}
          className="secondary"
          onClick={handleRegister}
        >
          Criar conta
        </Button>
        <div style={{ textAlign: "center", opacity: "0.7", marginTop: "50px" }}>
          <span>Formas de pagamento</span>
          <br />
          <br />
          <div className="formas-de-pagamento">
            <FaUniversity />
            <FaBarcode />
            <FaCreditCard />
            <FaBitcoin />
          </div>
        </div>
      </form>
    </Container>
  );
}

export default Login;
