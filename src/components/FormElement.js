import { useState, useRef } from 'react';
const FormElement = ({ buttonCallback, teamNameSetter, buttonLabel }) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();
  const clickHandler = () => {
    teamNameSetter(inputRef.current.value);
    buttonCallback();
  };
  return (
    <div>
      <label
        htmlFor="teamNameInput"
        value={inputValue}
        onChange={(e) => {
          e.preventDefault();
          setInputValue(e.target.value);
        }}
      >
        Team name:
      </label>
      <input id="teamNameInput" type="text" ref={inputRef} />
      <button onClick={clickHandler}>{buttonLabel}</button>
    </div>
  );
};

export default FormElement;
