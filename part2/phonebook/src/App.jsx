import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterResult, setFilterResult] = useState(persons);

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .then(removedPerson => setPersons(persons.filter(p => p.id !== removedPerson.id)))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setResult={setFilterResult} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {filterResult.map((person)=><Person key={person.name} person={person} deletePerson={()=>deletePerson(person)}/>)}
    </div>
  )
}

export default App

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSubmit = () => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (persons.some(p => p.name === newName)) {
      const target = persons.find(p => p.name === newName);
      window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
      ?
      personService
      .update(target.id, newPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== target.id ? person : returnedPerson))
      })
      : null
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
    }
    setNewName('');
    setNewNumber('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input type='text' value={newName} onChange={handleNewName}/></div>
      <div>number: <input type='tel' value={newNumber} onChange={handleNewNumber}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, deletePerson}) => {

  return (<>
    <p>{`${person.name} ${person.number}`}</p>
    <button onClick={deletePerson}>delete</button>
    </>)
}

const Filter = ({persons, setResult}) => {
  const [searchInput, setSearchInput] = useState('')
  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    setResult(persons.filter((person)=>person.name.toLowerCase().includes(inputValue.toLowerCase())));
  }
  if (searchInput==="") setResult(persons);
  return (<div>filter shown with <input type='text' value={searchInput} onChange={handleSearch}/></div>)
}