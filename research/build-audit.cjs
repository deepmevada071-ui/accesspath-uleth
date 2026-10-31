const fs=require('fs');const root='https://www.ulethbridge.ca/';const inventory=root+'sites/default/files/U%20of%20L%20Classroom%20Utilization%20Report%20-%20Final%20Feb%2028%202014.pdf';
const rooms={
'University Hall':['A580','B543','B650','B660','B716','B730','B756','C610','C620','C630','C640','C674','C756','D610','D630','D631','D632','D633','D634','D635','E575','E690'],
'Anderson Hall':['AH116','AH117','AH118','AH175','AH176','AH177'],
'Community Centre for Wellbeing':['EP1201'],
'Centre for Sport & Wellness':['PE020','PE040','PE044','PE138','PE250','PE261','PE264','PE275'],
'Markin Hall':['M1004','M1030','M1035','M1040','M1060','M1090','M3023'],
'Students’ Union Building':['SU063'],
'Turcotte Hall':['TH141','TH143','TH173','TH177','TH201','TH204','TH241','TH277','TH341','TH373'],
'University Centre for the Arts':['W400','W401','W428','W514','W550','W561','W565','W731','W767','W771','W857','W866','W870'],
'University Library':['L1050','L1060','L1168','L1170A','L1170B','L1170G','L950'],
'Alberta Water and Environmental Science Building':['WE1001','WE2034']};
const entries=[
['University Hall','9 levels described in university history. Current full floor inventory not obtained.',root+'retired-faculty/history-u-l'],
['Science Commons','2015 design drawings show levels 6–10. Design-stage evidence, not a current as-built floor inventory.',root+'sites/default/files/16.01.28%20-%20Levels%206%20-%2010.pdf'],
['University Library','Library occupies 3 levels: 9, 10, 11. This does not certify the total physical storeys of the complete LINC complex.','https://library.ulethbridge.ca/virtual_Tour/level10'],
['Markin Hall','4 floors explicitly stated.',root+'unews/article/markin-hall-makes-its-mark'],
['Turcotte Hall','4 storeys in 2009 campus wind assessment; current inventory still needed.',root+'sites/default/files/PedestrianWindAssesment2009-1_0.pdf'],
['Anderson Hall','Single-storey form described in 2000 master-plan discussion. Historical evidence only.',root+'masterplan/content/master-plan-report-2000'],
['University Centre for the Arts','Historical classrooms on levels 4, 5, 7 and 8; this is not a complete floor count.',inventory],
['Alberta Water and Environmental Science Building','Historical classroom codes on levels 1 and 2; complete floor count not verified.',inventory],
['Centre for Sport & Wellness','2 storeys in 2009 assessment; historical inventory also includes PE0xx rooms. Total accessible levels need confirmation.',root+'sites/default/files/PedestrianWindAssesment2009-1_0.pdf'],
['Max Bell Regional Aquatic Centre','Separate floor count not found. Shares PE designation with Sport & Wellness.',root+'facilities/content/campus-buildings'],
['Students’ Union Building','Four labelled levels evidenced by current tour: base/0, 1, 2 and 3; not an as-built storey audit.',root+'future-student/tour-students-union-building'],
['Hepler Hall','Complete floor count not found.',root+'facilities/content/campus-buildings'],
['Community Centre for Wellbeing','Complete current floor count not found. Historical teaching inventory uses former CCBN name; renovation changes must be checked.',root+'facilities/content/campus-buildings'],
['Kainai House','A fourth floor is explicitly mentioned. Complete floor count not independently confirmed.',root+'housing/kainai-house'],
['Piikani House','Fourth-floor balcony explicitly mentioned. Complete floor count not independently confirmed.',root+'unews/article/piikani-house-welcoming-students-home'],
['Siksika House','Complete floor count not found.',root+'housing/residences'],
['Tsuutina House','Complete floor count not found.',root+'housing/residences'],
['Residence Village','Suite description includes main, upper and lower living levels. Four bedrooms per suite; these are not building-wide room totals.',root+'housing/village']
];
const report={checked_date:'2026-10-30',scope:'18 buildings currently named in AccessPath ULeth',warning:'No complete current all-room counts were obtained. 2014 counts cover the study classroom pool, not all offices, labs, toilets, storage, residences or other rooms. Exclude proposed NAB rooms. Do not use this as a current indoor-navigation database.',room_inventory_source:inventory,room_inventory_date:'2014-02',room_inventory_pages:'printed 2-4 and 2-5; PDF pages 11 and 12',current_inventory_access:{system:'FMSystems Workplace / university AutoCAD library',url:root+'facilities/development/content/facilities-management-system-fms',contact:'planning@uleth.ca'},buildings:entries.map(([name,floorEvidence,floorSource])=>({name,floorEvidence,floorSource,currentTotalRooms:null,historicalTeachingRooms:rooms[name]||[],historicalTeachingRoomCount:rooms[name]?.length??null,roomSource:rooms[name]?inventory:null}))};fs.writeFileSync('research/uleth-floor-room-audit.json',JSON.stringify(report,null,2));
let md='# ULeth floor and room audit\n\nChecked 30 October 2026. Official university sources only.\n\n'+report.warning+'\n\n';for(const b of report.buildings){md+='## '+b.name+'\n\n'+b.floorEvidence+'\n\nFloor source: '+b.floorSource+'\n\nCurrent all-room total: not verified.\n\n';if(b.historicalTeachingRoomCount!==null)md+='2014 study teaching-room count: '+b.historicalTeachingRoomCount+'. Codes: '+b.historicalTeachingRooms.join(', ')+'.\n\n';else md+='Historical teaching-room list: not obtained from this report.\n\n'}md+='## Room-count source\n\n'+inventory+'\n\nFor a current building/floor/room export: planning@uleth.ca. Facilities system: '+report.current_inventory_access.url+'\n';fs.writeFileSync('research/uleth-floor-room-audit.md',md);const count=Object.values(rooms).reduce((n,r)=>n+r.length,0);if(count!==77)throw Error('Historical classroom total mismatch');console.log('Saved 18 building records and 77 historical teaching-room codes.');
