export default function ActorListItem(props) {
    return (
        <div>
            <div>
                {props.actor.name}
                {' '}
                <strong>{props.actor.surname}</strong>
                {' '}
                <a onClick={props.onDelete}>Delete</a>
            </div>
        </div>
    );
}
