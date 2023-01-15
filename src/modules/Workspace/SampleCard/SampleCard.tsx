import { Component, Show } from "solid-js";
import { Sample, useSelectedId } from "../Workspace.utils";
import { useWorkspaceContext } from "../WorkspaceContext";

type Props = {
  sample: Sample;
};

export const SampleCard: Component<Props> = (props) => {
  const workspace = useWorkspaceContext();
  const { selectedId, setSelectedId } = useSelectedId();

  const onRemoveClick = () => {
    workspace.onChange("samples", (samples) =>
      samples.filter((sample) => sample.id !== props.sample.id)
    );
  };

  const onSelectClick = () => {
    const isSelected = props.sample.id === selectedId();
    setSelectedId(isSelected ? undefined : props.sample.id);
  };

  return (
    <div class="flex flex-col gap-2">
      <button class="btn" onClick={onRemoveClick}>
        Remove
      </button>
      <button class="btn" onClick={onSelectClick}>
        <Show when={selectedId() === props.sample.id} fallback="Deselect">
          Select
        </Show>
      </button>
      <pre>{JSON.stringify(props.sample, null, 2)}</pre>
    </div>
  );
};
