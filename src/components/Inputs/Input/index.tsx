import React, { useState } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import "./style.scss";

// TODO Handle input errors/validation

type validationType = {
  check: boolean;
  msg?: string;
};

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  labelText: string;
  setDisable?: React.Dispatch<React.SetStateAction<boolean>>;
  validations?: (value: string) => validationType[];
}

const Input: React.FC<Props> = ({
  labelText,
  state,
  icon: Icon,
  setDisable,
  validations,
  ...rest
}) => {
  const [value, setValue] = state;
  const [isVaild, setVaild] = useState<boolean>(true);

  function handleState(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    const { value } = e.currentTarget;
    setValue(value);
    const vaild = checkForVaildion(value);
    setVaild(vaild);
  }

  function checkForVaildion(value: string) {
    if (validations) {
      const vaild = validations(value).every(({ check }) => check);
      setDisable && setDisable(!vaild);
      return vaild;
    }
    return false;
  }

  return (
    <>
      <div className={"input-container " + (isVaild ? "vaild" : "invaild")}>
        <input
          {...rest}
          onInput={handleState}
          value={value}
          title=""
          required
          autoComplete="off"
          placeholder="&#8205;"
        />
        <label>{labelText}</label>
        {Icon && <Icon className="icon" />}
      </div>

      {!isVaild && (
        <div className="validation-container">
          {validations &&
            validations(value).map(({ msg, check }, i) => {
              return (
                !check &&
                msg && (
                  <div className="error-message" key={i}>
                    {msg}
                  </div>
                )
              );
            })}
        </div>
      )}
    </>
  );
};

export { Input };
