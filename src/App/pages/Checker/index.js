import React, { useEffect, useState } from "react";
import { FaClipboard } from "react-icons/fa";
import { Redirect, useParams } from "react-router-dom";
import Card from "../../components/Card";
import Header from "../../components/Header";
import Button from "../../components/Button";
import axios from "axios";
import { Container } from "./styles";
import { getChecker, api, getUser } from "../../services/api";
import { useAlert } from "react-alert";

function Checker() {
  const [checker, setChecker] = useState({ nome: "", tipo: "", api: "" });
  const [state, setState] = useState({ running: false });
  const [user, setUser] = useState(null);
  const params = useParams();
  const [notFoundChecker, setNotFoundChecker] = useState(false);
  const [lista, setLista] = useState([]);
  const [aprovadas, setAprovadas] = useState([]);
  const [reprovadas, setReprovadas] = useState([]);
  const [falhas, setFalhas] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      let data = await getUser();
      setUser(data);
    };
    fetchUser();
  }, []);

  const alerts = useAlert();

  function abort() {
    requests.map((request) => request.cancel());
    alerts.success("Checker parado!");
  }

  function reset() {
    requests.map((request) => request.cancel());
    setLista([]);
    setAprovadas([]);
    setReprovadas([]);
    setFalhas([]);
    setRequests([]);
    setState({ running: false });
    alerts.success("Checker reiniciado!");
  }

  async function start() {
    console.log(user);
    if (user.creditos < 0.3) {
      return alerts.error("Créditos insuficientes para iniciar um teste.");
    }
    setState({ running: true });
    let queue = lista.split("\n");
    let request = axios.CancelToken.source();

    setRequests((old) => [...old, request]);
    queue.forEach(async (line, index) => {
      setTimeout(async () => {
        line = String(line).replace("\r", "");
        let response = await api.post(
          "/checkers/" + checker.nome,
          { input: line },
          {
            headers: { token: localStorage.getItem("token") },
            cancelToken: request.token,
          }
        );

        if (response.data.error) {
          setFalhas((old) => [...old, line + " ERRO: " + response.data.error]);
        } else {
          switch (response.data.type) {
            case "reprovadas":
              setReprovadas((old) => [...old, response.data.data]);
              break;
            case "aprovadas":
              setAprovadas((old) => [...old, response.data.data]);
              break;
            default:
              setFalhas((old) => [...old, response.data.data]);
          }
        }
      }, index * 5000);
    });
  }

  useEffect(() => {
    const fetchChecker = async () => {
      let data = await getChecker(params.checkerName);
      if (!data.nome) {
        return setNotFoundChecker(true);
      }
      setChecker(data);
    };

    fetchChecker();
    //eslint-disable-next-line
  }, [params.checkerName]);

  return (
    <Container>
      {notFoundChecker && <Redirect to="/dashboard" />}
      <Header />
      <main>
        <div className="title">
          <h1>Checker {checker.nome}</h1>
          <br />
          <br />
        </div>
        {state.running === false && (
          <div className="input">
            <textarea
              placeholder={
                checker.tipo === "cartao"
                  ? "4000000000000|00|0000|000"
                  : "login|senha"
              }
              onChange={(e) => setLista(e.target.value)}
              name=""
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <Button onClick={start}>Iniciar</Button>
          </div>
        )}
        {state.running && (
          <div className="stats">
            <div className="results">
              <div className="errors">STATUS: PROCESSO INICIADO...</div>
            </div>
            {aprovadas ? (
              <>
                <Card
                  style={{}}
                  title="Aprovados"
                  text={Object.keys(aprovadas).length}
                />
                <Card
                  style={{}}
                  title="Reprovados"
                  text={Object.keys(reprovadas).length}
                />
                <Card
                  style={{}}
                  title="Falhas"
                  text={Object.keys(falhas).length}
                />
                <Card
                  style={{}}
                  title="Crédito gasto"
                  text={`$${
                    Math.round(
                      (Object.keys(aprovadas).length * 1 +
                      Object.keys(reprovadas).length * 0.15) * 10
                    ) / 10
                  }`}
                />
              </>
            ) : (
              ""
            )}
            {state.running && (
              <Button onClick={abort} style={{ width: "100%", color: "#222" }}>
                PARAR
              </Button>
            )}
            <br />
            <Button onClick={reset} style={{ width: "100%", color: "#222" }}>
              REINICIAR
            </Button>
            <br />
            <div className="results">
              <div className="lives">
                <div className="header">
                  <h3>APROVADOS</h3>
                  <button>
                    <FaClipboard /> Copiar
                  </button>
                </div>
                <div>
                  {" "}
                  {aprovadas.map((aprovada) => (
                    <div>{aprovada}</div>
                  ))}
                </div>
              </div>

              <div className="dies">
                <div className="header">
                  <h3>REPROVADOS</h3>
                  <button>
                    <FaClipboard /> Copiar
                  </button>
                </div>
                <div>
                  {reprovadas.map((reprovada) => (
                    <div>{reprovada}</div>
                  ))}
                </div>
              </div>
              <div className="errors">
                <div className="header">
                  <h3>FALHAS</h3>
                  <button>
                    <FaClipboard /> Copiar
                  </button>
                </div>
                <div>
                  {falhas.map((falha) => (
                    <div>{falha}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Container>
  );
}

export default Checker;
