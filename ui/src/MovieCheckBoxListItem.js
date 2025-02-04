import {useState} from "react";

export default function MovieCheckBoxListItem(props) {
    const [checked, setChecked] = useState(props.checked || false);

    function handleCheck(checked) {
        setChecked(checked);
        props.onCheck(checked);
    }

    return (
        <div class="row">
            <input type="checkbox" checked={checked} onChange={(event) => handleCheck(event.target.checked)}></input>
            <label>{props.movie.title}</label>
        </div>
    );
}