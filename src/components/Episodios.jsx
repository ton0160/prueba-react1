import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import ListGroup from 'react-bootstrap/ListGroup';

function Location() {

  const [episodios, setEpisodios] = useState([]);
  const [next, setNext] = useState([]);
  const [prev, setPrev] = useState([]);

  useEffect(() => {
    obtenerDatos()
  }, []);

   const obtenerDatos = async () => {
    try {
      const URL = "https://rickandmortyapi.com/api/episode";
      const response = await fetch(URL);
      const data = await response.json();
      setEpisodios(data.results);
      setNext(data.info.next);
      setPrev(data.info.prev);
      return;
    } catch (error) {
      alert(error.message);
    }
  };

  const nextPage = async () => {
    try {
      const URL = next;
      const response = await fetch(URL);
      const data = await response.json();
      setEpisodios(data.results);
      setNext(data.info.next);
      setPrev(data.info.prev);
    } catch (error) {
      alert('Esta es la ultima pagina');
    }
  };

  const prevPage = async () => {
    try {
      const URL = prev;
      const response = await fetch(URL);
      const data = await response.json();
      setEpisodios(data.results);
      setNext(data.info.next);
      setPrev(data.info.prev);
    } catch (error) {
      alert('Esta es la primera pagina');
    }
  };

  const ordenarAZ = () => {
    const orden =  [...episodios].sort((a,b) => (a.id > b.id ? 1 : -1));
    setEpisodios(orden)
  };
  const ordenarZA = () => {
    const orden =  [...episodios].sort((a,b) => (a.id < b.id ? 1 : -1));
    setEpisodios(orden)
  };

  return (
    <>
      <Header />
      <div className="paginacion">
        <Button variant="dark" className="boton" onClick={prevPage}>
          Anterior
        </Button>
        <Button variant="dark" className="boton" onClick={nextPage}>
          Siguiente
        </Button>
        <Button variant="dark" className="boton" onClick={ordenarAZ}>
          Ordenar (1-Fin)
        </Button>
        <Button variant="dark" className="boton" onClick={ordenarZA}>
          Ordenar (Fin-1)
        </Button>
      </div>
      <div className="tarjeta">
        {episodios.map((episodio) => (
          <div>
            <Card style={{ width: '18rem' }} className="sombra textoCards m-3">
                <Card.Header className="bg-dark bg-gradient text-light">{episodio.name}</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Fecha de emision: {episodio.air_date}</ListGroup.Item>
                    <ListGroup.Item>Episodio: {episodio.episode}</ListGroup.Item>
                </ListGroup>
                </Card>
          </div>
        ))}
      </div>
    </>
  );
}
export default Location;