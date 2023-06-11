import React, { useState } from 'react';
import axios from 'axios';

function GithubRepos() {

    const [username, setUsername] = useState('');
    const [repositories, setRepositories] = useState('No Github Repositories found.');


    const fetchRepositories = async  () => {
        try {
            const response = await axios.get(`https://api.github.com/users/${username}/repos`);
            const repositories = response.data;
            setRepositories(repositories);
        }
        catch (error) {
            setRepositories('No Github Repositories found.');
        }
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchRepositories();
    }

    return(
        <div className="github-repos">
            <form className="form" onSubmit={handleSubmit}>
            <label>Input Github Username</label><br/>
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter GitHub username"
                required
            />
            <button type="submit">Fetch Repositories</button>
            </form>
    

            <h2>Repositories</h2>
            <p className='instructions'>The results will only show Github Repositories set us public.</p>
            <div>
                {repositories.length > 0 && repositories !== 'No Github Repositories found.' ? (
                    <ul>
                        {
                            repositories.map((repo) => (
                                <li key={repo.id}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                                </li>
                            ))
                        }
                    </ul>
                ) : (
                    <p>No Github Repositories found.</p>
                )}
            </div>
      </div>
    );
}

export default GithubRepos;