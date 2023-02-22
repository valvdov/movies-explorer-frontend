import './ShowMore.css';

const ShowMoreButton = (props) => {
    return (
        <section className="more-button">
            <button type="button" className="movies-card-list__show-more" onClick={props.onClick}>
                {props.children}
            </button>
        </section>
    );
}

export default ShowMoreButton;
