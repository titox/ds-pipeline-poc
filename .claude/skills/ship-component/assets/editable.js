// Makes every [data-edit] element in a documentation preview editable and adds
// a bar to save the changes. Served by scripts/preview-server.mjs at /__editable.js.
(function () {
  const page = document.documentElement.dataset.page;
  const nodes = [...document.querySelectorAll("[data-edit]")];
  if (!page || !nodes.length) return;

  const original = new Map();
  const clean = (s) => s.replace(/\s+/g, " ").trim();

  const style = document.createElement("style");
  style.textContent = `
    [data-edit] { border-radius: 4px; outline-offset: 2px; cursor: text; }
    [data-edit]:hover { outline: 1px dashed #8a8a8a; }
    [data-edit]:focus { outline: 2px solid #2563eb; }
    [data-edit][data-changed] { background: rgba(250, 204, 21, 0.28); }
    .edit-bar { position: fixed; left: 50%; bottom: 16px; transform: translateX(-50%); z-index: 9999;
      display: flex; gap: 12px; align-items: center; padding: 10px 14px; border-radius: 10px;
      background: #1e1e1e; color: #fff; font: 14px/1.4 system-ui, sans-serif; box-shadow: 0 6px 24px rgba(0,0,0,.3); }
    .edit-bar button { font: inherit; padding: 6px 12px; border-radius: 6px; border: 1px solid #fff; background: #fff; color: #1e1e1e; cursor: pointer; }
    .edit-bar button.quiet { background: transparent; color: #fff; }
    .edit-bar button:disabled { opacity: .5; cursor: default; }
    body { padding-bottom: 80px; }
  `;
  document.head.appendChild(style);

  const bar = document.createElement("div");
  bar.className = "edit-bar";
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", "Text edits");
  bar.innerHTML =
    '<span class="edit-count" aria-live="polite"></span>' +
    '<button type="button" class="edit-save">Save edits</button>' +
    '<button type="button" class="quiet edit-reset">Discard</button>';
  document.body.appendChild(bar);
  const count = bar.querySelector(".edit-count");
  const save = bar.querySelector(".edit-save");
  const reset = bar.querySelector(".edit-reset");

  const changed = () => nodes.filter((n) => clean(n.textContent) !== original.get(n));

  function refresh(message) {
    const list = changed();
    nodes.forEach((n) => n.toggleAttribute("data-changed", list.includes(n)));
    count.textContent =
      message || (list.length ? `${list.length} text change${list.length === 1 ? "" : "s"} not saved` : "Click any text to edit it");
    save.disabled = reset.disabled = list.length === 0;
  }

  nodes.forEach((n) => {
    original.set(n, clean(n.textContent));
    n.setAttribute("contenteditable", "plaintext-only");
    if (n.contentEditable !== "plaintext-only") n.setAttribute("contenteditable", "true");
    n.setAttribute("spellcheck", "true");
    n.addEventListener("input", () => refresh());
    // Keep each piece of text on one line: Enter finishes the edit.
    n.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        n.blur();
      }
    });
    // Editable text inside a link or tab must not trigger it.
    n.addEventListener("click", (e) => e.preventDefault());
  });

  reset.addEventListener("click", () => {
    nodes.forEach((n) => (n.textContent = original.get(n)));
    refresh();
  });

  save.addEventListener("click", async () => {
    const edits = changed().map((n) => ({ key: n.dataset.edit, before: original.get(n), after: clean(n.textContent) }));
    save.disabled = true;
    try {
      const res = await fetch(`/__edits?page=${encodeURIComponent(page)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits }),
      });
      if (!res.ok) throw new Error(String(res.status));
      refresh(`${edits.length} change${edits.length === 1 ? "" : "s"} saved. You can keep editing, or go back to the chat.`);
      save.disabled = false;
    } catch (err) {
      refresh(`Could not save (${err.message}). Is the preview server running?`);
    }
  });

  window.addEventListener("beforeunload", (e) => {
    if (changed().length && !count.textContent.includes("saved.")) e.preventDefault();
  });

  refresh();
})();
