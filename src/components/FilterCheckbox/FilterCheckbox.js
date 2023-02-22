import "./FilterCheckbox.css";

export default function FilterCheckbox( {onChange} ) {
    const handleChange = (e) => {
        const { checked } = e.target;
        onChange({ checked });
    }

    return (
    <label className="filter">
      <input className="filter__checkbox" type="checkbox" onChange={handleChange}/>
      <span className="filter__tumbler"></span>
      <span className="filter__text">Короткометражки</span>
    </label>
  );
}
