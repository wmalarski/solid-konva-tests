import { Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { Sample, SampleEditorValue } from "../SampleEditor.utils";

type Props = {
  sample: Sample;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

export const SampleCard: Component<Props> = (props) => {
  const onRemoveClick = () => {
    props.onValueChange("samples", (samples) =>
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
