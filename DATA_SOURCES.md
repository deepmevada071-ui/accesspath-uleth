# Data sources and limitations

This repository preserves the working map snapshot from application commit `b5073f7d604e166d354e0e6cd4353fb57c4bda70`. It is not an official university map or current room inventory.

| Files | Origin and processing | Limits |
|---|---|---|
| `dist/campus.json` | Campus-area OpenStreetMap records simplified to IDs, tags and coordinate arrays | OSM contributors; map completeness and freshness vary. |
| `dist/parking.json` | OpenStreetMap-derived parking polygons | Lot labels and boundaries are not a live university parking feed. |
| `city-elevations.json` | City of Lethbridge open-data elevation extract used during preparation | Source attributes include roof and ground elevation. Original extraction script and exact service URL were not retained. |
| `dist/heights.json` | Computed by `prepare-heights.cjs` using city polygon matches and fallback estimates | 126 approximate matches and 5 estimates. Broad polygons may match several structures. |
| `dist/reported-entrances.json` | User-reported outdoor approaches connected to existing mapped paths | Door positions, access and hours are not surveyed. |
| `dist/architecture.js` | Original procedural geometry guided by linked reference pages | Illustrative materials, facade rows and roofs; not measured CAD. Reference photographs are not bundled. |
| `research/uleth-floor-room-audit.*` | Notes derived from linked university sources and a 2014 teaching-space report | Historical teaching rooms are not current all-room counts. |
| Dining, vending and parking text | Linked university pages referenced in `dist/index.html` and the project report | Static information; confirm current names, hours and restrictions. |

## Attribution

- OpenStreetMap contributors: https://www.openstreetmap.org/copyright
- Open Database Licence information: https://opendatacommons.org/licenses/odbl/1-0/
- City of Lethbridge open-data catalogue: https://opendata.lethbridge.ca/
- University building directory: https://www.ulethbridge.ca/facilities/content/campus-buildings
- University room-numbering reference: https://www.ulethbridge.ca/facilities/content/room-numbering-system

OpenStreetMap-derived data is identified separately from the MIT-licensed original code. The City catalogue link is retained as provenance; the exact dataset licence text was not captured during the initial import. No new licence to the City's source material or university material is claimed here. Review the applicable source terms when distributing or updating data.

## Rebuilding heights

```sh
npm run prepare:heights
```

This overwrites `dist/heights.json` using the bundled city extract and campus footprints. It does not fetch current records. Preserve a copy before replacing data, review matches and run the checks afterwards.

## Prior work kept separate

The original WayFinder repository, its Mobile Scene Package, professor-supplied document, raw CAD and reference photo downloads are not distributed in this repository. Links and research discussion do not grant or claim permission to republish those files.
