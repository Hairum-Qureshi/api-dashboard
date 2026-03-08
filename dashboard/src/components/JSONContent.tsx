import CodeMirror from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";
import { useState } from "react";

export default function JSONContent({ json }: { json?: any }) {
	const stateFields = { history: historyField };
	const serializedState = localStorage.getItem("myEditorState");
	const [value, setValue] = useState<any>(json);

	return (
		<div className="w-full h-full rounded-md text-base">
			<CodeMirror
				height="384px"
				value={value}
				readOnly={json !== undefined}
				initialState={
					serializedState
						? {
								json: JSON.parse(serializedState || ""),
								fields: stateFields
							}
						: undefined
				}
				onChange={value => {
					setValue(value);
				}}
			/>
		</div>
	);
}
