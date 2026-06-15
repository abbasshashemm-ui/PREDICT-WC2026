// src/types/index.ts
var GROUP_IDS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L"
];
var EMPTY_MATCH_DISCIPLINE = {
  homeYellowCards: 0,
  homeSecondYellowRedCards: 0,
  homeDirectRedCards: 0,
  homeYellowAndDirectRedCards: 0,
  awayYellowCards: 0,
  awaySecondYellowRedCards: 0,
  awayDirectRedCards: 0,
  awayYellowAndDirectRedCards: 0
};

// src/data/teams.ts
var TEAM_META = {
  A: [
    { name: "Mexico", fullName: "Mexico", countryCode: "mx", flagEmoji: "\u{1F1F2}\u{1F1FD}", fifaRanking: 13 },
    { name: "South Korea", fullName: "South Korea", countryCode: "kr", flagEmoji: "\u{1F1F0}\u{1F1F7}", fifaRanking: 19 },
    { name: "Czechia", fullName: "Czechia", countryCode: "cz", flagEmoji: "\u{1F1E8}\u{1F1FF}", fifaRanking: 29 },
    { name: "South Africa", fullName: "South Africa", countryCode: "za", flagEmoji: "\u{1F1FF}\u{1F1E6}", fifaRanking: 34 }
  ],
  B: [
    { name: "Canada", fullName: "Canada", countryCode: "ca", flagEmoji: "\u{1F1E8}\u{1F1E6}", fifaRanking: 38 },
    { name: "Switzerland", fullName: "Switzerland", countryCode: "ch", flagEmoji: "\u{1F1E8}\u{1F1ED}", fifaRanking: 16 },
    { name: "Qatar", fullName: "Qatar", countryCode: "qa", flagEmoji: "\u{1F1F6}\u{1F1E6}", fifaRanking: 37 },
    { name: "Bosnia and Herzegovina", fullName: "Bosnia and Herzegovina", countryCode: "ba", flagEmoji: "\u{1F1E7}\u{1F1E6}", fifaRanking: 42 }
  ],
  C: [
    { name: "Brazil", fullName: "Brazil", countryCode: "br", flagEmoji: "\u{1F1E7}\u{1F1F7}", fifaRanking: 5 },
    { name: "Morocco", fullName: "Morocco", countryCode: "ma", flagEmoji: "\u{1F1F2}\u{1F1E6}", fifaRanking: 12 },
    { name: "Scotland", fullName: "Scotland", countryCode: "gb-sct", flagEmoji: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}", fifaRanking: 29 },
    { name: "Haiti", fullName: "Haiti", countryCode: "ht", flagEmoji: "\u{1F1ED}\u{1F1F9}", fifaRanking: 40 }
  ],
  D: [
    { name: "USA", fullName: "United States", countryCode: "us", flagEmoji: "\u{1F1FA}\u{1F1F8}", fifaRanking: 14 },
    { name: "Paraguay", fullName: "Paraguay", countryCode: "py", flagEmoji: "\u{1F1F5}\u{1F1FE}", fifaRanking: 30 },
    { name: "Australia", fullName: "Australia", countryCode: "au", flagEmoji: "\u{1F1E6}\u{1F1FA}", fifaRanking: 22 },
    { name: "Turkey", fullName: "Turkey", countryCode: "tr", flagEmoji: "\u{1F1F9}\u{1F1F7}", fifaRanking: 31 }
  ],
  E: [
    { name: "Germany", fullName: "Germany", countryCode: "de", flagEmoji: "\u{1F1E9}\u{1F1EA}", fifaRanking: 9 },
    { name: "Cura\xE7ao", fullName: "Cura\xE7ao", countryCode: "cw", flagEmoji: "\u{1F1E8}\u{1F1FC}", fifaRanking: 41 },
    { name: "Ivory Coast", fullName: "Ivory Coast", countryCode: "ci", flagEmoji: "\u{1F1E8}\u{1F1EE}", fifaRanking: 28 },
    { name: "Ecuador", fullName: "Ecuador", countryCode: "ec", flagEmoji: "\u{1F1EA}\u{1F1E8}", fifaRanking: 20 }
  ],
  F: [
    { name: "Netherlands", fullName: "Netherlands", countryCode: "nl", flagEmoji: "\u{1F1F3}\u{1F1F1}", fifaRanking: 7 },
    { name: "Japan", fullName: "Japan", countryCode: "jp", flagEmoji: "\u{1F1EF}\u{1F1F5}", fifaRanking: 15 },
    { name: "Sweden", fullName: "Sweden", countryCode: "se", flagEmoji: "\u{1F1F8}\u{1F1EA}", fifaRanking: 24 },
    { name: "Tunisia", fullName: "Tunisia", countryCode: "tn", flagEmoji: "\u{1F1F9}\u{1F1F3}", fifaRanking: 31 }
  ],
  G: [
    { name: "Belgium", fullName: "Belgium", countryCode: "be", flagEmoji: "\u{1F1E7}\u{1F1EA}", fifaRanking: 8 },
    { name: "Egypt", fullName: "Egypt", countryCode: "eg", flagEmoji: "\u{1F1EA}\u{1F1EC}", fifaRanking: 25 },
    { name: "Iran", fullName: "Iran", countryCode: "ir", flagEmoji: "\u{1F1EE}\u{1F1F7}", fifaRanking: 18 },
    { name: "New Zealand", fullName: "New Zealand", countryCode: "nz", flagEmoji: "\u{1F1F3}\u{1F1FF}", fifaRanking: 39 }
  ],
  H: [
    { name: "Spain", fullName: "Spain", countryCode: "es", flagEmoji: "\u{1F1EA}\u{1F1F8}", fifaRanking: 3 },
    { name: "Cape Verde", fullName: "Cape Verde", countryCode: "cv", flagEmoji: "\u{1F1E8}\u{1F1FB}", fifaRanking: 32 },
    { name: "Saudi Arabia", fullName: "Saudi Arabia", countryCode: "sa", flagEmoji: "\u{1F1F8}\u{1F1E6}", fifaRanking: 37 },
    { name: "Uruguay", fullName: "Uruguay", countryCode: "uy", flagEmoji: "\u{1F1FA}\u{1F1FE}", fifaRanking: 10 }
  ],
  I: [
    { name: "France", fullName: "France", countryCode: "fr", flagEmoji: "\u{1F1EB}\u{1F1F7}", fifaRanking: 2 },
    { name: "Senegal", fullName: "Senegal", countryCode: "sn", flagEmoji: "\u{1F1F8}\u{1F1F3}", fifaRanking: 17 },
    { name: "Iraq", fullName: "Iraq", countryCode: "iq", flagEmoji: "\u{1F1EE}\u{1F1F6}", fifaRanking: 47 },
    { name: "Norway", fullName: "Norway", countryCode: "no", flagEmoji: "\u{1F1F3}\u{1F1F4}", fifaRanking: 23 }
  ],
  J: [
    { name: "Argentina", fullName: "Argentina", countryCode: "ar", flagEmoji: "\u{1F1E6}\u{1F1F7}", fifaRanking: 1 },
    { name: "Algeria", fullName: "Algeria", countryCode: "dz", flagEmoji: "\u{1F1E9}\u{1F1FF}", fifaRanking: 26 },
    { name: "Austria", fullName: "Austria", countryCode: "at", flagEmoji: "\u{1F1E6}\u{1F1F9}", fifaRanking: 21 },
    { name: "Jordan", fullName: "Jordan", countryCode: "jo", flagEmoji: "\u{1F1EF}\u{1F1F4}", fifaRanking: 35 }
  ],
  K: [
    { name: "Portugal", fullName: "Portugal", countryCode: "pt", flagEmoji: "\u{1F1F5}\u{1F1F9}", fifaRanking: 6 },
    { name: "DR Congo", fullName: "DR Congo", countryCode: "cd", flagEmoji: "\u{1F1E8}\u{1F1E9}", fifaRanking: 46 },
    { name: "Uzbekistan", fullName: "Uzbekistan", countryCode: "uz", flagEmoji: "\u{1F1FA}\u{1F1FF}", fifaRanking: 36 },
    { name: "Colombia", fullName: "Colombia", countryCode: "co", flagEmoji: "\u{1F1E8}\u{1F1F4}", fifaRanking: 11 }
  ],
  L: [
    { name: "England", fullName: "England", countryCode: "gb-eng", flagEmoji: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", fifaRanking: 4 },
    { name: "Croatia", fullName: "Croatia", countryCode: "hr", flagEmoji: "\u{1F1ED}\u{1F1F7}", fifaRanking: 27 },
    { name: "Ghana", fullName: "Ghana", countryCode: "gh", flagEmoji: "\u{1F1EC}\u{1F1ED}", fifaRanking: 33 },
    { name: "Panama", fullName: "Panama", countryCode: "pa", flagEmoji: "\u{1F1F5}\u{1F1E6}", fifaRanking: 24 }
  ]
};
function shortName(name) {
  const map = {
    "South Korea": "KOR",
    "South Africa": "RSA",
    "Bosnia and Herzegovina": "BIH",
    "Ivory Coast": "CIV",
    "Cape Verde": "CPV",
    "Saudi Arabia": "KSA",
    "New Zealand": "NZL",
    "DR Congo": "COD",
    USA: "USA",
    Czechia: "CZE"
  };
  return map[name] ?? name.slice(0, 3).toUpperCase();
}
function createTeams() {
  const teams = [];
  for (const groupId of GROUP_IDS) {
    TEAM_META[groupId].forEach((meta, index) => {
      const id = `${groupId}${index + 1}`;
      teams.push({
        id,
        name: meta.name,
        fullName: meta.fullName,
        shortName: shortName(meta.name),
        countryCode: meta.countryCode,
        group: groupId,
        fifaRanking: meta.fifaRanking,
        flagEmoji: meta.flagEmoji
      });
    });
  }
  return teams;
}
function teamById(teams, id) {
  if (!id) return void 0;
  return teams.find((t) => t.id === id);
}
function isGroupSlot(label) {
  return /^[A-L][1-4]$/.test(label);
}
function slotToTeamId(slot) {
  return isGroupSlot(slot) ? slot : null;
}

// src/data/matchesData.ts
var INITIAL_MATCH_DEFINITIONS = [
  {
    "matchId": 1,
    "stage": "Group",
    "groupId": "A",
    "matchday": 1,
    "homeTeam": "A1",
    "awayTeam": "A4",
    "date": "2026-06-11",
    "kickoffTime": "2026-06-11T19:00:00Z",
    "venue": "Estadio Azteca, Mexico City"
  },
  {
    "matchId": 2,
    "stage": "Group",
    "groupId": "A",
    "matchday": 1,
    "homeTeam": "A2",
    "awayTeam": "A3",
    "date": "2026-06-11",
    "kickoffTime": "2026-06-12T02:00:00Z",
    "venue": "Estadio Akron, Zapopan"
  },
  {
    "matchId": 3,
    "stage": "Group",
    "groupId": "B",
    "matchday": 1,
    "homeTeam": "B1",
    "awayTeam": "B4",
    "date": "2026-06-12",
    "kickoffTime": "2026-06-12T19:00:00Z",
    "venue": "BMO Field, Toronto"
  },
  {
    "matchId": 4,
    "stage": "Group",
    "groupId": "D",
    "matchday": 1,
    "homeTeam": "D1",
    "awayTeam": "D4",
    "date": "2026-06-13",
    "kickoffTime": "2026-06-13T01:00:00Z",
    "venue": "SoFi Stadium, Inglewood"
  },
  {
    "matchId": 5,
    "stage": "Group",
    "groupId": "C",
    "matchday": 1,
    "homeTeam": "C4",
    "awayTeam": "C3",
    "date": "2026-06-14",
    "kickoffTime": "2026-06-14T01:00:00Z",
    "venue": "Gillette Stadium, Foxborough"
  },
  {
    "matchId": 6,
    "stage": "Group",
    "groupId": "D",
    "matchday": 1,
    "homeTeam": "D3",
    "awayTeam": "D4",
    "date": "2026-06-14",
    "kickoffTime": "2026-06-14T04:00:00Z",
    "venue": "BC Place, Vancouver"
  },
  {
    "matchId": 7,
    "stage": "Group",
    "groupId": "C",
    "matchday": 1,
    "homeTeam": "C1",
    "awayTeam": "C2",
    "date": "2026-06-13",
    "kickoffTime": "2026-06-13T22:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  },
  {
    "matchId": 8,
    "stage": "Group",
    "groupId": "B",
    "matchday": 1,
    "homeTeam": "B3",
    "awayTeam": "B2",
    "date": "2026-06-13",
    "kickoffTime": "2026-06-13T19:00:00Z",
    "venue": "Levi's Stadium, Santa Clara"
  },
  {
    "matchId": 9,
    "stage": "Group",
    "groupId": "E",
    "matchday": 1,
    "homeTeam": "E3",
    "awayTeam": "E4",
    "date": "2026-06-14",
    "kickoffTime": "2026-06-14T23:00:00Z",
    "venue": "Lincoln Financial Field, Philadelphia"
  },
  {
    "matchId": 10,
    "stage": "Group",
    "groupId": "E",
    "matchday": 1,
    "homeTeam": "E1",
    "awayTeam": "E2",
    "date": "2026-06-14",
    "kickoffTime": "2026-06-14T17:00:00Z",
    "venue": "NRG Stadium, Houston"
  },
  {
    "matchId": 11,
    "stage": "Group",
    "groupId": "F",
    "matchday": 1,
    "homeTeam": "F1",
    "awayTeam": "F3",
    "date": "2026-06-14",
    "kickoffTime": "2026-06-14T20:00:00Z",
    "venue": "AT&T Stadium, Arlington"
  },
  {
    "matchId": 12,
    "stage": "Group",
    "groupId": "F",
    "matchday": 1,
    "homeTeam": "F4",
    "awayTeam": "F2",
    "date": "2026-06-15",
    "kickoffTime": "2026-06-15T02:00:00Z",
    "venue": "Estadio BBVA, Guadalupe"
  },
  {
    "matchId": 13,
    "stage": "Group",
    "groupId": "H",
    "matchday": 1,
    "homeTeam": "H3",
    "awayTeam": "H4",
    "date": "2026-06-15",
    "kickoffTime": "2026-06-15T22:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens"
  },
  {
    "matchId": 14,
    "stage": "Group",
    "groupId": "H",
    "matchday": 1,
    "homeTeam": "H1",
    "awayTeam": "H2",
    "date": "2026-06-15",
    "kickoffTime": "2026-06-15T16:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta"
  },
  {
    "matchId": 15,
    "stage": "Group",
    "groupId": "G",
    "matchday": 1,
    "homeTeam": "G3",
    "awayTeam": "G4",
    "date": "2026-06-16",
    "kickoffTime": "2026-06-16T01:00:00Z",
    "venue": "SoFi Stadium, Inglewood"
  },
  {
    "matchId": 16,
    "stage": "Group",
    "groupId": "G",
    "matchday": 1,
    "homeTeam": "G1",
    "awayTeam": "G2",
    "date": "2026-06-15",
    "kickoffTime": "2026-06-15T19:00:00Z",
    "venue": "Lumen Field, Seattle"
  },
  {
    "matchId": 17,
    "stage": "Group",
    "groupId": "I",
    "matchday": 1,
    "homeTeam": "I1",
    "awayTeam": "I2",
    "date": "2026-06-16",
    "kickoffTime": "2026-06-16T19:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  },
  {
    "matchId": 18,
    "stage": "Group",
    "groupId": "I",
    "matchday": 1,
    "homeTeam": "I4",
    "awayTeam": "I3",
    "date": "2026-06-16",
    "kickoffTime": "2026-06-16T22:00:00Z",
    "venue": "Gillette Stadium, Foxborough"
  },
  {
    "matchId": 19,
    "stage": "Group",
    "groupId": "J",
    "matchday": 1,
    "homeTeam": "J1",
    "awayTeam": "J4",
    "date": "2026-06-17",
    "kickoffTime": "2026-06-17T01:00:00Z",
    "venue": "Arrowhead Stadium, Kansas City"
  },
  {
    "matchId": 20,
    "stage": "Group",
    "groupId": "J",
    "matchday": 1,
    "homeTeam": "J3",
    "awayTeam": "J2",
    "date": "2026-06-17",
    "kickoffTime": "2026-06-17T04:00:00Z",
    "venue": "Levi's Stadium, Santa Clara"
  },
  {
    "matchId": 21,
    "stage": "Group",
    "groupId": "L",
    "matchday": 1,
    "homeTeam": "L3",
    "awayTeam": "L4",
    "date": "2026-06-17",
    "kickoffTime": "2026-06-17T23:00:00Z",
    "venue": "BMO Field, Toronto"
  },
  {
    "matchId": 22,
    "stage": "Group",
    "groupId": "L",
    "matchday": 1,
    "homeTeam": "L1",
    "awayTeam": "L2",
    "date": "2026-06-17",
    "kickoffTime": "2026-06-17T20:00:00Z",
    "venue": "AT&T Stadium, Arlington"
  },
  {
    "matchId": 23,
    "stage": "Group",
    "groupId": "K",
    "matchday": 1,
    "homeTeam": "K1",
    "awayTeam": "K2",
    "date": "2026-06-17",
    "kickoffTime": "2026-06-17T17:00:00Z",
    "venue": "NRG Stadium, Houston"
  },
  {
    "matchId": 24,
    "stage": "Group",
    "groupId": "K",
    "matchday": 1,
    "homeTeam": "K4",
    "awayTeam": "K3",
    "date": "2026-06-18",
    "kickoffTime": "2026-06-18T02:00:00Z",
    "venue": "Estadio Azteca, Mexico City"
  },
  {
    "matchId": 25,
    "stage": "Group",
    "groupId": "A",
    "matchday": 2,
    "homeTeam": "A3",
    "awayTeam": "A4",
    "date": "2026-06-18",
    "kickoffTime": "2026-06-18T16:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta"
  },
  {
    "matchId": 26,
    "stage": "Group",
    "groupId": "B",
    "matchday": 2,
    "homeTeam": "B2",
    "awayTeam": "B4",
    "date": "2026-06-18",
    "kickoffTime": "2026-06-18T19:00:00Z",
    "venue": "SoFi Stadium, Inglewood"
  },
  {
    "matchId": 27,
    "stage": "Group",
    "groupId": "B",
    "matchday": 2,
    "homeTeam": "B1",
    "awayTeam": "B3",
    "date": "2026-06-18",
    "kickoffTime": "2026-06-18T22:00:00Z",
    "venue": "BC Place, Vancouver"
  },
  {
    "matchId": 28,
    "stage": "Group",
    "groupId": "A",
    "matchday": 2,
    "homeTeam": "A1",
    "awayTeam": "A2",
    "date": "2026-06-19",
    "kickoffTime": "2026-06-19T01:00:00Z",
    "venue": "Estadio Akron, Zapopan"
  },
  {
    "matchId": 29,
    "stage": "Group",
    "groupId": "C",
    "matchday": 2,
    "homeTeam": "C1",
    "awayTeam": "C4",
    "date": "2026-06-20",
    "kickoffTime": "2026-06-20T00:30:00Z",
    "venue": "Lincoln Financial Field, Philadelphia"
  },
  {
    "matchId": 30,
    "stage": "Group",
    "groupId": "C",
    "matchday": 2,
    "homeTeam": "C3",
    "awayTeam": "C2",
    "date": "2026-06-19",
    "kickoffTime": "2026-06-19T22:00:00Z",
    "venue": "Gillette Stadium, Foxborough"
  },
  {
    "matchId": 31,
    "stage": "Group",
    "groupId": "D",
    "matchday": 2,
    "homeTeam": "D3",
    "awayTeam": "D4",
    "date": "2026-06-20",
    "kickoffTime": "2026-06-20T03:00:00Z",
    "venue": "Levi's Stadium, Santa Clara"
  },
  {
    "matchId": 32,
    "stage": "Group",
    "groupId": "D",
    "matchday": 2,
    "homeTeam": "D1",
    "awayTeam": "D3",
    "date": "2026-06-19",
    "kickoffTime": "2026-06-19T19:00:00Z",
    "venue": "Lumen Field, Seattle"
  },
  {
    "matchId": 33,
    "stage": "Group",
    "groupId": "E",
    "matchday": 2,
    "homeTeam": "E1",
    "awayTeam": "E3",
    "date": "2026-06-20",
    "kickoffTime": "2026-06-20T20:00:00Z",
    "venue": "BMO Field, Toronto"
  },
  {
    "matchId": 34,
    "stage": "Group",
    "groupId": "E",
    "matchday": 2,
    "homeTeam": "E4",
    "awayTeam": "E2",
    "date": "2026-06-21",
    "kickoffTime": "2026-06-21T00:00:00Z",
    "venue": "Arrowhead Stadium, Kansas City"
  },
  {
    "matchId": 35,
    "stage": "Group",
    "groupId": "F",
    "matchday": 2,
    "homeTeam": "F1",
    "awayTeam": "F4",
    "date": "2026-06-20",
    "kickoffTime": "2026-06-20T17:00:00Z",
    "venue": "NRG Stadium, Houston"
  },
  {
    "matchId": 36,
    "stage": "Group",
    "groupId": "F",
    "matchday": 2,
    "homeTeam": "F2",
    "awayTeam": "F3",
    "date": "2026-06-21",
    "kickoffTime": "2026-06-21T04:00:00Z",
    "venue": "Estadio BBVA, Guadalupe"
  },
  {
    "matchId": 37,
    "stage": "Group",
    "groupId": "H",
    "matchday": 2,
    "homeTeam": "H4",
    "awayTeam": "H2",
    "date": "2026-06-21",
    "kickoffTime": "2026-06-21T22:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens"
  },
  {
    "matchId": 38,
    "stage": "Group",
    "groupId": "H",
    "matchday": 2,
    "homeTeam": "H1",
    "awayTeam": "H3",
    "date": "2026-06-21",
    "kickoffTime": "2026-06-21T16:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta"
  },
  {
    "matchId": 39,
    "stage": "Group",
    "groupId": "G",
    "matchday": 2,
    "homeTeam": "G1",
    "awayTeam": "G3",
    "date": "2026-06-21",
    "kickoffTime": "2026-06-21T19:00:00Z",
    "venue": "SoFi Stadium, Inglewood"
  },
  {
    "matchId": 40,
    "stage": "Group",
    "groupId": "G",
    "matchday": 2,
    "homeTeam": "G4",
    "awayTeam": "G2",
    "date": "2026-06-22",
    "kickoffTime": "2026-06-22T01:00:00Z",
    "venue": "BC Place, Vancouver"
  },
  {
    "matchId": 41,
    "stage": "Group",
    "groupId": "I",
    "matchday": 2,
    "homeTeam": "I3",
    "awayTeam": "I2",
    "date": "2026-06-23",
    "kickoffTime": "2026-06-23T00:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  },
  {
    "matchId": 42,
    "stage": "Group",
    "groupId": "I",
    "matchday": 2,
    "homeTeam": "I1",
    "awayTeam": "I4",
    "date": "2026-06-22",
    "kickoffTime": "2026-06-22T21:00:00Z",
    "venue": "Lincoln Financial Field, Philadelphia"
  },
  {
    "matchId": 43,
    "stage": "Group",
    "groupId": "J",
    "matchday": 2,
    "homeTeam": "J1",
    "awayTeam": "J3",
    "date": "2026-06-22",
    "kickoffTime": "2026-06-22T17:00:00Z",
    "venue": "AT&T Stadium, Arlington"
  },
  {
    "matchId": 44,
    "stage": "Group",
    "groupId": "J",
    "matchday": 2,
    "homeTeam": "J2",
    "awayTeam": "J4",
    "date": "2026-06-23",
    "kickoffTime": "2026-06-23T03:00:00Z",
    "venue": "Levi's Stadium, Santa Clara"
  },
  {
    "matchId": 45,
    "stage": "Group",
    "groupId": "L",
    "matchday": 2,
    "homeTeam": "L1",
    "awayTeam": "L3",
    "date": "2026-06-23",
    "kickoffTime": "2026-06-23T20:00:00Z",
    "venue": "Gillette Stadium, Foxborough"
  },
  {
    "matchId": 46,
    "stage": "Group",
    "groupId": "L",
    "matchday": 2,
    "homeTeam": "L4",
    "awayTeam": "L2",
    "date": "2026-06-23",
    "kickoffTime": "2026-06-23T23:00:00Z",
    "venue": "BMO Field, Toronto"
  },
  {
    "matchId": 47,
    "stage": "Group",
    "groupId": "K",
    "matchday": 2,
    "homeTeam": "K1",
    "awayTeam": "K4",
    "date": "2026-06-23",
    "kickoffTime": "2026-06-23T17:00:00Z",
    "venue": "NRG Stadium, Houston"
  },
  {
    "matchId": 48,
    "stage": "Group",
    "groupId": "K",
    "matchday": 2,
    "homeTeam": "K3",
    "awayTeam": "K2",
    "date": "2026-06-24",
    "kickoffTime": "2026-06-24T02:00:00Z",
    "venue": "Estadio Akron, Zapopan"
  },
  {
    "matchId": 49,
    "stage": "Group",
    "groupId": "C",
    "matchday": 3,
    "homeTeam": "C3",
    "awayTeam": "C1",
    "date": "2026-06-24",
    "kickoffTime": "2026-06-24T22:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens"
  },
  {
    "matchId": 50,
    "stage": "Group",
    "groupId": "C",
    "matchday": 3,
    "homeTeam": "C2",
    "awayTeam": "C4",
    "date": "2026-06-24",
    "kickoffTime": "2026-06-24T22:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta"
  },
  {
    "matchId": 51,
    "stage": "Group",
    "groupId": "B",
    "matchday": 3,
    "homeTeam": "B2",
    "awayTeam": "B1",
    "date": "2026-06-24",
    "kickoffTime": "2026-06-24T19:00:00Z",
    "venue": "BC Place, Vancouver"
  },
  {
    "matchId": 52,
    "stage": "Group",
    "groupId": "B",
    "matchday": 3,
    "homeTeam": "B4",
    "awayTeam": "B3",
    "date": "2026-06-24",
    "kickoffTime": "2026-06-24T19:00:00Z",
    "venue": "Lumen Field, Seattle"
  },
  {
    "matchId": 53,
    "stage": "Group",
    "groupId": "A",
    "matchday": 3,
    "homeTeam": "A3",
    "awayTeam": "A1",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T01:00:00Z",
    "venue": "Estadio Azteca, Mexico City"
  },
  {
    "matchId": 54,
    "stage": "Group",
    "groupId": "A",
    "matchday": 3,
    "homeTeam": "A4",
    "awayTeam": "A2",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T01:00:00Z",
    "venue": "Estadio BBVA, Guadalupe"
  },
  {
    "matchId": 55,
    "stage": "Group",
    "groupId": "E",
    "matchday": 3,
    "homeTeam": "E2",
    "awayTeam": "E3",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T20:00:00Z",
    "venue": "Lincoln Financial Field, Philadelphia"
  },
  {
    "matchId": 56,
    "stage": "Group",
    "groupId": "E",
    "matchday": 3,
    "homeTeam": "E4",
    "awayTeam": "E1",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T20:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  },
  {
    "matchId": 57,
    "stage": "Group",
    "groupId": "F",
    "matchday": 3,
    "homeTeam": "F3",
    "awayTeam": "F4",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T23:00:00Z",
    "venue": "AT&T Stadium, Arlington"
  },
  {
    "matchId": 58,
    "stage": "Group",
    "groupId": "F",
    "matchday": 3,
    "homeTeam": "F2",
    "awayTeam": "F1",
    "date": "2026-06-25",
    "kickoffTime": "2026-06-25T23:00:00Z",
    "venue": "Arrowhead Stadium, Kansas City"
  },
  {
    "matchId": 59,
    "stage": "Group",
    "groupId": "D",
    "matchday": 3,
    "homeTeam": "D3",
    "awayTeam": "D1",
    "date": "2026-06-26",
    "kickoffTime": "2026-06-26T02:00:00Z",
    "venue": "SoFi Stadium, Inglewood"
  },
  {
    "matchId": 60,
    "stage": "Group",
    "groupId": "D",
    "matchday": 3,
    "homeTeam": "D4",
    "awayTeam": "D3",
    "date": "2026-06-26",
    "kickoffTime": "2026-06-26T02:00:00Z",
    "venue": "Levi's Stadium, Santa Clara"
  },
  {
    "matchId": 61,
    "stage": "Group",
    "groupId": "I",
    "matchday": 3,
    "homeTeam": "I3",
    "awayTeam": "I1",
    "date": "2026-06-26",
    "kickoffTime": "2026-06-26T19:00:00Z",
    "venue": "Gillette Stadium, Foxborough"
  },
  {
    "matchId": 62,
    "stage": "Group",
    "groupId": "I",
    "matchday": 3,
    "homeTeam": "I2",
    "awayTeam": "I4",
    "date": "2026-06-26",
    "kickoffTime": "2026-06-26T19:00:00Z",
    "venue": "BMO Field, Toronto"
  },
  {
    "matchId": 63,
    "stage": "Group",
    "groupId": "G",
    "matchday": 3,
    "homeTeam": "G2",
    "awayTeam": "G3",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T03:00:00Z",
    "venue": "Lumen Field, Seattle"
  },
  {
    "matchId": 64,
    "stage": "Group",
    "groupId": "G",
    "matchday": 3,
    "homeTeam": "G4",
    "awayTeam": "G1",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T03:00:00Z",
    "venue": "BC Place, Vancouver"
  },
  {
    "matchId": 65,
    "stage": "Group",
    "groupId": "H",
    "matchday": 3,
    "homeTeam": "H2",
    "awayTeam": "H3",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T00:00:00Z",
    "venue": "NRG Stadium, Houston"
  },
  {
    "matchId": 66,
    "stage": "Group",
    "groupId": "H",
    "matchday": 3,
    "homeTeam": "H4",
    "awayTeam": "H1",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T00:00:00Z",
    "venue": "Estadio Akron, Zapopan"
  },
  {
    "matchId": 67,
    "stage": "Group",
    "groupId": "L",
    "matchday": 3,
    "homeTeam": "L4",
    "awayTeam": "L1",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T21:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  },
  {
    "matchId": 68,
    "stage": "Group",
    "groupId": "L",
    "matchday": 3,
    "homeTeam": "L2",
    "awayTeam": "L3",
    "date": "2026-06-27",
    "kickoffTime": "2026-06-27T21:00:00Z",
    "venue": "Lincoln Financial Field, Philadelphia"
  },
  {
    "matchId": 69,
    "stage": "Group",
    "groupId": "J",
    "matchday": 3,
    "homeTeam": "J4",
    "awayTeam": "J3",
    "date": "2026-06-28",
    "kickoffTime": "2026-06-28T02:00:00Z",
    "venue": "Arrowhead Stadium, Kansas City"
  },
  {
    "matchId": 70,
    "stage": "Group",
    "groupId": "J",
    "matchday": 3,
    "homeTeam": "J2",
    "awayTeam": "J1",
    "date": "2026-06-28",
    "kickoffTime": "2026-06-28T02:00:00Z",
    "venue": "AT&T Stadium, Arlington"
  },
  {
    "matchId": 71,
    "stage": "Group",
    "groupId": "K",
    "matchday": 3,
    "homeTeam": "K3",
    "awayTeam": "K1",
    "date": "2026-06-28",
    "kickoffTime": "2026-06-28T23:30:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens"
  },
  {
    "matchId": 72,
    "stage": "Group",
    "groupId": "K",
    "matchday": 3,
    "homeTeam": "K2",
    "awayTeam": "K4",
    "date": "2026-06-28",
    "kickoffTime": "2026-06-28T23:30:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta"
  },
  {
    "matchId": 73,
    "stage": "Round of 32",
    "homeTeam": "2A",
    "awayTeam": "2B",
    "date": "2026-06-28",
    "kickoffTime": "2026-06-28T19:00:00Z",
    "venue": "SoFi Stadium, Inglewood",
    "targetMatchId": 90,
    "targetSlot": "home"
  },
  {
    "matchId": 74,
    "stage": "Round of 32",
    "homeTeam": "1E",
    "awayTeam": "3rd-ABCDF",
    "date": "2026-06-29",
    "kickoffTime": "2026-06-29T20:30:00Z",
    "venue": "Gillette Stadium, Foxborough",
    "targetMatchId": 89,
    "targetSlot": "home"
  },
  {
    "matchId": 75,
    "stage": "Round of 32",
    "homeTeam": "1F",
    "awayTeam": "2C",
    "date": "2026-06-30",
    "kickoffTime": "2026-06-30T01:00:00Z",
    "venue": "Estadio BBVA, Guadalupe",
    "targetMatchId": 90,
    "targetSlot": "away"
  },
  {
    "matchId": 76,
    "stage": "Round of 32",
    "homeTeam": "1C",
    "awayTeam": "2F",
    "date": "2026-06-29",
    "kickoffTime": "2026-06-29T17:00:00Z",
    "venue": "NRG Stadium, Houston",
    "targetMatchId": 91,
    "targetSlot": "home"
  },
  {
    "matchId": 77,
    "stage": "Round of 32",
    "homeTeam": "1I",
    "awayTeam": "3rd-CDFGH",
    "date": "2026-06-30",
    "kickoffTime": "2026-06-30T21:00:00Z",
    "venue": "MetLife Stadium, East Rutherford",
    "targetMatchId": 89,
    "targetSlot": "away"
  },
  {
    "matchId": 78,
    "stage": "Round of 32",
    "homeTeam": "2E",
    "awayTeam": "2I",
    "date": "2026-06-30",
    "kickoffTime": "2026-06-30T17:00:00Z",
    "venue": "AT&T Stadium, Arlington",
    "targetMatchId": 91,
    "targetSlot": "away"
  },
  {
    "matchId": 79,
    "stage": "Round of 32",
    "homeTeam": "1A",
    "awayTeam": "3rd-CEFHI",
    "date": "2026-07-01",
    "kickoffTime": "2026-07-01T01:00:00Z",
    "venue": "Estadio Azteca, Mexico City",
    "targetMatchId": 92,
    "targetSlot": "home"
  },
  {
    "matchId": 80,
    "stage": "Round of 32",
    "homeTeam": "1L",
    "awayTeam": "3rd-EHIJK",
    "date": "2026-07-01",
    "kickoffTime": "2026-07-01T16:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta",
    "targetMatchId": 92,
    "targetSlot": "away"
  },
  {
    "matchId": 81,
    "stage": "Round of 32",
    "homeTeam": "1D",
    "awayTeam": "3rd-BEFIJ",
    "date": "2026-07-02",
    "kickoffTime": "2026-07-02T00:00:00Z",
    "venue": "Levi's Stadium, Santa Clara",
    "targetMatchId": 94,
    "targetSlot": "home"
  },
  {
    "matchId": 82,
    "stage": "Round of 32",
    "homeTeam": "1G",
    "awayTeam": "3rd-AEHIJ",
    "date": "2026-07-01",
    "kickoffTime": "2026-07-01T20:00:00Z",
    "venue": "Lumen Field, Seattle",
    "targetMatchId": 94,
    "targetSlot": "away"
  },
  {
    "matchId": 83,
    "stage": "Round of 32",
    "homeTeam": "2K",
    "awayTeam": "2L",
    "date": "2026-07-02",
    "kickoffTime": "2026-07-02T23:00:00Z",
    "venue": "BMO Field, Toronto",
    "targetMatchId": 93,
    "targetSlot": "home"
  },
  {
    "matchId": 84,
    "stage": "Round of 32",
    "homeTeam": "1H",
    "awayTeam": "2J",
    "date": "2026-07-02",
    "kickoffTime": "2026-07-02T19:00:00Z",
    "venue": "SoFi Stadium, Inglewood",
    "targetMatchId": 93,
    "targetSlot": "away"
  },
  {
    "matchId": 85,
    "stage": "Round of 32",
    "homeTeam": "1B",
    "awayTeam": "3rd-EFGIJ",
    "date": "2026-07-03",
    "kickoffTime": "2026-07-03T03:00:00Z",
    "venue": "BC Place, Vancouver",
    "targetMatchId": 96,
    "targetSlot": "home"
  },
  {
    "matchId": 86,
    "stage": "Round of 32",
    "homeTeam": "1J",
    "awayTeam": "2H",
    "date": "2026-07-03",
    "kickoffTime": "2026-07-03T22:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens",
    "targetMatchId": 95,
    "targetSlot": "home"
  },
  {
    "matchId": 87,
    "stage": "Round of 32",
    "homeTeam": "1K",
    "awayTeam": "3rd-DEIJL",
    "date": "2026-07-04",
    "kickoffTime": "2026-07-04T01:30:00Z",
    "venue": "Arrowhead Stadium, Kansas City",
    "targetMatchId": 96,
    "targetSlot": "away"
  },
  {
    "matchId": 88,
    "stage": "Round of 32",
    "homeTeam": "2D",
    "awayTeam": "2G",
    "date": "2026-07-03",
    "kickoffTime": "2026-07-03T18:00:00Z",
    "venue": "AT&T Stadium, Arlington",
    "targetMatchId": 95,
    "targetSlot": "away"
  },
  {
    "matchId": 89,
    "stage": "Round of 16",
    "homeTeam": "W74",
    "awayTeam": "W77",
    "date": "2026-07-04",
    "kickoffTime": "2026-07-04T21:00:00Z",
    "venue": "Lincoln Financial Field, Philadelphia",
    "targetMatchId": 97,
    "targetSlot": "home"
  },
  {
    "matchId": 90,
    "stage": "Round of 16",
    "homeTeam": "W73",
    "awayTeam": "W75",
    "date": "2026-07-04",
    "kickoffTime": "2026-07-04T17:00:00Z",
    "venue": "NRG Stadium, Houston",
    "targetMatchId": 97,
    "targetSlot": "away"
  },
  {
    "matchId": 91,
    "stage": "Round of 16",
    "homeTeam": "W76",
    "awayTeam": "W78",
    "date": "2026-07-05",
    "kickoffTime": "2026-07-05T20:00:00Z",
    "venue": "MetLife Stadium, East Rutherford",
    "targetMatchId": 99,
    "targetSlot": "home"
  },
  {
    "matchId": 92,
    "stage": "Round of 16",
    "homeTeam": "W79",
    "awayTeam": "W80",
    "date": "2026-07-06",
    "kickoffTime": "2026-07-06T00:00:00Z",
    "venue": "Estadio Azteca, Mexico City",
    "targetMatchId": 99,
    "targetSlot": "away"
  },
  {
    "matchId": 93,
    "stage": "Round of 16",
    "homeTeam": "W83",
    "awayTeam": "W84",
    "date": "2026-07-06",
    "kickoffTime": "2026-07-06T19:00:00Z",
    "venue": "AT&T Stadium, Arlington",
    "targetMatchId": 98,
    "targetSlot": "home"
  },
  {
    "matchId": 94,
    "stage": "Round of 16",
    "homeTeam": "W81",
    "awayTeam": "W82",
    "date": "2026-07-07",
    "kickoffTime": "2026-07-07T00:00:00Z",
    "venue": "Lumen Field, Seattle",
    "targetMatchId": 98,
    "targetSlot": "away"
  },
  {
    "matchId": 95,
    "stage": "Round of 16",
    "homeTeam": "W86",
    "awayTeam": "W88",
    "date": "2026-07-07",
    "kickoffTime": "2026-07-07T16:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta",
    "targetMatchId": 100,
    "targetSlot": "home"
  },
  {
    "matchId": 96,
    "stage": "Round of 16",
    "homeTeam": "W85",
    "awayTeam": "W87",
    "date": "2026-07-07",
    "kickoffTime": "2026-07-07T20:00:00Z",
    "venue": "BC Place, Vancouver",
    "targetMatchId": 100,
    "targetSlot": "away"
  },
  {
    "matchId": 97,
    "stage": "Quarterfinals",
    "homeTeam": "W89",
    "awayTeam": "W90",
    "date": "2026-07-09",
    "kickoffTime": "2026-07-09T20:00:00Z",
    "venue": "Gillette Stadium, Foxborough",
    "targetMatchId": 101,
    "targetSlot": "home"
  },
  {
    "matchId": 98,
    "stage": "Quarterfinals",
    "homeTeam": "W93",
    "awayTeam": "W94",
    "date": "2026-07-10",
    "kickoffTime": "2026-07-10T19:00:00Z",
    "venue": "SoFi Stadium, Inglewood",
    "targetMatchId": 101,
    "targetSlot": "away"
  },
  {
    "matchId": 99,
    "stage": "Quarterfinals",
    "homeTeam": "W91",
    "awayTeam": "W92",
    "date": "2026-07-11",
    "kickoffTime": "2026-07-11T21:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens",
    "targetMatchId": 102,
    "targetSlot": "home"
  },
  {
    "matchId": 100,
    "stage": "Quarterfinals",
    "homeTeam": "W95",
    "awayTeam": "W96",
    "date": "2026-07-12",
    "kickoffTime": "2026-07-12T01:00:00Z",
    "venue": "Arrowhead Stadium, Kansas City",
    "targetMatchId": 102,
    "targetSlot": "away"
  },
  {
    "matchId": 101,
    "stage": "Semifinals",
    "homeTeam": "W97",
    "awayTeam": "W98",
    "date": "2026-07-14",
    "kickoffTime": "2026-07-14T19:00:00Z",
    "venue": "AT&T Stadium, Arlington",
    "targetMatchId": 104,
    "targetSlot": "home",
    "loserTargetMatchId": 103,
    "loserTargetSlot": "home"
  },
  {
    "matchId": 102,
    "stage": "Semifinals",
    "homeTeam": "W99",
    "awayTeam": "W100",
    "date": "2026-07-15",
    "kickoffTime": "2026-07-15T19:00:00Z",
    "venue": "Mercedes-Benz Stadium, Atlanta",
    "targetMatchId": 104,
    "targetSlot": "away",
    "loserTargetMatchId": 103,
    "loserTargetSlot": "away"
  },
  {
    "matchId": 103,
    "stage": "3rd Place",
    "homeTeam": "L101",
    "awayTeam": "L102",
    "date": "2026-07-18",
    "kickoffTime": "2026-07-18T21:00:00Z",
    "venue": "Hard Rock Stadium, Miami Gardens"
  },
  {
    "matchId": 104,
    "stage": "Final",
    "homeTeam": "W101",
    "awayTeam": "W102",
    "date": "2026-07-19",
    "kickoffTime": "2026-07-19T19:00:00Z",
    "venue": "MetLife Stadium, East Rutherford"
  }
];

// src/data/matchFactory.ts
var EMPTY_PENALTIES = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null
};
function definitionToMatch(def) {
  const isGroup = def.stage === "Group";
  return {
    matchId: def.matchId,
    id: `m-${def.matchId}`,
    stage: def.stage,
    phase: isGroup ? "group" : "knockout",
    groupId: def.groupId,
    matchday: def.matchday,
    homeTeam: def.homeTeam,
    awayTeam: def.awayTeam,
    homeTeamId: isGroup ? slotToTeamId(def.homeTeam) : null,
    awayTeamId: isGroup ? slotToTeamId(def.awayTeam) : null,
    date: def.date,
    kickoffTime: def.kickoffTime,
    lockTime: def.kickoffTime,
    venue: def.venue,
    status: "pending",
    realStatus: "NS",
    realHomeScore: null,
    realAwayScore: null,
    realExtraTime: false,
    realPenaltyWinner: null,
    userHomeScore: null,
    userAwayScore: null,
    extraTime: false,
    penalties: { ...EMPTY_PENALTIES },
    advancedTeamId: null,
    officialHomeScore: null,
    officialAwayScore: null,
    officialPenaltyWinnerId: null,
    discipline: { ...EMPTY_MATCH_DISCIPLINE },
    targetMatchId: def.targetMatchId,
    targetSlot: def.targetSlot,
    loserTargetMatchId: def.loserTargetMatchId,
    loserTargetSlot: def.loserTargetSlot
  };
}
function createInitialMatches() {
  return INITIAL_MATCH_DEFINITIONS.map(definitionToMatch);
}
function createGroupMatches() {
  return createInitialMatches().filter((m) => m.phase === "group");
}
function createKnockoutMatches() {
  return createInitialMatches().filter((m) => m.phase === "knockout");
}

// src/logic/cascadeCleaner.ts
var EMPTY_PENALTIES2 = {
  homeScored: null,
  awayScored: null,
  winnerTeamId: null
};
function computeAdvancementFingerprint(snapshot) {
  const groupPart = GROUP_IDS.map((id) => {
    const group = snapshot.groups.find((g) => g.id === id);
    if (!group) return `${id}:-`;
    if (group.requiresManualTieBreak) return `${id}:MANUAL`;
    const top2 = group.standings.filter((s) => s.position <= 2).map((s) => s.team.id).join(",");
    return `${id}:${top2}`;
  }).join("|");
  const thirds = [...snapshot.qualifiedThirdGroups].sort().join("");
  return `${groupPart}::${thirds}::${snapshot.annexCKey ?? ""}`;
}
function advancementChanged(previous, next) {
  return computeAdvancementFingerprint(previous) !== computeAdvancementFingerprint(next);
}
function clearDownstreamKnockoutPredictions(matches) {
  return matches.map((match) => {
    if (match.phase !== "knockout") return match;
    return {
      ...match,
      userHomeScore: null,
      userAwayScore: null,
      extraTime: false,
      penalties: { ...EMPTY_PENALTIES2 },
      advancedTeamId: null
    };
  });
}
function hasUnresolvedManualTieBreaks(groups) {
  return groups.some((g) => g.requiresManualTieBreak);
}

// src/data/annexC.ts
var THIRD_PLACE_SLOT_MAP = {
  "EFGHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3F",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "DFGHIJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "DEGHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "DEFHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "DEFGIJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "DEFGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "DEFGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "DEFGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "DEFGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CFGHIJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CEGHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "CEFHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CEFGIJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CEFGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CEFGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CEFGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "CEFGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CDGHIJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "CDFHIJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDFGIJKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDFGHJKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDFGHIKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDFGHIJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "CDFGHIJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CDEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEGIJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "CDEGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "CDEFIJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFHJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFHIKL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3I",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFHIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "CDEFHIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CDEFGJKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFGIKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFGIJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "CDEFGIJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CDEFGHKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "CDEFGHJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "CDEFGHJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "CDEFGHIL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "CDEFGHIK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "CDEFGHIJ": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "BFGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BEGHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3B",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BEFHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BEFGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BEFGHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BEFGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3F",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BEFGHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "BEFGHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3H",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "BDGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BDFHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDFGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDFGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDFGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDFGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BDFGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BDEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEGHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEGHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "BDEGHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "BDEFIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BDEFHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BDEFGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BDEFGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BDEFGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BDEFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "BDEFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "BDEFGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BDEFGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BDEFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "BCGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BCFHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCFGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCFGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCFGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCFGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCFGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEGHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEGHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "BCEGHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "BCEFIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCEFHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCEFGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCEFGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCEFGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCEFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "BCEFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "BCEFGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCEFGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCEFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "BCDHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDFIJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFHJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFHIKL": {
    "1A": "3C",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFHIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDFHIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDFGJKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFGIKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFGIJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDFGIJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDFGHKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDFGHJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "BCDFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "BCDFGHIL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDFGHIK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "BCDEIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "BCDEGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3E",
    "1L": "3K"
  },
  "BCDEGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3H",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3D",
    "1K": "3E",
    "1L": "3I"
  },
  "BCDEFJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEFIKL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEFIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEFIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEFHKL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEFHJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "BCDEFHJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "BCDEFHIL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEFHIK": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEFHIJ": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "BCDEFGKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "BCDEFGJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "BCDEFGJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "BCDEFGIL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "BCDEFGIK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3E",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "BCDEFGIJ": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3J",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "BCDEFGHL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "BCDEFGHK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "BCDEFGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3J",
    "1I": "3F",
    "1K": "3D",
    "1L": "3E"
  },
  "BCDEFGHI": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3H",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "AFGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "AEGHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3A",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "AEFHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "AEFGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "AEFGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "AEFGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "AEFGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "AEFGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ADGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ADFHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADFGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADFGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADFGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADFGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ADFGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ADEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ADEGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ADEFIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFHIKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ADEFHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ADEFGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ADEFGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ADEFGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ADEFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ADEFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ADEFGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ADEFGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ADEFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ACGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ACFHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACFGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACFGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACFGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACFGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACFGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEGHJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEGHIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ACEGHIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ACEFIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFHIKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACEFHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACEFGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACEFGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACEFGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACEFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ACEFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ACEFGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACEFGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACEFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ACDHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDGIJKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDGHJKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDGHIJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDGHIJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDFIJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFHIKL": {
    "1A": "3H",
    "1B": "3F",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDFHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDFGJKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFGIKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFGIJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDFGIJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDFGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDFGHJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3H"
  },
  "ACDFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ACDFGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDFGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ACDEIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEHIKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEGJKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3I",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEGIJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEGIJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ACDEGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3K"
  },
  "ACDEGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3I"
  },
  "ACDEFJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEFIKL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3I",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEFIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEFIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEFHKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEFHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ACDEFHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ACDEFHIL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEFHIK": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEFHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ACDEFGKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ACDEFGJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ACDEFGJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ACDEFGIL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ACDEFGIK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3E",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ACDEFGIJ": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3J",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ACDEFGHL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3F",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ACDEFGHK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ACDEFGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3J",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3E"
  },
  "ACDEFGHI": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3E",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ABGHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABFHIJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABFGIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABFGHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABFGHIKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABFGHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABFGHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABEHIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEGIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEGHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEGHIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEGHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3H",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABEGHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3H",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABEFIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABEFHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABEFGJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFGIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABEFGIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABEFGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABEFGHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3E"
  },
  "ABEFGHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3K"
  },
  "ABEFGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABEFGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABEFGHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3I"
  },
  "ABDHIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDGIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDGHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDGHIKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDGHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDGHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDFIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFHIKL": {
    "1A": "3H",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDFHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDFGJKL": {
    "1A": "3F",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFGIKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFGIJL": {
    "1A": "3F",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDFGIJK": {
    "1A": "3F",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDFGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "ABDFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3J",
    "1L": "3K"
  },
  "ABDFGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDFGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3J"
  },
  "ABDEIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEGJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEGIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEGIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEGHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3E"
  },
  "ABDEGHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3K"
  },
  "ABDEGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEGHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3I"
  },
  "ABDEFJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEFIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEFIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEFIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEFHKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEFHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABDEFHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABDEFHIL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEFHIK": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEFHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABDEFGKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABDEFGJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "ABDEFGJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3J",
    "1L": "3K"
  },
  "ABDEFGIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABDEFGIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABDEFGIJ": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3J"
  },
  "ABDEFGHL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABDEFGHK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABDEFGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3J"
  },
  "ABDEFGHI": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCHIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCGIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCGHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCGHIKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCGHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCGHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCFIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFHIKL": {
    "1A": "3H",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCFHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCFGJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFGIKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFGIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCFGIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3F",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCFGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCFGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "ABCFGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3J",
    "1L": "3K"
  },
  "ABCFGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCFGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCFGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3J"
  },
  "ABCEIJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3C",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEHJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEHIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEHIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEHIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEGJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEGIKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3A",
    "1G": "3I",
    "1I": "3C",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEGIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEGIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEGHKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEGHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCEGHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCEGHIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEGHIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3H",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEGHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3G",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCEFJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEFIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEFIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEFIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEFHKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEFHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCEFHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCEFHIL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEFHIK": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEFHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCEFGKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCEFGJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "ABCEFGJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3J",
    "1L": "3K"
  },
  "ABCEFGIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCEFGIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCEFGIJ": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3J"
  },
  "ABCEFGHL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCEFGHK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCEFGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3J"
  },
  "ABCEFGHI": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCDIJKL": {
    "1A": "3I",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDHJKL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDHIKL": {
    "1A": "3H",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDHIJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDHIJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDGJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDGIKL": {
    "1A": "3I",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDGIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDGIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3G",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDGHKL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDGHJL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3J"
  },
  "ABCDGHJK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3J",
    "1L": "3K"
  },
  "ABCDGHIL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDGHIK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDGHIJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3J"
  },
  "ABCDFJKL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDFIKL": {
    "1A": "3C",
    "1B": "3I",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDFIJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDFIJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDFHKL": {
    "1A": "3H",
    "1B": "3F",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDFHJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3H"
  },
  "ABCDFHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ABCDFHIL": {
    "1A": "3H",
    "1B": "3F",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDFHIK": {
    "1A": "3H",
    "1B": "3F",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDFHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ABCDFGKL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDFGJL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3J"
  },
  "ABCDFGJK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3J",
    "1L": "3K"
  },
  "ABCDFGIL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDFGIK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDFGIJ": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3J"
  },
  "ABCDFGHL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3H"
  },
  "ABCDFGHK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ABCDFGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3J"
  },
  "ABCDFGHI": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ABCDEJKL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDEIKL": {
    "1A": "3E",
    "1B": "3I",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDEIJL": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDEIJK": {
    "1A": "3E",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDEHKL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDEHJL": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCDEHJK": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCDEHIL": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDEHIK": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDEHIJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCDEGKL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDEGJL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3J"
  },
  "ABCDEGJK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3J",
    "1L": "3K"
  },
  "ABCDEGIL": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDEGIK": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDEGIJ": {
    "1A": "3E",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3I",
    "1L": "3J"
  },
  "ABCDEGHL": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCDEGHK": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCDEGHJ": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3J"
  },
  "ABCDEGHI": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCDEFKL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3K"
  },
  "ABCDEFJL": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCDEFJK": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCDEFIL": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3I"
  },
  "ABCDEFIK": {
    "1A": "3C",
    "1B": "3E",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3I",
    "1L": "3K"
  },
  "ABCDEFIJ": {
    "1A": "3C",
    "1B": "3J",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCDEFHL": {
    "1A": "3H",
    "1B": "3F",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3D",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCDEFHK": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3K"
  },
  "ABCDEFHJ": {
    "1A": "3H",
    "1B": "3J",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3E"
  },
  "ABCDEFHI": {
    "1A": "3H",
    "1B": "3E",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3I"
  },
  "ABCDEFGL": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3L",
    "1L": "3E"
  },
  "ABCDEFGK": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3K"
  },
  "ABCDEFGJ": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3J"
  },
  "ABCDEFGI": {
    "1A": "3C",
    "1B": "3G",
    "1D": "3B",
    "1E": "3D",
    "1G": "3A",
    "1I": "3F",
    "1K": "3E",
    "1L": "3I"
  },
  "ABCDEFGH": {
    "1A": "3H",
    "1B": "3G",
    "1D": "3B",
    "1E": "3C",
    "1G": "3A",
    "1I": "3F",
    "1K": "3D",
    "1L": "3E"
  }
};

