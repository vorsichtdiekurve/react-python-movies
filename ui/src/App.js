import './App.css';
import {useState} from "react";
import {useEffect} from "react";
import "milligram";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import ActorsList from "./ActorsList"
import ActorForm from "./ActorForm";
import ActorAssignment from "./ActorAssignment";

function App() {
    const [movies, setMovies] = useState([]);
    const [addingMovie, setAddingMovie] = useState(false);
    const [actors, setActors] = useState([]);
    const [addingActor, setAddingActor] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        const fetchActors = async () => {
            const response = await fetch(`/actors`);
            if (response.ok) {
                const actors = await response.json();
                setActors(actors);
            }
        };
        fetchActors();
    }, []);

    const fetchMovies = async () => {
        const response = await fetch(`/movies`);
        if (response.ok) {
            const movies = await response.json();
            setMovies(movies);
        }
    };

    async function handleAddMovie(movie) {
         const response = await fetch('/movies', {
             method: 'POST',
             body: JSON.stringify(movie),
             headers: { 'Content-Type': 'application/json' }
         });
         if (response.ok) {
             const newMovie = await response.json();
             setMovies([...movies, newMovie]);
             setAddingMovie(false);
         }
    }

    async function handleDeleteMovie(movie) {
        const response = await fetch(`/movies/${movie.id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setMovies(movies.filter(m => m !== movie));
        }
    }

    async function handleAddActor(actor) {
         const response = await fetch('/actors', {
             method: 'POST',
             body: JSON.stringify(actor),
             headers: { 'Content-Type': 'application/json' }
         });
         if (response.ok) {
             const newActor = await response.json();
             setActors([...actors, newActor]);
             setAddingActor(false);
         }
    }

    async function handleDeleteActor(actor) {
        const response = await fetch(`/actors/${actor.id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            setActors(actors.filter(a => a !== actor));
        }
    }

    async function handleAssignActorToMovies(actorId, movieIds) {
        document.activeElement.blur();
        for (const movieId of movieIds) {
            console.log(movieId)
            const response = await fetch(`/movies/${movieId}/actor/${actorId}`, {
                method: 'POST'
            });
            if (response.ok) {
                fetchMovies();
            }
        }
    }

    return (
        <div className="container">
            <h1>My favourite movies to watch</h1>
            {movies.length === 0
                ? <p>No movies yet. Maybe add something?</p>
                : <MoviesList movies={movies}
                              onDeleteMovie={(movie) => handleDeleteMovie(movie)}
                />}
            {addingMovie
                ? <MovieForm onMovieSubmit={handleAddMovie}
                             buttonLabel="Add a movie"
                />
                : <button onClick={() => setAddingMovie(true)}>Add a movie</button>}

            <h1>My favourite actors</h1>
            {actors.length === 0
                ? <p>No actors yet. Maybe add anyone?</p>
                : <ActorsList actors={actors}
                              onDeleteActor={(actor) => handleDeleteActor(actor)}
                />}
            {addingActor
                ? <ActorForm onActorSubmit={handleAddActor}
                             buttonLabel="Add an actor"
                />
                : <button onClick={() => setAddingActor(true)}>Add an actor</button>}
            <h1>Assign actors to movies</h1>
            <ActorAssignment actors={actors}
                             movies={movies}
                             onAssign={handleAssignActorToMovies}/>
        </div>
    );
}

export default App;
