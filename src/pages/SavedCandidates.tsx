import { useEffect, useState } from "react";


const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<any[]>([]);

  // Load saved candidates from localStorage on component mount
  useEffect(() => {
    const savedCandidates = localStorage.getItem("savedCandidates");
    if (savedCandidates) {
      setCandidates(JSON.parse(savedCandidates));
    }
  }, []);

  // Function to remove a candidate
  const removeCandidate = (id: number) => {
    const updatedCandidates = candidates.filter(candidate => candidate.id !== id);
    setCandidates(updatedCandidates);
    // Save the updated list of candidates back to localStorage
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };

  return (
    <div>
      <h1>Potential Candidates</h1>
      {candidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        <ul>
          {candidates.map((candidate: any) => (
          
         
            <li key={candidate.id}><img src={candidate.avatar_url} alt={candidate.login} style={candidate.avatar} className="imgSize"/>
              {candidate.login} <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default SavedCandidates;
