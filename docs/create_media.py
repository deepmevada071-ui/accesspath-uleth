from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import subprocess, shutil, json

root=Path(__file__).parent
media=root/'media'
frames=root/'qa'/'video-frames'
frames.mkdir(parents=True,exist_ok=True)
ffmpeg=shutil.which('ffmpeg')
if not ffmpeg: raise RuntimeError('FFmpeg is required')
font=lambda size:ImageFont.truetype('C:/Windows/Fonts/arial.ttf',size)
scenes=[
 ('01-campus-2d.jpg','Campus overview','Custom campus map with building names and walking paths.'),
 ('02-campus-3d.jpg','Explore the campus in 3D','Stylized exterior models with illustrative windows and materials.'),
 ('03-food.jpg','Find campus dining','Food mode highlights dining buildings and hides unrelated labels.'),
 ('05-parking.jpg','Locate parking areas','Parking areas and stored guidance; check signs and current university rules.'),
 ('06-planner.jpg','Enter a room or choose a building','M1004 infers Markin Hall level 1. Room existence remains unverified.'),
 ('07-rear-route.jpg','Use the reported rear approach','Markin Hall to Students Union: about 57 metres on mapped paths.'),
 ('04-vending.jpg','Find vending buildings','Most exact machine positions and floors still need verification.')
]
for idx,(filename,title,caption) in enumerate(scenes):
    canvas=Image.new('RGB',(1280,720),'#f3f5ef')
    draw=ImageDraw.Draw(canvas)
    draw.text((24,17),'ACCESSPATH ULETH',font=font(27),fill='#183d35')
    draw.text((24,53),title,font=font(23),fill='#172b2a')
    draw.text((958,22),'Screenshot walkthrough',font=font(17),fill='#596a63')
    image=Image.open(media/filename).convert('RGB')
    image.thumbnail((1232,540),Image.Resampling.LANCZOS)
    canvas.paste(image,((1280-image.width)//2,98+(540-image.height)//2))
    draw.text((24,658),caption,font=font(20),fill='#172b2a')
    draw.text((24,690),'Independent student prototype | Silent video | Accessibility and conditions unverified',font=font(15),fill='#596a63')
    canvas.save(frames/f'scene-{idx+1}.png')

outputs=[]
for name,indices in [('01-campus-overview.mp4',[1,2,3,4]),('02-navigation-and-services.mp4',[5,6,7])]:
    playlist=frames/(name+'.txt')
    lines=[]
    for idx in indices:
        path=(frames/f'scene-{idx}.png').as_posix()
        lines.extend(["file '"+path+"'",'duration 5'])
    lines.append("file '"+(frames/f'scene-{indices[-1]}.png').as_posix()+"'")
    playlist.write_text('\n'.join(lines)+'\n',encoding='utf-8')
    output=media/name
    subprocess.run([ffmpeg,'-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(playlist),'-t',str(len(indices)*5),'-r','24','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-an',str(output)],check=True)
    outputs.append({'file':name,'seconds':len(indices)*5,'size':[1280,720],'fps':24,'format':'H264 MP4','audio':'none','source':'Actual AccessPath screenshot slides'})
(media/'media-manifest.json').write_text(json.dumps({'sourceCommit':'b5073f7d604e166d354e0e6cd4353fb57c4bda70','sourceURL':'https://accesspath-uleth-campus-deep.shukanforwork.chatgpt.site/?v=20&build=b5073f7','images':[s[0] for s in scenes],'videos':outputs},indent=2),encoding='utf-8')
print(json.dumps(outputs))