// src/logic/matchScores.ts
function usesOfficialResult(match) {
  const hasScores = match.officialHomeScore !== null && match.officialAwayScore !== null || match.realHomeScore !== null && match.realAwayScore !== null;
  return (match.status === "live" || match.status === "completed" || match.realStatus !== "NS") && hasScores;
}
function getEffectiveMatchScores(match) {
  if (match.userHomeScore !== null && match.userAwayScore !== null) {
    return {
      home: match.userHomeScore,
      away: match.userAwayScore,
      penaltyWinnerId: match.penalties.winnerTeamId,
      source: "user"
    };
  }
  if (usesOfficialResult(match)) {
    return {
      home: match.officialHomeScore ?? match.realHomeScore,
      away: match.officialAwayScore ?? match.realAwayScore,
      penaltyWinnerId: match.realPenaltyWinner ?? match.officialPenaltyWinnerId ?? match.penalties.winnerTeamId,
      source: "official"
    };
  }
  return null;
}
function hasEffectiveResult(match) {
  return getEffectiveMatchScores(match) !== null;
}
function getWinnerFromScores(match, scores) {
  if (!match.homeTeamId || !match.awayTeamId) return null;
  if (scores.home > scores.away) return match.homeTeamId;
  if (scores.away > scores.home) return match.awayTeamId;
  if (match.phase !== "knockout") return null;
  return scores.penaltyWinnerId;
}
function getLoserFromScores(match, scores) {
  const winner = getWinnerFromScores(match, scores);
  if (!winner) return null;
  return winner === match.homeTeamId ? match.awayTeamId : match.homeTeamId;
}
function getEffectiveWinner(match) {
  const scores = getEffectiveMatchScores(match);
  if (!scores) return null;
  return getWinnerFromScores(match, scores);
}
function getEffectiveLoser(match) {
  const scores = getEffectiveMatchScores(match);
  if (!scores) return null;
  return getLoserFromScores(match, scores);
}

