const SliderInput = ({
  title,
  state,
  onChange,
  min,
  max,
  labelMin = "",
  labelMax = "",
  value = "",
  result = "",
}) => {
  return (
    <>
      <span className="title">{title}</span>
      {state > 0 && <span className="result__title">{result}</span>}
      <div className="slider">
        <input
          type="range"
          className="input"
          min={min}
          max={max}
          value={state}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="slider__status">
          <label>{labelMin}</label>
          <label>{value}</label>
          <label>{labelMax}</label>
        </div>
      </div>
    </>
  );
};

export default SliderInput;
