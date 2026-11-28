# Figma Desktop Bridge (local only)

The Figma Desktop Bridge is the plugin that lets an AI assistant read and change the open Figma file. It runs inside Figma desktop and talks to a small server on the same computer. This copy only talks to `localhost`.

Source: the `figma-desktop-bridge-local` repository on GitHub (`<account>/figma-desktop-bridge-local`). It is a copy of figma-console-mcp 2.1.1 (MIT licence) with Cloud Mode removed.

## Status

| Item | State on 2026-11-28 |
| --- | --- |
| Repository read and checked | Done |
| Cloned to `~/figma-desktop-bridge-local` | Done |
| Server installed (`npm install`) | Not done |
| Claude pointed at the local server | Not done. Claude still runs the official `figma-console-mcp@2.0.0` |
| Plugin re-imported in Figma from the local manifest | Not done. Figma still has the official plugin, which lists the cloud relay |
| Tested against the Figma file | Not done |

## The two parts

| Part | Where | What it does |
| --- | --- | --- |
| Plugin | `manifest.json`, `code.js`, `ui.html` at the repository root | Runs in Figma. Carries out each command with the Figma Plugin API and sends the result back |
| Server | `server/` | Runs on the computer. Gives the assistant its tools and passes each call to the plugin |

## How it connects

```
Assistant  →  MCP server  →  WebSocket on localhost (ports 9223 to 9232)  →  Plugin window  →  Plugin worker  →  Figma
```

1. The server opens a WebSocket on port 9223. If the port is taken it tries the next one, up to 9232.
2. The plugin scans the ten ports and connects to every server it finds.
3. The server sends a command as JSON. The plugin runs it and returns the result or an error.
4. Several servers can be connected at once, for example the Chat and Code tabs of the Claude app.

## What changed from the original

| File | Change |
| --- | --- |
| `manifest.json` | Removed `figma-console-mcp.southleft.com` (HTTPS and WSS). The plugin can only reach `localhost` |
| `ui.html` | Removed the cloud pairing panel, its styles, the relay WebSocket and the retry logic |
| `code.js` | Removed the saved pairing code and the message that restored it |
| Server | A Figma token alone does nothing. The server calls `api.figma.com` only when `FIGMA_ALLOW_REST=1` is also set |
| Server | Removed the Southleft links, the source maps and the `southleft.com` schema addresses in generated token files |

The exact differences are in `patches/` in the repository.

## What we checked

We scanned every file in the repository for outside addresses on 2026-11-27.

- The plugin manifest allows `localhost` only.
- The relay address appears only in `patches/`, as removed lines.
- The only outside address the server code calls is `api.figma.com`, in one place (`server/dist/core/figma-api.js`), behind the token and the switch.
- Not checked by us: the README says a test with a stubbed `fetch` gave 0 requests without the switch. We read the code but did not run that test.

## Security

- The WebSocket is local and has no sign-in. It relies on being bound to `localhost`. Do not forward the ports to another machine.
- The plugin uses the standard Figma Plugin API and works on the open file only.
- The manifest asks for the `teamlibrary` permission and for `enablePrivatePluginApi`, the same as the original.

## Known gaps

- This copy gets no updates from the original. Compare the two when the original changes.
- The plugin keeps the same id as the official one. An old pairing code may remain in Figma's storage for that id. This version never reads it.
- `server/figma-desktop-bridge/README.md` is the original text and still describes Cloud Mode. That part does not apply to this copy.
- `figma_pair_plugin` is still named in the `debug` toolset list, but the local build does not register it.