// src/logic/tiebreakers.ts
function createEmptyStanding(team) {
  return {
    team,
    played: 0,
    won: 0,
    drawn: 0,
    lost: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    points: 0,
    fairPlayPoints: 0,
    position: 0
  };
}
function fairPlayDeductionForSide(discipline, side) {
  const yellow = side === "home" ? discipline.homeYellowCards : discipline.awayYellowCards;
  const secondYellow = side === "home" ? discipline.homeSecondYellowRedCards : discipline.awaySecondYellowRedCards;
  const directRed = side === "home" ? discipline.homeDirectRedCards : discipline.awayDirectRedCards;
  const yellowAndDirect = side === "home" ? discipline.homeYellowAndDirectRedCards : discipline.awayYellowAndDirectRedCards;
  return yellow * 1 + secondYellow * 3 + directRed * 4 + yellowAndDirect * 5;
}
function buildHeadToHeadRecords(teamIds, matches) {
  const concerned = new Set(teamIds);
  const records = /* @__PURE__ */ new Map();
  for (const id of teamIds) {
    records.set(id, { points: 0, goalDifference: 0, goalsFor: 0 });
  }
  for (const match of matches) {
    if (!hasEffectiveResult(match)) continue;
    const homeId = match.homeTeamId;
    const awayId = match.awayTeamId;
    if (!homeId || !awayId) continue;
    if (!concerned.has(homeId) || !concerned.has(awayId)) continue;
    const scores = getEffectiveMatchScores(match);
    if (!scores) continue;
    const home = records.get(homeId);
    const away = records.get(awayId);
    home.goalsFor += scores.home;
    home.goalDifference += scores.home - scores.away;
    away.goalsFor += scores.away;
    away.goalDifference += scores.away - scores.home;
    if (scores.home > scores.away) {
      home.points += 3;
    } else if (scores.home < scores.away) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }
  }
  return records;
}
function miniLeagueKey(standing, headToHead) {
  const record = headToHead.get(standing.team.id) ?? {
    points: 0,
    goalDifference: 0,
    goalsFor: 0
  };
  return `${record.points}|${record.goalDifference}|${record.goalsFor}`;
}
function clusterBy(items, keyFn) {
  const buckets = [];
  for (const item of items) {
    const key = keyFn(item);
    const last = buckets[buckets.length - 1];
    if (last && keyFn(last[0]) === key) {
      last.push(item);
    } else {
      buckets.push([item]);
    }
  }
  return buckets;
}
function compareMiniLeague(a, b, headToHead) {
  const aH2H = headToHead.get(a.team.id);
  const bH2H = headToHead.get(b.team.id);
  if (bH2H.points !== aH2H.points) return bH2H.points - aH2H.points;
  if (bH2H.goalDifference !== aH2H.goalDifference) {
    return bH2H.goalDifference - aH2H.goalDifference;
  }
  if (bH2H.goalsFor !== aH2H.goalsFor) return bH2H.goalsFor - aH2H.goalsFor;
  return 0;
}
function compareFairPlayAndRanking(a, b) {
  if (b.fairPlayPoints !== a.fairPlayPoints) return b.fairPlayPoints - a.fairPlayPoints;
  return a.team.fifaRanking - b.team.fifaRanking;
}
function isFairPlayLotsDeadlock(a, b) {
  return a.fairPlayPoints === b.fairPlayPoints && a.team.fifaRanking === b.team.fifaRanking;
}
function stableTeamOrder(a, b) {
  return a.team.id.localeCompare(b.team.id);
}
function isClusterDeadlocked(cluster) {
  if (cluster.length < 2) return false;
  return cluster.every((row) => isFairPlayLotsDeadlock(row, cluster[0]));
}
function sortByFairPlayOrDeadlock(cluster, deadlocks) {
  if (cluster.length <= 1) return cluster;
  if (isClusterDeadlocked(cluster)) {
    deadlocks.push(...cluster.map((s) => s.team.id));
    return [...cluster].sort(stableTeamOrder);
  }
  return [...cluster].sort(compareFairPlayAndRanking);
}
function resolveMiniLeagueTie(tied, groupMatches, ctx) {
  if (tied.length <= 1) return tied;
  const teamIds = tied.map((s) => s.team.id);
  const headToHead = buildHeadToHeadRecords(teamIds, groupMatches);
  const miniSorted = [...tied].sort((a, b) => compareMiniLeague(a, b, headToHead));
  const miniBuckets = clusterBy(miniSorted, (s) => miniLeagueKey(s, headToHead));
  const result = [];
  for (const bucket of miniBuckets) {
    if (bucket.length === 1) {
      result.push(bucket[0]);
      continue;
    }
    if (bucket.length === 2) {
      const [a, b] = bucket;
      const mini = compareMiniLeague(a, b, headToHead);
      if (mini !== 0) {
        result.push(...[...bucket].sort((x, y) => compareMiniLeague(x, y, headToHead)));
      } else {
        result.push(...sortByFairPlayOrDeadlock(bucket, ctx.deadlocks));
      }
      continue;
    }
    const concernedIds = new Set(bucket.map((s) => s.team.id));
    const concernedMatches = groupMatches.filter(
      (m) => m.homeTeamId && m.awayTeamId && concernedIds.has(m.homeTeamId) && concernedIds.has(m.awayTeamId)
    );
    const concernedH2H = buildHeadToHeadRecords(
      bucket.map((s) => s.team.id),
      concernedMatches
    );
    const uniqueMiniKeys = new Set(
      bucket.map((s) => miniLeagueKey(s, concernedH2H))
    );
    if (uniqueMiniKeys.size === 1) {
      result.push(...sortByFairPlayOrDeadlock(bucket, ctx.deadlocks));
      continue;
    }
    result.push(...resolveMiniLeagueTie(bucket, concernedMatches, ctx));
  }
  return result;
}
function resolveTiedTeams(tied, groupMatches, ctx) {
  if (tied.length <= 1) return tied;
  const overallSorted = [...tied].sort((a, b) => {
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });
  const overallBuckets = clusterBy(
    overallSorted,
    (s) => `${s.goalDifference}|${s.goalsFor}`
  );
  const result = [];
  for (const bucket of overallBuckets) {
    if (bucket.length === 1) {
      result.push(bucket[0]);
      continue;
    }
    result.push(...resolveMiniLeagueTie(bucket, groupMatches, ctx));
  }
  return result;
}
function compareThirdPlaceWildcard(a, b) {
  if (b.points !== a.points) return b.points - a.points;
  if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return compareFairPlayAndRanking(a, b);
}
function groupByPoints(standings) {
  const buckets = /* @__PURE__ */ new Map();
  for (const row of standings) {
    const bucket = buckets.get(row.points) ?? [];
    bucket.push(row);
    buckets.set(row.points, bucket);
  }
  return [...buckets.entries()].sort(([a], [b]) => b - a).map(([, group]) => group);
}
function applyManualOrder(resolved, deadlockTeamIds, manualOrder) {
  const uniqueDeadlocks = [...new Set(deadlockTeamIds)];
  if (uniqueDeadlocks.length < 2) return resolved;
  const orderedIds = manualOrder.filter((id) => uniqueDeadlocks.includes(id));
  if (orderedIds.length !== uniqueDeadlocks.length) return null;
  if (new Set(orderedIds).size !== uniqueDeadlocks.length) return null;
  const byId = new Map(resolved.map((s) => [s.team.id, s]));
  const cluster = orderedIds.map((id) => byId.get(id));
  const rest = resolved.filter((s) => !uniqueDeadlocks.includes(s.team.id));
  const points = cluster[0].points;
  const before = rest.filter((s) => s.points > points);
  const after = rest.filter((s) => s.points < points);
  return [...before, ...cluster, ...after];
}
function sortGroupStandingsFifa(standings, matches, manualOrder) {
  const ctx = { deadlocks: [] };
  const resolved = [];
  for (const tieGroup of groupByPoints(standings)) {
    if (tieGroup.length === 1) {
      resolved.push(tieGroup[0]);
      continue;
    }
    resolved.push(...resolveTiedTeams(tieGroup, matches, ctx));
  }
  const deadlockTeamIds = [...new Set(ctx.deadlocks)];
  if (deadlockTeamIds.length >= 2 && manualOrder) {
    const merged = applyManualOrder(resolved, deadlockTeamIds, manualOrder);
    if (merged) {
      return {
        standings: merged.map((row, index) => ({ ...row, position: index + 1 })),
        requiresManualTieBreak: false,
        deadlockTeamIds: []
      };
    }
  }
  return {
    standings: resolved.map((row, index) => ({ ...row, position: index + 1 })),
    requiresManualTieBreak: deadlockTeamIds.length >= 2,
    deadlockTeamIds
  };
}
function getThirdPlaceCombinationKey(groups) {
  return [...groups].sort().join("");
}

