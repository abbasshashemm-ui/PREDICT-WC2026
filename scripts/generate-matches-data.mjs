import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Official FIFA World Cup 2026 schedule (post-draw, Dec 2025). Times in UTC. */
const GROUP = [
  [1,'A',1,'A1','A4','2026-06-11','2026-06-11T19:00:00Z','Estadio Azteca, Mexico City'],
  [2,'A',1,'A2','A3','2026-06-11','2026-06-12T02:00:00Z','Estadio Akron, Zapopan'],
  [3,'B',1,'B1','B4','2026-06-12','2026-06-12T19:00:00Z','BMO Field, Toronto'],
  [4,'D',1,'D1','D4','2026-06-13','2026-06-13T01:00:00Z','SoFi Stadium, Inglewood'],
  [5,'C',1,'C4','C3','2026-06-14','2026-06-14T01:00:00Z','Gillette Stadium, Foxborough'],
  [6,'D',1,'D2','D3','2026-06-14','2026-06-14T04:00:00Z','BC Place, Vancouver'],
  [7,'C',1,'C1','C2','2026-06-13','2026-06-13T22:00:00Z','MetLife Stadium, East Rutherford'],
  [8,'B',1,'B3','B2','2026-06-13','2026-06-13T19:00:00Z',"Levi's Stadium, Santa Clara"],
  [9,'E',1,'E3','E4','2026-06-14','2026-06-14T23:00:00Z','Lincoln Financial Field, Philadelphia'],
  [10,'E',1,'E1','E2','2026-06-14','2026-06-14T17:00:00Z','NRG Stadium, Houston'],
  [11,'F',1,'F1','F3','2026-06-14','2026-06-14T20:00:00Z','AT&T Stadium, Arlington'],
  [12,'F',1,'F4','F2','2026-06-15','2026-06-15T02:00:00Z','Estadio BBVA, Guadalupe'],
  [13,'H',1,'H3','H4','2026-06-15','2026-06-15T22:00:00Z','Hard Rock Stadium, Miami Gardens'],
  [14,'H',1,'H1','H2','2026-06-15','2026-06-15T16:00:00Z','Mercedes-Benz Stadium, Atlanta'],
  [15,'G',1,'G3','G4','2026-06-16','2026-06-16T01:00:00Z','SoFi Stadium, Inglewood'],
  [16,'G',1,'G1','G2','2026-06-15','2026-06-15T19:00:00Z','Lumen Field, Seattle'],
  [17,'I',1,'I1','I2','2026-06-16','2026-06-16T19:00:00Z','MetLife Stadium, East Rutherford'],
  [18,'I',1,'I4','I3','2026-06-16','2026-06-16T22:00:00Z','Gillette Stadium, Foxborough'],
  [19,'J',1,'J1','J4','2026-06-17','2026-06-17T01:00:00Z','Arrowhead Stadium, Kansas City'],
  [20,'J',1,'J3','J2','2026-06-17','2026-06-17T04:00:00Z',"Levi's Stadium, Santa Clara"],
  [21,'L',1,'L3','L4','2026-06-17','2026-06-17T23:00:00Z','BMO Field, Toronto'],
  [22,'L',1,'L1','L2','2026-06-17','2026-06-17T20:00:00Z','AT&T Stadium, Arlington'],
  [23,'K',1,'K1','K2','2026-06-17','2026-06-17T17:00:00Z','NRG Stadium, Houston'],
  [24,'K',1,'K4','K3','2026-06-18','2026-06-18T02:00:00Z','Estadio Azteca, Mexico City'],
  [25,'A',2,'A3','A4','2026-06-18','2026-06-18T16:00:00Z','Mercedes-Benz Stadium, Atlanta'],
  [26,'B',2,'B2','B4','2026-06-18','2026-06-18T19:00:00Z','SoFi Stadium, Inglewood'],
  [27,'B',2,'B1','B3','2026-06-18','2026-06-18T22:00:00Z','BC Place, Vancouver'],
  [28,'A',2,'A1','A2','2026-06-19','2026-06-19T01:00:00Z','Estadio Akron, Zapopan'],
  [29,'C',2,'C1','C4','2026-06-20','2026-06-20T00:30:00Z','Lincoln Financial Field, Philadelphia'],
  [30,'C',2,'C3','C2','2026-06-19','2026-06-19T22:00:00Z','Gillette Stadium, Foxborough'],
  [31,'D',2,'D3','D4','2026-06-20','2026-06-20T03:00:00Z',"Levi's Stadium, Santa Clara"],
  [32,'D',2,'D1','D2','2026-06-19','2026-06-19T19:00:00Z','Lumen Field, Seattle'],
  [33,'E',2,'E1','E3','2026-06-20','2026-06-20T20:00:00Z','BMO Field, Toronto'],
  [34,'E',2,'E4','E2','2026-06-21','2026-06-21T00:00:00Z','Arrowhead Stadium, Kansas City'],
  [35,'F',2,'F1','F4','2026-06-20','2026-06-20T17:00:00Z','NRG Stadium, Houston'],
  [36,'F',2,'F2','F3','2026-06-21','2026-06-21T04:00:00Z','Estadio BBVA, Guadalupe'],
  [37,'H',2,'H4','H2','2026-06-21','2026-06-21T22:00:00Z','Hard Rock Stadium, Miami Gardens'],
  [38,'H',2,'H1','H3','2026-06-21','2026-06-21T16:00:00Z','Mercedes-Benz Stadium, Atlanta'],
  [39,'G',2,'G1','G3','2026-06-21','2026-06-21T19:00:00Z','SoFi Stadium, Inglewood'],
  [40,'G',2,'G4','G2','2026-06-22','2026-06-22T01:00:00Z','BC Place, Vancouver'],
  [41,'I',2,'I3','I2','2026-06-23','2026-06-23T00:00:00Z','MetLife Stadium, East Rutherford'],
  [42,'I',2,'I1','I4','2026-06-22','2026-06-22T21:00:00Z','Lincoln Financial Field, Philadelphia'],
  [43,'J',2,'J1','J3','2026-06-22','2026-06-22T17:00:00Z','AT&T Stadium, Arlington'],
  [44,'J',2,'J2','J4','2026-06-23','2026-06-23T03:00:00Z',"Levi's Stadium, Santa Clara"],
  [45,'L',2,'L1','L3','2026-06-23','2026-06-23T20:00:00Z','Gillette Stadium, Foxborough'],
  [46,'L',2,'L4','L2','2026-06-23','2026-06-23T23:00:00Z','BMO Field, Toronto'],
  [47,'K',2,'K1','K4','2026-06-23','2026-06-23T17:00:00Z','NRG Stadium, Houston'],
  [48,'K',2,'K3','K2','2026-06-24','2026-06-24T02:00:00Z','Estadio Akron, Zapopan'],
  [49,'C',3,'C3','C1','2026-06-24','2026-06-24T22:00:00Z','Hard Rock Stadium, Miami Gardens'],
  [50,'C',3,'C2','C4','2026-06-24','2026-06-24T22:00:00Z','Mercedes-Benz Stadium, Atlanta'],
  [51,'B',3,'B2','B1','2026-06-24','2026-06-24T19:00:00Z','BC Place, Vancouver'],
  [52,'B',3,'B4','B3','2026-06-24','2026-06-24T19:00:00Z','Lumen Field, Seattle'],
  [53,'A',3,'A3','A1','2026-06-25','2026-06-25T01:00:00Z','Estadio Azteca, Mexico City'],
  [54,'A',3,'A4','A2','2026-06-25','2026-06-25T01:00:00Z','Estadio BBVA, Guadalupe'],
  [55,'E',3,'E2','E3','2026-06-25','2026-06-25T20:00:00Z','Lincoln Financial Field, Philadelphia'],
  [56,'E',3,'E4','E1','2026-06-25','2026-06-25T20:00:00Z','MetLife Stadium, East Rutherford'],
  [57,'F',3,'F3','F4','2026-06-25','2026-06-25T23:00:00Z','AT&T Stadium, Arlington'],
  [58,'F',3,'F2','F1','2026-06-25','2026-06-25T23:00:00Z','Arrowhead Stadium, Kansas City'],
  [59,'D',3,'D3','D1','2026-06-26','2026-06-26T02:00:00Z','SoFi Stadium, Inglewood'],
  [60,'D',3,'D4','D2','2026-06-26','2026-06-26T02:00:00Z',"Levi's Stadium, Santa Clara"],
  [61,'I',3,'I3','I1','2026-06-26','2026-06-26T19:00:00Z','Gillette Stadium, Foxborough'],
  [62,'I',3,'I2','I4','2026-06-26','2026-06-26T19:00:00Z','BMO Field, Toronto'],
  [63,'G',3,'G2','G3','2026-06-27','2026-06-27T03:00:00Z','Lumen Field, Seattle'],
  [64,'G',3,'G4','G1','2026-06-27','2026-06-27T03:00:00Z','BC Place, Vancouver'],
  [65,'H',3,'H2','H3','2026-06-27','2026-06-27T00:00:00Z','NRG Stadium, Houston'],
  [66,'H',3,'H4','H1','2026-06-27','2026-06-27T00:00:00Z','Estadio Akron, Zapopan'],
  [67,'L',3,'L4','L1','2026-06-27','2026-06-27T21:00:00Z','MetLife Stadium, East Rutherford'],
  [68,'L',3,'L2','L3','2026-06-27','2026-06-27T21:00:00Z','Lincoln Financial Field, Philadelphia'],
  [69,'J',3,'J4','J3','2026-06-28','2026-06-28T02:00:00Z','Arrowhead Stadium, Kansas City'],
  [70,'J',3,'J2','J1','2026-06-28','2026-06-28T02:00:00Z','AT&T Stadium, Arlington'],
  [71,'K',3,'K3','K1','2026-06-28','2026-06-28T23:30:00Z','Hard Rock Stadium, Miami Gardens'],
  [72,'K',3,'K2','K4','2026-06-28','2026-06-28T23:30:00Z','Mercedes-Benz Stadium, Atlanta'],
];

