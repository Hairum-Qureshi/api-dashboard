import CodeMirror from "@uiw/react-codemirror";
import { historyField } from "@codemirror/commands";

export default function JSONContent() {
	const stateFields = { history: historyField };
	const serializedState = localStorage.getItem("myEditorState");
	const value = "";

	return (
		<div className="w-full h-full rounded-md">
			<CodeMirror
				height="384px"
				value={value}
				initialState={
					serializedState
						? {
								json: JSON.parse(serializedState || ""),
								fields: stateFields
							}
						: undefined
				}
				onChange={(value, viewUpdate) => {
					// localStorage.setItem("myValue", value);
					// const state = viewUpdate.state.toJSON(stateFields);
					// localStorage.setItem("myEditorState", JSON.stringify(state));
				}}
			/>
		</div>
	);
}