// src/logic/tournamentEngine.ts
var THIRD_PLACE_SLOT_BY_LABEL = {
  "3rd-ABCDF": "1E",
  "3rd-CDFGH": "1I",
  "3rd-CEFHI": "1A",
  "3rd-EHIJK": "1L",
  "3rd-BEFIJ": "1D",
  "3rd-AEHIJ": "1G",
  "3rd-EFGIJ": "1B",
  "3rd-DEIJL": "1K"
};
function calculateGroupStandings(group, teams, matches, manualTieBreakOrders) {
  const standingsMap = /* @__PURE__ */ new Map();
  for (const team of teams.filter((t) => t.group === group)) {
    standingsMap.set(team.id, createEmptyStanding(team));
  }
  const groupMatches = matches.filter(
    (m) => m.phase === "group" && m.groupId === group && hasEffectiveResult(m)
  );
  for (const match of groupMatches) {
    const scores = getEffectiveMatchScores(match);
    if (!scores) continue;
    const home = standingsMap.get(match.homeTeamId);
    const away = standingsMap.get(match.awayTeamId);
    if (!home || !away) continue;
    home.played += 1;
    away.played += 1;
    home.goalsFor += scores.home;
    home.goalsAgainst += scores.away;
    away.goalsFor += scores.away;
    away.goalsAgainst += scores.home;
    home.fairPlayPoints -= fairPlayDeductionForSide(match.discipline, "home");
    away.fairPlayPoints -= fairPlayDeductionForSide(match.discipline, "away");
    if (scores.home > scores.away) {
      home.won += 1;
      home.points += 3;
      away.lost += 1;
    } else if (scores.home < scores.away) {
      away.won += 1;
      away.points += 3;
      home.lost += 1;
    } else {
      home.drawn += 1;
      away.drawn += 1;
      home.points += 1;
      away.points += 1;
    }
  }
  const raw = [...standingsMap.values()].map((s) => ({
    ...s,
    goalDifference: s.goalsFor - s.goalsAgainst
  }));
  const sorted = sortGroupStandingsFifa(raw, groupMatches, manualTieBreakOrders?.[group]);
  return {
    id: group,
    teams: teams.filter((t) => t.group === group),
    standings: sorted.standings,
    requiresManualTieBreak: sorted.requiresManualTieBreak,
    deadlockTeamIds: sorted.deadlockTeamIds
  };
}
function calculateAllGroupStandings(teams, matches, manualTieBreakOrders) {
  return GROUP_IDS.map(
    (id) => calculateGroupStandings(id, teams, matches, manualTieBreakOrders)
  );
}
function isGroupStageComplete(matches) {
  const groupMatches = matches.filter((m) => m.phase === "group");
  return groupMatches.length === 72 && groupMatches.every((m) => hasEffectiveResult(m));
}
function buildThirdPlaceWildcardTable(groups) {
  const thirdPlace = groups.map((g) => g.standings.find((s) => s.position === 3)).filter((s) => Boolean(s));
  const sorted = [...thirdPlace].sort(compareThirdPlaceWildcard);
  return sorted.map((row, index) => ({
    ...row,
    globalRank: index + 1,
    qualified: index < 8
  }));
}
function getQualifiedThirdPlaceGroups(thirdPlace) {
  return thirdPlace.filter((t) => t.qualified).map((t) => t.team.group);
}
function resolveAnnexCScenarioKey(qualifiedGroups) {
  if (qualifiedGroups.length !== 8) return null;
  const key = getThirdPlaceCombinationKey(qualifiedGroups);
  return THIRD_PLACE_SLOT_MAP[key] ? key : null;
}
function getAnnexCAllocationMapping(scenarioKey) {
  if (!scenarioKey) return null;
  return THIRD_PLACE_SLOT_MAP[scenarioKey] ?? null;
}
function buildTournamentSnapshot(teams, groupMatches, knockoutMatches, championId = null, manualTieBreakOrders) {
  const groups = calculateAllGroupStandings(teams, groupMatches, manualTieBreakOrders);
  const thirdPlaceStandings = buildThirdPlaceWildcardTable(groups);
  const qualifiedThirdGroups = getQualifiedThirdPlaceGroups(thirdPlaceStandings);
  const annexCKey = resolveAnnexCScenarioKey(qualifiedThirdGroups);
  return {
    groups,
    groupMatches,
    knockoutMatches,
    thirdPlaceStandings,
    qualifiedThirdGroups,
    annexCKey,
    championId,
    groupStageComplete: isGroupStageComplete(groupMatches)
  };
}

