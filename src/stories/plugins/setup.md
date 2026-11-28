# Set up and run

Time: about 10 minutes. Needs Node 20 or later and Figma desktop (the browser version cannot load development plugins).

## Install

1. Get the code:

   ```bash
   git clone https://github.com/<account>/figma-desktop-bridge-local.git ~/figma-desktop-bridge-local
   ```

2. Install the server:

   ```bash
   npm --prefix ~/figma-desktop-bridge-local/server install --omit=dev
   ```

3. Point the assistant at it. In the Claude configuration, the `figma-console` entry becomes:

   ```json
   {
     "type": "stdio",
     "command": "node",
     "args": ["/Users/<you>/figma-desktop-bridge-local/server/dist/local.js"]
   }
   ```

4. In Figma desktop choose Plugins, Development, Import plugin from manifest, and pick `manifest.json` from the repository root.
5. Open the Figma file and run the plugin: Plugins, Development, Figma Desktop Bridge. The status strip turns green and shows `READY`.

Figma keeps its own copy of plugin files. After the plugin files change, import the manifest again. Restarting the plugin is not enough.

If you use the official npm server instead of `server/`, import the plugin from the repository, not from `~/.figma-console-mcp/plugin/`. The official server rewrites that folder with the official plugin each time it starts.

## Settings

All settings are environment variables on the server entry.

| Variable | Effect | Default |
| --- | --- | --- |
| `FIGMA_TOOLSETS` | Toolsets to switch on at start, for example `docs,parity`, or `all` | Core tools only |
| `FIGMA_ACCESS_TOKEN` | Figma personal access token. Does nothing alone | Not set |
| `FIGMA_ALLOW_REST` | Set to `1`, with the token, to allow calls to `api.figma.com` | Off |
| `ENABLE_MCP_APPS` | Set to `true` to add the token browser and the design system dashboard | Off |
| `FIGMA_WS_PORT` | First port the server tries | 9223 |
| `FIGMA_WS_HOST` | Address the WebSocket binds to | `localhost` |
| `LOG_LEVEL` | Server log detail | Standard |

The server also reads `FIGMA_MCP_MODE`, `FIGMA_MCP_HTTP_PORT`, `FIGMA_MCP_HTTP_TOKEN`, `FIGMA_MCP_SKILLS_DIR` and `FIGMA_CONSOLE_CONFIG`. We have not used them.

## With and without a Figma token

Without a token the server only talks to `localhost`. Everything that goes through the plugin works:

- Create and change frames, text, components and variables.
- Take a screenshot of a node.
- Run the design lint and the accessibility audits.
- List variables, collections and modes.
- Build FigJam boards and Slides.

These need the token and `FIGMA_ALLOW_REST=1`:

- Comments: read, post and delete.
- Version history: list, compare, changelog, blame, open an old version.
- Library tools: components and variables by key, importing a variable from another library.
- Library analytics, which also needs an Enterprise plan.
- `figma_get_file_data` and `figma_get_component_image`.

A few tools use the REST API for part of their work, for example `figma_get_styles`, the design system kit and the adherence audits. Try them without a token first. When one needs it, the error says so.

## The plugin window

The plugin opens as a small strip and stays open until you close it.

| Control | What it does |
| --- | --- |
| Status dot and label | `READY`, `CONNECTING` or disconnected |
| Pause | Disconnects and stops the automatic reconnect |
| Reconnect | Scans the ports again and connects |
| `+` and `−` | Show or hide the options |
| Info | Shows the file and page the bridge is bound to |
| Log | Opens the activity log |
| `N server(s)` | How many servers the plugin is connected to |

The activity log shows what the assistant did in plain labels. A label comes from the first `// comment` in the code that ran, or from the Figma call it recognises. Errors are red and start with `[!]`. Repeated actions collapse into one line with a count. The copy button exports the whole log as text.

The window follows Figma's light or dark theme.

## Connection

- On start the plugin scans ports 9223 to 9232 and connects to every server it finds.
- If no server is running yet, the plugin keeps looking and connects when one appears, in about 12 seconds. Reconnect forces it at once.
- When an assistant closes, its server exits. A server that hangs is removed by the next server that starts.
- A higher `N server(s)` count than the number of assistants you have open means old servers are still running.

## When something fails

| Symptom | Fix |
| --- | --- |
| Plugin is not in the menu | Use Figma desktop. Import the manifest again. Try Plugins, Development, Refresh plugin list |
| "Not connected" or a tool times out | Check the plugin window is open and shows `READY`. Press Reconnect. Run `figma_get_status` or `figma_diagnose` |
| Commands reach the wrong file | Open Info in the plugin and check the file. Run `figma_list_open_files` |
| Variables look out of date | The plugin reads them when it opens and the server keeps them for 5 minutes. Reopen the plugin or call the tool with `refreshCache: true` |
| A tool says it needs the token | Set `FIGMA_ACCESS_TOKEN` and `FIGMA_ALLOW_REST=1`, then restart the assistant |
| A tool is not in the list | Call `figma_enable_toolsets` with its toolset, or set `FIGMA_TOOLSETS` |
| Component description is empty | Check it is set in Figma. Descriptions come from the plugin, so the plugin must be open |

Plugin messages are in Figma under Plugins, Development, Open Console. The `debug` toolset reads the same messages.
