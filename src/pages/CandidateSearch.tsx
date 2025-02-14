import { useState, useEffect } from 'react';
import { searchGithub} from '../api/API';
import { CSSProperties } from 'react';
import '../index.css';
interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
}

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<GitHubUser[]>([]); // Array to store added users
  const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null); // Currently displayed user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch a random GitHub user
  const fetchRandomUser = async () => {
    setLoading(true);
    try {
      const users = await searchGithub();
      if (users && users.length > 0) {
        setCurrentCandidate(users[0]); // Set the first random user as the current candidate
      }
    } catch (err) { 
      setError('Failed to fetch a random user. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a random user on component mount
  useEffect(() => {
    fetchRandomUser();
  }, []);

  // Add the current candidate to the array
  const handleAdd = () => {
    if (currentCandidate) {
      setCandidates((prev) => {
        const updatedCandidates = [...prev, currentCandidate];
        // Stringify the updated array and save it to localStorage
        localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
        return updatedCandidates;
      });
      fetchRandomUser(); // Fetch a new random user after adding
    }
  };
  

  // Cycle to the next candidate in the array
  const handleSubtract = () => {
    if (candidates.length > 0) {
      const [first, ...rest] = candidates; 
      setCandidates(rest); 
      setCurrentCandidate(first); 
    } else {
      setError('No more candidates to display.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>GitHub User Selector</h1>

      <div style={styles.buttonGroup}>
        <button onClick={handleAdd} style={styles.button} disabled={loading}>
          Add
        </button>
        <button onClick={handleSubtract} style={styles.button} disabled={candidates.length === 0}>
          Subtract
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}
      {loading && <p style={styles.loading}>Loading...</p>}

      {currentCandidate && (
        <div style={styles.card}>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.login} style={styles.avatar} />
          <div>
            <h2>{currentCandidate.login}</h2>
            <p>{currentCandidate.bio || 'No bio available'}</p>
            <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </div>
        </div>
      )}

      <h2>Added Candidates</h2>
      <ul style={styles.list}>
        {candidates.map((user) => (
          <li key={user.id} style={styles.card}>
            <img src={user.avatar_url} alt={user.login} style={styles.avatar}/>
            <p>{user.login}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              View Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styling
const styles: { [key: string]: CSSProperties } = {
  container: { textAlign: 'center', padding: '20px', maxWidth: '600px', margin: 'auto' },
  buttonGroup: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  button: { padding: '10px', cursor: 'pointer', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none' },
  error: { color: 'red', marginTop: '10px' },
  loading: { fontStyle: 'italic', marginTop: '10px' },
  card: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px', background: '#f9f9f9', textAlign: 'left', marginBottom: '10px' },
  avatar: { width: '50px', height: '50px', borderRadius: '50%' },
  list: { listStyle: 'none', padding: 0 },
};

export default CandidateSearch;