// src/logic/thirdPlaceRouting.ts
function resolveAnnexCKey(qualifiedGroups) {
  return resolveAnnexCScenarioKey(qualifiedGroups);
}
function getThirdPlaceMapping(key) {
  return getAnnexCAllocationMapping(key);
}
function getThirdPlacedTeamFromGroup(qualifiedThirds, source) {
  const group = source.replace("3", "");
  const entry = qualifiedThirds.find((t) => t.qualified && t.team.group === group);
  return entry?.team.id ?? null;
}
function resolveThirdPlaceTeamForSlot(slot, qualifiedThirds, mapping) {
  const source = mapping[slot];
  if (!source) return null;
  return getThirdPlacedTeamFromGroup(qualifiedThirds, source);
}
function getTeamIdByGroupPosition(groups, label) {
  const match = label.match(/^([12])([A-L])$/);
  if (!match) return null;
  const position = Number(match[1]);
  const groupId = match[2];
  const group = groups.find((g) => g.id === groupId);
  const standing = group?.standings.find((s) => s.position === position);
  return standing?.team.id ?? null;
}
function resolveThirdPlaceLabel(label, qualifiedThirds, mapping, slotByLabel) {
  if (!mapping) return null;
  const slot = slotByLabel[label];
  if (!slot) return null;
  return resolveThirdPlaceTeamForSlot(slot, qualifiedThirds, mapping);
}

