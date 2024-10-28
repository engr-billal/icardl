"use client";
import React, { MouseEventHandler, useEffect, useState } from "react";
import { MdAddToHomeScreen } from "react-icons/md";

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log("beforeinstallprompt event triggered");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const onClick: MouseEventHandler = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      console.log("PromptInstall is null");
      return;
    }
    console.log("Prompting installation");
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    console.log("PWA not supported");
    return null;
  }

  return (
    <MdAddToHomeScreen
      id="setup_button"
      size={40}
      className="link-button cursor-pointer bg-gray-200 p-2 rounded-full fixed top-3 right-3"
      onClick={onClick}
    />
  );
};

export default InstallPWA;
