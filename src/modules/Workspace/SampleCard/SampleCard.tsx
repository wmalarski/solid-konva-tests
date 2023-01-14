import { Component } from "solid-js";
import { Sample } from "../Workspace.utils";
import { useWorkspaceContext } from "../WorkspaceContext";

type Props = {
  sample: Sample;
};

export const SampleCard: Component<Props> = (props) => {
  const workspace = useWorkspaceContext();

  const onRemoveClick = () => {
    workspace.onChange("samples", (samples) =>
      samples.filter((sample) => sample.id !== props.sample.id)
    );
  };

  return (
    <div class="flex flex-col gap-2">
      <button class="btn" onClick={onRemoveClick}>
        Remove
      </button>
      <pre>{JSON.stringify(props.sample, null, 2)}</pre>
    </div>
  );
};