// src/logic/knockoutBracket.ts
function getMatchWinner(match) {
  return getEffectiveWinner(match);
}
function getMatchLoser(match) {
  return getEffectiveLoser(match);
}
function resolveSlotTeamId(label, groups, qualifiedThirds, annexKey, matchByNumber) {
  if (label.startsWith("3rd-")) {
    const mapping = getThirdPlaceMapping(annexKey);
    return resolveThirdPlaceLabel(label, qualifiedThirds, mapping, THIRD_PLACE_SLOT_BY_LABEL);
  }
  const winnerMatch = label.match(/^W(\d+)$/);
  if (winnerMatch) {
    const source = matchByNumber.get(Number(winnerMatch[1]));
    return source ? getMatchWinner(source) : null;
  }
  const loserMatch = label.match(/^L(\d+)$/);
  if (loserMatch) {
    const source = matchByNumber.get(Number(loserMatch[1]));
    return source ? getMatchLoser(source) : null;
  }
  return getTeamIdByGroupPosition(groups, label);
}
function clearPredictionFields(match) {
  return {
    ...match,
    userHomeScore: null,
    userAwayScore: null,
    extraTime: false,
    penalties: { homeScored: null, awayScored: null, winnerTeamId: null },
    advancedTeamId: null
  };
}
function applyParticipants(match, homeTeamId, awayTeamId) {
  const changed = homeTeamId !== match.homeTeamId || awayTeamId !== match.awayTeamId;
  if (!changed) return { ...match, homeTeamId, awayTeamId };
  return clearPredictionFields({ ...match, homeTeamId, awayTeamId });
}
function seedKnockoutParticipants(matches, groups, qualifiedThirds, annexKey) {
  const knockoutDefs = INITIAL_MATCH_DEFINITIONS.filter((d) => d.stage !== "Group");
  const matchByNumber = new Map(matches.map((m) => [m.matchId, m]));
  return matches.map((match) => {
    if (match.phase !== "knockout") return match;
    const def = knockoutDefs.find((d) => d.matchId === match.matchId);
    if (!def) return match;
    const homeTeamId = resolveSlotTeamId(
      def.homeTeam,
      groups,
      qualifiedThirds,
      annexKey,
      matchByNumber
    );
    const awayTeamId = resolveSlotTeamId(
      def.awayTeam,
      groups,
      qualifiedThirds,
      annexKey,
      matchByNumber
    );
    return applyParticipants(match, homeTeamId, awayTeamId);
  });
}
function propagateKnockoutParticipants(matches, groups, qualifiedThirds, annexKey) {
  return seedKnockoutParticipants(matches, groups, qualifiedThirds, annexKey);
}
function advanceToTarget(matches, teamId, targetMatchId, targetSlot) {
  return matches.map((match) => {
    if (match.matchId !== targetMatchId) return match;
    if (targetSlot === "home") {
      if (match.homeTeamId === teamId) return match;
      return clearPredictionFields({ ...match, homeTeamId: teamId });
    }
    if (match.awayTeamId === teamId) return match;
    return clearPredictionFields({ ...match, awayTeamId: teamId });
  });
}
function cascadeKnockoutAdvancement(matches) {
  let updated = [...matches];
  const order = [...updated].filter((m) => m.phase === "knockout").sort((a, b) => a.matchId - b.matchId);
  for (const template of order) {
    const source = updated.find((m) => m.matchId === template.matchId);
    if (!source) continue;
    const winner = getMatchWinner(source);
    if (winner && source.targetMatchId && source.targetSlot) {
      updated = advanceToTarget(
        updated,
        winner,
        source.targetMatchId,
        source.targetSlot
      );
    }
    const loser = getMatchLoser(source);
    if (loser && source.loserTargetMatchId && source.loserTargetSlot) {
      updated = advanceToTarget(
        updated,
        loser,
        source.loserTargetMatchId,
        source.loserTargetSlot
      );
    }
    if (winner) {
      updated = updated.map(
        (m) => m.matchId === source.matchId ? { ...m, advancedTeamId: winner } : m
      );
    }
  }
  return updated;
}
function rebuildKnockoutBracket(groups, qualifiedThirds, existingKnockout) {
  const annexKey = resolveAnnexCKey(
    qualifiedThirds.filter((t) => t.qualified).map((t) => t.team.group)
  );
  const base = existingKnockout?.length === 32 ? existingKnockout.map((m) => {
    const def = INITIAL_MATCH_DEFINITIONS.find((d) => d.matchId === m.matchId);
    return clearPredictionFields({
      ...definitionToMatch(def),
      status: m.status,
      officialHomeScore: m.officialHomeScore,
      officialAwayScore: m.officialAwayScore
    });
  }) : createKnockoutMatches();
  return propagateKnockoutParticipants(base, groups, qualifiedThirds, annexKey);
}

