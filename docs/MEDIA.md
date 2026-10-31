# Report and media

The illustrated project report is [available in Word](AccessPath-ULeth-Project-Report.docx) and [readable as Markdown](AccessPath-ULeth-Project-Report.md).

## Videos

| File | Duration | Contents |
|---|---|---|
| [Campus overview](media/01-campus-overview.mp4) | About 20 seconds | 2D map, stylized 3D buildings, dining and parking |
| [Navigation and services](media/02-navigation-and-services.mp4) | About 15 seconds | Room inference, rear approach route and vending |

These are silent, captioned screenshot slides at 1280 × 720, H.264 MP4, 24 fps. They are not continuous screen recordings, live GPS tests or verified accessibility demonstrations.

## Screenshots

1. [2D campus overview](media/01-campus-2d.jpg)
2. [3D exterior scene](media/02-campus-3d.jpg)
3. [Dining overlay](media/03-food.jpg)
4. [Vending overlay](media/04-vending.jpg)
5. [Parking overlay](media/05-parking.jpg)
6. [Journey planner](media/06-planner.jpg)
7. [Rear approach route](media/07-rear-route.jpg)

Keep `media/` next to the report when downloading it. If local Word links do not open, open the MP4 files directly.

## Optional report tooling

`build_report.py` rebuilds the Word file from Markdown and the screenshots using Python and `python-docx`. `create_media.py` creates the screenshot videos using Python, Pillow and FFmpeg. The existing media and report are already included; these tools are not required to run the map. Their font paths currently target Windows and may need adjustment elsewhere.

The technical report is a historical implementation snapshot, so its original workspace and Sites publication instructions describe the prototype environment. Use the root README for the portable repository's current setup.
