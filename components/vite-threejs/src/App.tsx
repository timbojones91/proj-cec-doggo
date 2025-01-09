import { useEffect, useState } from "react";
import { init, animate } from "./scene";
import { OverlayGUI, CanvasFrame } from "./overlaygui/overlaygui";
import ChatInput from './overlaygui/chatinput';


class ExternalTools {
  guiCallback = (n: number) => undefined
  constructor() { }
  init() {
    init();
    animate();
  }
  subscribeUI(cb: (n: number) => undefined) {
    console.log("Subscribed...")
    this.guiCallback = cb
    // registerGUIConnector(cb)
    return null;
  }
  unSubscribeUI() {
    console.log("UnSubscribed...")
    return null;
  }
}

const tools = new ExternalTools();
tools.init();

const App = () => {
  const [data, setState] = useState(0)
  useEffect(() => {
    tools.subscribeUI(setState);
    return () => {
      tools.unSubscribeUI();
    };
  }, [setState]);
  return (
    <div>
      <OverlayGUI data={data} show={true} />
      <CanvasFrame />
      <ChatInput />
    </div>
  );
};

export default App;
