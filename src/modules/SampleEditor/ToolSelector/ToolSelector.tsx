/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from "solid-js";
import { SetStoreFunction } from "solid-js/store";
import { SampleEditorValue, Tool, useSelectedId } from "../SampleEditor.utils";

type Props = {
  tool: Tool;
  onValueChange: SetStoreFunction<SampleEditorValue>;
};

export const ToolSelector: Component<Props> = (props) => {
  const { setSelectedId } = useSelectedId();

  const handleChange = (tool: Tool) => {
    props.onValueChange("tool", tool);
    setSelectedId();
  };

  return (
    <div class="flex flex-col gap-2">
      <div>
        <label>
          <input
            class="radio"
            type="radio"
            value="creator"
            checked={props.tool === "creator"}
            onChange={() => handleChange("creator")}
          />
          Creator
        </label>
      </div>

      <div>
        <label>
          <input
            class="radio"
            type="radio"
            value="selector"
            checked={props.tool === "selector"}
            onChange={() => handleChange("selector")}
          />
          Selector
        </label>
      </div>
    </div>
  );
};
