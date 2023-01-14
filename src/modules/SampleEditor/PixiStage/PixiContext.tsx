import * as PIXI from "pixi.js";
import {
  Component,
  createContext,
  createMemo,
  JSX,
  useContext,
} from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SampleEditorValue } from "../SampleEditor.utils";

type PixiContextValue = {
  app: PIXI.Application;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

const PixiContext = createContext<() => PixiContextValue | null>(() => null);

export const usePixiContext = () => {
  const value = useContext(PixiContext)();
  if (!value) {
    throw new Error("Context is not defined");
  }
  return value;
};

type Props = {
  app: PIXI.Application;
  children: JSX.Element;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

export const PixiContextProvider: Component<Props> = (props) => {
  const value = createMemo(() => ({
    app: props.app,
    onValueChange: props.onValueChange,
  }));

  return (
    <PixiContext.Provider value={value}>{props.children}</PixiContext.Provider>
  );
};
