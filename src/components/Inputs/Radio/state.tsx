import React, { createContext, useState, PropsWithChildren } from "react";

type State = {
  checked: string;
  setChecked: React.Dispatch<React.SetStateAction<string>>;
  name: string;
};

const RadioContex = createContext<State>({} as State);

export function useRadioState() {
  return React.useContext(RadioContex);
}

interface Props {
  name: string;
  title?: string;
}

export const RadioContainer: React.FC<PropsWithChildren<Props>> = ({
  children,
  name,
  title,
}) => {
  const [checked, setChecked] = useState("");
  return (
    <RadioContex.Provider value={{ checked, setChecked, name }}>
      <div className="radios-container" style={{ padding: "1.5em" }}>
        {title && <h2 id="title">{title}</h2>}
        {children}
      </div>
    </RadioContex.Provider>
  );
};