/** FIFA Regulations Art. 12.6–12.11 knockout dependency graph */
const KNOCKOUT = [
  [73,'Round of 32','2A','2B','2026-06-28','2026-06-28T19:00:00Z','SoFi Stadium, Inglewood',90,'home'],
  [74,'Round of 32','1E','3rd-ABCDF','2026-06-29','2026-06-29T20:30:00Z','Gillette Stadium, Foxborough',89,'home'],
  [75,'Round of 32','1F','2C','2026-06-30','2026-06-30T01:00:00Z','Estadio BBVA, Guadalupe',90,'away'],
  [76,'Round of 32','1C','2F','2026-06-29','2026-06-29T17:00:00Z','NRG Stadium, Houston',91,'home'],
  [77,'Round of 32','1I','3rd-CDFGH','2026-06-30','2026-06-30T21:00:00Z','MetLife Stadium, East Rutherford',89,'away'],
  [78,'Round of 32','2E','2I','2026-06-30','2026-06-30T17:00:00Z','AT&T Stadium, Arlington',91,'away'],
  [79,'Round of 32','1A','3rd-CEFHI','2026-07-01','2026-07-01T01:00:00Z','Estadio Azteca, Mexico City',92,'home'],
  [80,'Round of 32','1L','3rd-EHIJK','2026-07-01','2026-07-01T16:00:00Z','Mercedes-Benz Stadium, Atlanta',92,'away'],
  [81,'Round of 32','1D','3rd-BEFIJ','2026-07-02','2026-07-02T00:00:00Z',"Levi's Stadium, Santa Clara",94,'home'],
  [82,'Round of 32','1G','3rd-AEHIJ','2026-07-01','2026-07-01T20:00:00Z','Lumen Field, Seattle',94,'away'],
  [83,'Round of 32','2K','2L','2026-07-02','2026-07-02T23:00:00Z','BMO Field, Toronto',93,'home'],
  [84,'Round of 32','1H','2J','2026-07-02','2026-07-02T19:00:00Z','SoFi Stadium, Inglewood',93,'away'],
  [85,'Round of 32','1B','3rd-EFGIJ','2026-07-03','2026-07-03T03:00:00Z','BC Place, Vancouver',96,'home'],
  [86,'Round of 32','1J','2H','2026-07-03','2026-07-03T22:00:00Z','Hard Rock Stadium, Miami Gardens',95,'home'],
  [87,'Round of 32','1K','3rd-DEIJL','2026-07-04','2026-07-04T01:30:00Z','Arrowhead Stadium, Kansas City',96,'away'],
  [88,'Round of 32','2D','2G','2026-07-03','2026-07-03T18:00:00Z','AT&T Stadium, Arlington',95,'away'],
  [89,'Round of 16','W74','W77','2026-07-04','2026-07-04T21:00:00Z','Lincoln Financial Field, Philadelphia',97,'home'],
  [90,'Round of 16','W73','W75','2026-07-04','2026-07-04T17:00:00Z','NRG Stadium, Houston',97,'away'],
  [91,'Round of 16','W76','W78','2026-07-05','2026-07-05T20:00:00Z','MetLife Stadium, East Rutherford',99,'home'],
  [92,'Round of 16','W79','W80','2026-07-06','2026-07-06T00:00:00Z','Estadio Azteca, Mexico City',99,'away'],
  [93,'Round of 16','W83','W84','2026-07-06','2026-07-06T19:00:00Z','AT&T Stadium, Arlington',98,'home'],
  [94,'Round of 16','W81','W82','2026-07-07','2026-07-07T00:00:00Z','Lumen Field, Seattle',98,'away'],
  [95,'Round of 16','W86','W88','2026-07-07','2026-07-07T16:00:00Z','Mercedes-Benz Stadium, Atlanta',100,'home'],
  [96,'Round of 16','W85','W87','2026-07-07','2026-07-07T20:00:00Z','BC Place, Vancouver',100,'away'],
  [97,'Quarterfinals','W89','W90','2026-07-09','2026-07-09T20:00:00Z','Gillette Stadium, Foxborough',101,'home'],
  [98,'Quarterfinals','W93','W94','2026-07-10','2026-07-10T19:00:00Z','SoFi Stadium, Inglewood',101,'away'],
  [99,'Quarterfinals','W91','W92','2026-07-11','2026-07-11T21:00:00Z','Hard Rock Stadium, Miami Gardens',102,'home'],
  [100,'Quarterfinals','W95','W96','2026-07-12','2026-07-12T01:00:00Z','Arrowhead Stadium, Kansas City',102,'away'],
  [101,'Semifinals','W97','W98','2026-07-14','2026-07-14T19:00:00Z','AT&T Stadium, Arlington',104,'home',103,'home'],
  [102,'Semifinals','W99','W100','2026-07-15','2026-07-15T19:00:00Z','Mercedes-Benz Stadium, Atlanta',104,'away',103,'away'],
  [103,'3rd Place','L101','L102','2026-07-18','2026-07-18T21:00:00Z','Hard Rock Stadium, Miami Gardens'],
  [104,'Final','W101','W102','2026-07-19','2026-07-19T19:00:00Z','MetLife Stadium, East Rutherford'],
];

