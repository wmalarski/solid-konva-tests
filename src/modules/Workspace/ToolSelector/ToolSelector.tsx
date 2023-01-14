/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component } from "solid-js";
import { Tool, useSelectedId } from "../Workspace.utils";
import { useWorkspaceContext } from "../WorkspaceContext";

type Props = {
  tool: Tool;
};

export const ToolSelector: Component<Props> = (props) => {
  const workspace = useWorkspaceContext();
  const { setSelectedId } = useSelectedId();

  const handleChange = (tool: Tool) => {
    workspace.onChange("tool", tool);
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
