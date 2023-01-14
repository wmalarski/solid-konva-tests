import {
  Component,
  createContext,
  createMemo,
  JSX,
  useContext,
} from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SampleEditorValue } from "./Workspace.utils";

type WorkspaceContextValue = {
  onChange: SetStoreFunction<SampleEditorValue>;
};

const WorkspaceContext = createContext<(() => WorkspaceContextValue) | null>(
  null
);

export const useWorkspaceContext = () => {
  const value = useContext(WorkspaceContext)?.();
  if (!value) {
    throw new Error("Workspace Context is not defined");
  }
  return value;
};

type Props = {
  children: JSX.Element;
  onChange: SetStoreFunction<SampleEditorValue>;
};

export const WorkspaceContextProvider: Component<Props> = (props) => {
  const value = createMemo(() => ({
    onChange: props.onChange,
  }));

  return (
    <WorkspaceContext.Provider value={value}>
      {props.children}
    </WorkspaceContext.Provider>
  );
};
