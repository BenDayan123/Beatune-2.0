import React, { useEffect, useState } from "react";
import Switch from "../../../Switch";
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
import { useLocalStorage } from "usehooks-ts";
import { Option } from "../option";
import { RadioInput, RadioContainer } from "../../../Inputs/Radio";
import { ISettings } from ".";

const GeneralPage: React.FC = () => {
  const [settings, setSettings] = useLocalStorage<ISettings>(
    "settings",
    {} as ISettings
  );
  const [isRunOnStartup, setOnStartup] = useState<boolean>(false);

  function getRunOnStartup() {
    isEnabled().then(setOnStartup);
  }
  useEffect(getRunOnStartup, []);

  function updateSettings(data: any) {
    setSettings((prev) => ({ ...prev, ...data }));
  }

  return (
    <>
      <Option
        text="Interface theme"
        description="Select or customize you UI theme."
      >
        <RadioContainer name="light">
          <RadioInput
            value="Light"
            checked={settings.theme == "light"}
            onClick={() => updateSettings({ theme: "light" })}
          />
          <RadioInput
            value="Dark"
            onClick={() => updateSettings({ theme: "dark" })}
            checked={settings.theme == "dark"}
          />
          <RadioInput value="OS" description="Base on The Computer's Theme" />
        </RadioContainer>
      </Option>
      <Option
        text="Open Beatune"
        description="Run The application on computer startup"
        desktopOnly
      >
        <Switch
          onClick={() => {
            isRunOnStartup ? disable() : enable();
            getRunOnStartup();
          }}
          isOn={isRunOnStartup}
        />
      </Option>
    </>
  );
};

export default GeneralPage;
