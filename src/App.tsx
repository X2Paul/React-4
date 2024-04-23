import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserInterface } from './types/UserInterface';

const App = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState(5);

  useEffect(() => {
    const fetchDataAndHandleErrors = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        setUsers([response.data])
      } catch (error) {
        setError('Error fetching data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDataAndHandleErrors();
  }, [id]);

  const handleIdChange = (newId: number) => {
    setId(newId);
  };

  return (
    <div>
      <h1>Users list</h1>
      <div>
        <label htmlFor="idInput">Enter User ID:</label>
        <input type="number" id="idInput" value={id} onChange={(e) => handleIdChange(parseInt(e.target.value))} />
      </div>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 style={{ color: 'red' }}>{error}</h2>}
      {!isLoading && !error && users.length > 0 && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