// src/logic/tournamentState.ts
function buildSnapshot(teams, groupMatches, knockoutMatches, manualTieBreakOrders) {
  const finalMatch = knockoutMatches.find((m) => m.stage === "Final");
  const championId = finalMatch ? getMatchWinner(finalMatch) : null;
  return buildTournamentSnapshot(
    teams,
    groupMatches,
    knockoutMatches,
    championId,
    manualTieBreakOrders
  );
}
function recomputeFromMatches(state, groupMatches, knockoutMatches, manualTieBreakOrders = state.manualTieBreakOrders, previousSnapshot) {
  const prevSnapshot = previousSnapshot ?? state.snapshot;
  let nextKnockout = knockoutMatches;
  let effectiveManualOrders = { ...manualTieBreakOrders };
  const interimGroups = calculateAllGroupStandings(
    state.teams,
    groupMatches,
    effectiveManualOrders
  );
  for (const group of interimGroups) {
    const saved = effectiveManualOrders[group.id];
    if (!saved) continue;
    if (!group.requiresManualTieBreak) {
      delete effectiveManualOrders[group.id];
      continue;
    }
    const deadlockSet = new Set(group.deadlockTeamIds);
    const orderStillValid = saved.length === group.deadlockTeamIds.length && saved.every((id) => deadlockSet.has(id));
    if (!orderStillValid) {
      delete effectiveManualOrders[group.id];
    }
  }
  const groupsAfterCleanup = calculateAllGroupStandings(
    state.teams,
    groupMatches,
    effectiveManualOrders
  );
  const interimThird = buildThirdPlaceWildcardTable(groupsAfterCleanup);
  const interimSnapshot = buildSnapshot(
    state.teams,
    groupMatches,
    knockoutMatches,
    effectiveManualOrders
  );
  if (advancementChanged(prevSnapshot, interimSnapshot)) {
    nextKnockout = clearDownstreamKnockoutPredictions(knockoutMatches);
  }
  const groups = groupsAfterCleanup;
  const thirdPlaceStandings = interimThird;
  const groupStageComplete = isGroupStageComplete(groupMatches);
  const canSeedKnockout = groupStageComplete && !hasUnresolvedManualTieBreaks(groups);
  if (canSeedKnockout) {
    const rebuilt = rebuildKnockoutBracket(groups, thirdPlaceStandings, nextKnockout);
    const prevFingerprint = fingerprintParticipants(knockoutMatches);
    const nextFingerprint = fingerprintParticipants(rebuilt);
    nextKnockout = prevFingerprint !== nextFingerprint ? rebuilt : cascadeKnockoutAdvancement(rebuilt);
  } else if (!groupMatches.some((m) => m.status === "completed")) {
    nextKnockout = createKnockoutMatches();
  } else {
    nextKnockout = cascadeKnockoutAdvancement(nextKnockout);
  }
  return {
    ...state,
    groupMatches,
    knockoutMatches: nextKnockout,
    manualTieBreakOrders: effectiveManualOrders,
    snapshot: buildSnapshot(state.teams, groupMatches, nextKnockout, effectiveManualOrders)
  };
}
function createInitialTournamentState() {
  const teams = createTeams();
  const groupMatches = createGroupMatches();
  const knockoutMatches = createKnockoutMatches();
  return {
    teams,
    groupMatches,
    knockoutMatches,
    manualTieBreakOrders: {},
    snapshot: buildSnapshot(teams, groupMatches, knockoutMatches, {})
  };
}
function fingerprintParticipants(matches) {
  return matches.map((m) => `${m.matchId}:${m.homeTeamId ?? "-"}:${m.awayTeamId ?? "-"}`).join("|");
}
function recomputeTournamentState(state) {
  return recomputeFromMatches(
    state,
    state.groupMatches,
    state.knockoutMatches,
    state.manualTieBreakOrders
  );
}

