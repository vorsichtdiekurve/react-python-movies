import {useState} from "react";

import MovieCheckBoxListItem from "./MovieCheckBoxListItem";

export default function ActorAssignment(props) {
    const [actorId, setActorId] = useState('');
    const [movieIds, setMovieIds] = useState([]);

    function handleMovieChecked(movieId, checked) {
        if (checked) {
            setMovieIds([...movieIds, movieId]);
        } else {
            setMovieIds(movieIds.filter(id => id !== movieId));
        }
    }

    return (
    <div class="row">
        <div class="column">
            <label>Choose an actor</label>
            <select onChange={(event) => setActorId(event.target.value)} value={actorId || ''}>
                <option value="" disabled hidden>Choose an actor</option>
                {props.actors.map(actor => <option key={actor.id}
                                                   value={actor.id}>{actor.name} {actor.surname}</option>)}
            </select>
            <button type="reset" onClick={() => props.onAssign(actorId, movieIds)}>Assign</button>
        </div>
        <div class="column">
            <label>Choose movies</label>
            <ul>
                {props.movies.map(movie =>
                    <MovieCheckBoxListItem key={movie.id}
                                           movie={movie}
                                           onCheck={(checked) => handleMovieChecked(movie.id, checked)}/>)}
            </ul>
        </div>
    </div>);
}