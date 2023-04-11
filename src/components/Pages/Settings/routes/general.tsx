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
        <Switch
          onClick={() =>
            setSettings((prev) => ({
              ...prev,
              theme: prev.theme === "light" ? "dark" : "light",
            }))
          }
          isOn={settings.theme === "dark"}
        />
      </Option>
      <Option text="Kaki!">
        <RadioContainer name="test">
          <RadioInput
            value="Light"
            checked={settings.theme == "light"}
            onClick={() => updateSettings({ theme: "light" })}
            description="Everbody can see your playlists"
          />
          <RadioInput
            value="Dark"
            onClick={() => updateSettings({ theme: "dark" })}
            checked={settings.theme == "dark"}
            description="Only for people that follow you"
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