// src/logic/tournamentPersistence.ts
function applyScoresToMatches(matches, saved) {
  return matches.map((match) => {
    const persisted = saved[match.id];
    if (!persisted) return match;
    return {
      ...match,
      userHomeScore: persisted.userHomeScore,
      userAwayScore: persisted.userAwayScore,
      penalties: { ...persisted.penalties }
    };
  });
}
function hydrateTournamentState(session) {
  const base = createInitialTournamentState();
  const groupMatches = applyScoresToMatches(base.groupMatches, session.groupMatches);
  const knockoutMatches = applyScoresToMatches(
    base.knockoutMatches,
    session.knockoutMatches
  );
  return recomputeTournamentState({
    ...base,
    groupMatches,
    knockoutMatches,
    manualTieBreakOrders: session.manualTieBreakOrders ?? {}
  });
}

// src/lib/bracketSeo.ts
function buildBracketSeoUrls(baseUrl, slug) {
  const normalizedBase = baseUrl.replace(/\/$/, "");
  const pageUrl = `${normalizedBase}/bracket/${encodeURIComponent(slug)}`;
  return { pageUrl };
}
function buildBracketSeoCopy(userName, championFullName) {
  return {
    title: `${userName}'s Official 2026 World Cup Bracket`,
    description: `See who I predicted to win it all! My 2026 World Cup Champion is ${championFullName}. Predict your own winner now!`
  };
}
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function buildBracketMetaHtml(payload, baseUrl) {
  const { pageUrl } = buildBracketSeoUrls(baseUrl, payload.slug);
  const title = escapeHtml(payload.title);
  const description = escapeHtml(payload.description);
  const safePageUrl = escapeHtml(pageUrl);
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${safePageUrl}" />
    <meta property="og:site_name" content="2026 WC Predictions" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <link rel="canonical" href="${safePageUrl}" />
    <meta http-equiv="refresh" content="0;url=${safePageUrl}" />
  </head>
  <body>
    <p><a href="${safePageUrl}">${title}</a></p>
  </body>
</html>`;
}
function buildFallbackBracketMetaHtml(slug, baseUrl) {
  const championName = "TBD";
  const payload = {
    slug,
    userName: "A fan",
    championName,
    championFullName: championName,
    championId: null,
    title: "World Cup 2026 Bracket \u2014 2026 WC Predictions",
    description: "View a shared FIFA World Cup 2026 prediction bracket and predict your own tournament winner."
  };
  return buildBracketMetaHtml(payload, baseUrl);
}

// server/bracketSeoEntry.ts
var STORAGE_VERSION = 1;
function readEnv(name) {
  return process.env[name];
}
function getSupabaseServerConfig() {
  const url = readEnv("VITE_SUPABASE_URL") ?? readEnv("NEXT_PUBLIC_SUPABASE_URL") ?? readEnv("SUPABASE_URL");
  const anonKey = readEnv("VITE_SUPABASE_ANON_KEY") ?? readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ?? readEnv("SUPABASE_ANON_KEY");
  if (!url || !anonKey) return null;
  return { url: url.replace(/\/$/, ""), anonKey };
}
function parseMatchData(raw) {
  if (!raw || typeof raw !== "object") return null;
  const session = raw;
  if (session.version !== STORAGE_VERSION) return null;
  return session;
}
function resolveChampionFromMatchData(matchData) {
  const session = parseMatchData(matchData);
  if (!session) {
    return { championId: null, championName: "TBD", championFullName: "TBD" };
  }
  const state = hydrateTournamentState(session);
  const championId = state.snapshot.championId;
  const champion = teamById(createTeams(), championId);
  return {
    championId,
    championName: champion?.name ?? "TBD",
    championFullName: champion?.fullName ?? champion?.name ?? "TBD"
  };
}
async function fetchPredictionRow(slug, supabaseUrl, supabaseAnonKey) {
  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  };
  const predictionRes = await fetch(
    `${supabaseUrl}/rest/v1/predictions?slug=eq.${encodeURIComponent(slug)}&select=match_data,user_id&limit=1`,
    { headers }
  );
  if (!predictionRes.ok) return null;
  const rows = await predictionRes.json();
  return rows[0] ?? null;
}
async function fetchProfileDisplayName(userId, supabaseUrl, supabaseAnonKey) {
  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`
  };
  const profileRes = await fetch(
    `${supabaseUrl}/rest/v1/profiles?id=eq.${encodeURIComponent(userId)}&select=display_name,username&limit=1`,
    { headers }
  );
  if (!profileRes.ok) return "A fan";
  const profiles = await profileRes.json();
  const profile = profiles[0];
  return profile?.display_name?.trim() || profile?.username?.trim() || "A fan";
}
async function resolveBracketSeoFromSlug(slug) {
  const config = getSupabaseServerConfig();
  if (!config || !slug.trim()) return null;
  const row = await fetchPredictionRow(slug.trim(), config.url, config.anonKey);
  if (!row) return null;
  const userName = await fetchProfileDisplayName(row.user_id, config.url, config.anonKey);
  const champion = resolveChampionFromMatchData(row.match_data);
  const copy = buildBracketSeoCopy(userName, champion.championFullName);
  return {
    slug: slug.trim(),
    userName,
    championName: champion.championName,
    championFullName: champion.championFullName,
    championId: champion.championId,
    ...copy
  };
}
export {
  buildBracketMetaHtml,
  buildFallbackBracketMetaHtml,
  getSupabaseServerConfig,
  resolveBracketSeoFromSlug
};
