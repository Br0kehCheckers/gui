import React, { useEffect, useState } from "react";
import { getUsers, getCheckers, isAdmin } from "../../services/api";
import Dashboard from "../Dashboard";

import Header from "../../components/Header";
import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container } from "./styles";

import { api } from "../../services/api";
import { useAlert } from "react-alert";

function Admin() {
  const alerts = useAlert();
  const [isAdm, setIsAdm] = useState(false);
  const [checkers, setCheckers] = useState([]);
  const [users, setUsers] = useState([]);

  //inputs addChecker
  const [apiUrl, setApiUrl] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("cartao");

  // inputs
  const [userNome, setUserNome] = useState("");
  const [numCreditos, setNumCreditos] = useState("");

  const fetchAdmin = async () => {
    setIsAdm(await isAdmin());
  };
  const fetchCheckers = async () => {
    let list = await getCheckers();
    setCheckers([...list.login, ...list.cartao]);
  };

  const fetchUsers = async () => {
    let list = await getUsers();
    setUsers(list);
  };
  useEffect(() => {
    fetchAdmin();
    fetchUsers();
    fetchCheckers();
  }, []);

  const updateUser = async (event) => {
    event.preventDefault();

    if (!numCreditos || !userNome) {
      return alerts.error("Especifique usuário e total de créditos");
    }

    try {
      let response = await api.put(
        "/users",
        {
          nome: userNome,
          creditos: numCreditos,
        },
        { headers: { token: localStorage.getItem("token") } }
      );
      if (response.data.error) {
        return alerts.error(response.data.error);
      }

      return alerts.success(
        "Número de créditos do usuário " + userNome + " foi alterado."
      );
    } catch (error) {
      return alerts.error;
    }
  };

  const addChecker = async (event) => {
    event.preventDefault();

    if (!apiUrl || !nome || !tipo) {
      return alerts.error("Especifique nome, api e tipo do checker!");
    }

    try {
      let token = localStorage.getItem("token");
      let response = await api.post(
        "/checkers",
        { nome, api: apiUrl, tipo },
        { headers: { token } }
      );

      if (response.data.error) return alerts.error(response.data.error);

      alerts.success("Checker adicionado!");

      fetchCheckers();
    } catch {
      return alerts.error("Erro na requisição.");
    }
  };

  const deleteChecker = async (name) => {
    try {
      let token = localStorage.getItem("token");
      let response = await api.delete("/checkers/" + name, {
        headers: { token },
      });

      if (response.data.error) return alerts.error(response.data.error);

      alerts.success("Checker deletado com sucesso");

      fetchCheckers();
    } catch (error) {
      alerts.error("Erro ao tentar deletar usuário.");
    }
  };

  return isAdm ? (
    <Container>
      <Header />
      <main>
        <div>
          <h3>Editar créditos</h3>
          <Input
            onChange={(e) => setUserNome(e.target.value)}
            type="text"
            placeholder="Usuário"
          />
          <Input
            onChange={(e) => setNumCreditos(e.target.value)}
            type="number"
            placeholder="Créditos"
          />
          <Button onClick={updateUser}>Editar</Button>
        </div>
        <div>
          <h3>Adicionar checker</h3>
          <Input
            onChange={(e) => setNome(e.target.value)}
            type="text"
            placeholder="Nome"
          />
          <Input
            onChange={(e) => setApiUrl(e.target.value)}
            type="url"
            placeholder="API"
          />
          <select onChange={(e) => setTipo(e.target.value)} name="" id="">
            <option selected value="cartao">
              Cartão
            </option>
            <option value="login">Login</option>
          </select>
          <Button onClick={addChecker}>Adicionar</Button>
        </div>

        <div>
          <h3>Lista de usuários</h3>
          {users.map((user) => (
            <div>
              <span>{user.login}</span>
              <span>${user.creditos}</span>
              <span>
                <Button>Remover</Button>
              </span>
            </div>
          ))}
        </div>
        <div>
          <h3>Lista de checkers</h3>
          {checkers &&
            checkers.map((checker) => (
              <div>
                <span>{checker.nome}</span>
                <span>{checker.status ? "FUNCIONANDO" : "FORA DO AR"}</span>
                <span>
                  <Button onClick={() => deleteChecker(checker.nome)}>
                    Remover
                  </Button>
                </span>
              </div>
            ))}
        </div>
      </main>
    </Container>
  ) : (
    <Dashboard />
  );
}

export default Admin;
