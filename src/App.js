import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {

  

  async function handleAddRepository(id) {

    let newRepository = {
      title: "Desafio ReactJS",
      url:"abc.com",
      techs: ["JS", "ReactsJS"],
      likes: 0
    }

    const response = await api.post('/repositories', newRepository)

    const repository = response.data;

    setRepositories([...repositories, repository])

  }

  async function handleRemoveRepository(id) {  

    const isDeleted = await api.delete(`/repositories/${id}`)

    isDeleted.status === 204
      ? console.log('Deleted')
      : console.log('Not deleted')

    const remainingRepositories = repositories.filter(repository => repository.id !== id)

    setRepositories(remainingRepositories)

  }

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (

              <li key={repository.id}>
                {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
