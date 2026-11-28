import toolsets from "./figma-desktop-bridge.tools.json";

type Tool = {
  name: string;
  summary: string;
  registered: boolean;
  kind: string;
  rest: string;
  note?: string;
};

const KIND_LABEL: Record<string, string> = {
  read: "Reads",
  session: "Session",
  create: "Creates",
  update: "Updates",
  file: "Writes files",
  destructive: "Can delete or overwrite",
};

const REST_LABEL: Record<string, string> = {
  yes: "Yes",
  partly: "Partly",
  no: "No",
};

/** Totals shown at the top of the tools page. */
export function ToolTotals() {
  const all = toolsets.flatMap((set) => set.tools as Tool[]);
  const count = (test: (tool: Tool) => boolean) => all.filter(test).length;
  return (
    <table>
      <thead>
        <tr>
          <th>Measure</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tools named in the toolset list</td>
          <td>{all.length}</td>
        </tr>
        <tr>
          <td>Registered in this local build</td>
          <td>{count((tool) => tool.registered)}</td>
        </tr>
        <tr>
          <td>Read only</td>
          <td>{count((tool) => tool.kind === "read")}</td>
        </tr>
        <tr>
          <td>Can delete or overwrite</td>
          <td>{count((tool) => tool.kind === "destructive")}</td>
        </tr>
        <tr>
          <td>Need the Figma token and the REST switch</td>
          <td>{count((tool) => tool.rest === "yes")}</td>
        </tr>
      </tbody>
    </table>
  );
}

/** One table per toolset, built from the data file. */
export function ToolsReference() {
  return (
    <>
      {toolsets.map((set) => (
        <section key={set.id}>
          <h3 id={`toolset-${set.id}`}>
            {set.id} ({set.tools.length})
          </h3>
          <p>{set.description}</p>
          <table>
            <thead>
              <tr>
                <th>Tool</th>
                <th>What it does</th>
                <th>Effect</th>
                <th>Token</th>
              </tr>
            </thead>
            <tbody>
              {(set.tools as Tool[]).map((tool) => (
                <tr key={tool.name}>
                  <td>
                    <code>{tool.name}</code>
                  </td>
                  <td>
                    {tool.summary}
                    {tool.note ? ` ${tool.note}.` : ""}
                  </td>
                  <td>{KIND_LABEL[tool.kind] ?? tool.kind}</td>
                  <td>{REST_LABEL[tool.rest] ?? tool.rest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}
    </>
  );
}
