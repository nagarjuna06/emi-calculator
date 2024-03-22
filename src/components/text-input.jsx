const TextInput = ({ title, state, setState, placeholder }) => {
  return (
    <>
      <span className="title">{title}</span>
      <input
        type="number"
        className="input"
        value={state}
        min={0}
        placeholder={placeholder}
        onChange={(e) => setState(e.target.value)}
      />
    </>
  );
};

export default TextInput;