const definitions = [
  ...GROUP.map(([matchId, groupId, matchday, homeTeam, awayTeam, date, kickoffTime, venue]) => ({
    matchId,
    stage: 'Group',
    groupId,
    matchday,
    homeTeam,
    awayTeam,
    date,
    kickoffTime,
    venue,
  })),
  ...KNOCKOUT.map((row) => {
    const [matchId, stage, homeTeam, awayTeam, date, kickoffTime, venue, targetMatchId, targetSlot, loserTargetMatchId, loserTargetSlot] = row;
    const def = { matchId, stage, homeTeam, awayTeam, date, kickoffTime, venue };
    if (targetMatchId) {
      def.targetMatchId = targetMatchId;
      def.targetSlot = targetSlot;
    }
    if (loserTargetMatchId) {
      def.loserTargetMatchId = loserTargetMatchId;
      def.loserTargetSlot = loserTargetSlot;
    }
    return def;
  }),
];

const out = `// Auto-generated from official FIFA World Cup 2026 match schedule (post-draw)
import type { MatchDefinition } from '../types';

export const INITIAL_MATCH_DEFINITIONS: MatchDefinition[] = ${JSON.stringify(definitions, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, '../src/data/matchesData.ts'), out);
console.log(`Wrote ${definitions.length} match definitions`);
