import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [filterResult, setFilterResult] = useState(persons);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} setResult={setFilterResult} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      {filterResult.map((person)=><Person key={person.name} person={person}/>)}
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
    if (persons.some(user => user.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('');
    setNewNumber('');
    console.log(persons);
  }

  return (
    <form>
      <div>name: <input type='text' value={newName} onChange={handleNewName}/></div>
      <div>number: <input type='tel' value={newNumber} onChange={handleNewNumber}/></div>
      <div>
        <button type="submit" onClick={handleSubmit}>add</button>
      </div>
    </form>
  )
}

const Person = ({person}) => {
  return <p>{`${person.name} ${person.number}`}</p>
}

const Filter = ({persons, setResult}) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    setResult(persons.filter((person)=>person.name.toLowerCase().includes(inputValue.toLowerCase())));
  }
  
  return (<div>filter shown with <input type='text' value={searchInput} onChange={handleSearch}/></div>)
}