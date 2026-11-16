# Corner Set — Prototype 3

Run from the repository root.

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Open [Corner Set](http://127.0.0.1:8765/prototype/v3/). On desktop, the screen sits inside a phone frame. At mobile widths it fills the viewport.

## Navigation

| Role | Flow |
| --- | --- |
| Audience | Discover → Live near You, Recommend for You, or category results → Performer Details → I'm Here → ticket and tipping |
| Audience | Browse → search or Random Pick → Performer Details. Drag the Live Shows handle up for List View. Use the Map button in the expanded list to return to the map. Favorite collects saved performers. |
| Performer | Home → Place A Set → Browse → select a marker → Use This Area → Performance Detail. More Details opens Location Details. |
| Performer | Performance Detail → Start Now → Confirm Performance → Active Performance → End Set |
| Performer | Performance Detail → Schedule Later → Schedule Performance → Home → Next Set → edit, save, or cancel after confirmation |
| Both | Use the role control on the landing page or Profile to switch roles. |

On desktop, drag the page vertically or use the mouse wheel. Drag the Discover carousels horizontally, or swipe them on a touchscreen. Use the preview chip to simulate playing, pausing, resuming, and replaying a 15-second preview.

Click the status badge during an active performance to switch between simulated offline and online states. The timer and duration controls work locally. Reconnecting publishes pending changes in the prototype. After ending offline, the end update remains pending until connectivity is restored. To reconnect in the simulation, use the badge during an active performance.

The maps use the Figma map imagery with zoom and selectable markers. Location and Direction previews center the themed OpenFreeMap imagery on the corresponding approximate location. Pending and published performances, favorites, and mock tips persist in the browser.

Browse filters in both roles, the Direction preview and Direct button, Audience Preview editing, Performance History, profile options, Help Center, and Settings display Coming Soon. Payments and connectivity changes are simulated locally.
