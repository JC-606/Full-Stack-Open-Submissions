import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filterResult, setFilterResult] = useState(persons);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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
      .then(() => {
        setMessage("person deleted");
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
      .catch(error => {
        setIsError(true);
        setMessage(`Information of ${person.name} has already been removed from server`);
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError}/>
      <Filter persons={persons} setResult={setFilterResult} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage} setIsError={setIsError} />
      <h2>Numbers</h2>
      {filterResult.map((person)=><Person key={person.name} person={person} deletePerson={()=>deletePerson(person)}/>)}
    </div>
  )
}

export default App

const PersonForm = ({persons, setPersons, setMessage, setIsError}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSubmit = (event) => {
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
      .then(() => {
        setIsError(false);
        setMessage(`Updated ${newName}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000)
      })
      : null
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .then(() => {
          setIsError(false);
          setMessage(`Added ${newName}`);
          setTimeout(() => {
            setMessage(null);
          }, 5000)
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

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  const styles = isError
  ?
  {
    color: "red",
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: "solid",
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  :
  {
    color: "green",
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: "solid",
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  return (
    <div className='notification' style={styles}>
      {message}
    </div>
  )
}