export default function MovieListItem(props) {

    function getActorsString(actors) {
        return actors.map(actor => actor.name + ' ' + actor.surname).join(", ")
    }

    return (
        <div>
            <div>
                <strong>{props.movie.title}</strong>
                {' '}
                <span>({props.movie.year})</span>
                {' '}
                directed by {props.movie.director}
                {' '}
                {props.movie.actors.length > 0 && `starring ${getActorsString(props.movie.actors)} `}
                <a onClick={props.onDelete}>Delete</a>
            </div>
            {props.movie.description}
        </div>
    );
}
