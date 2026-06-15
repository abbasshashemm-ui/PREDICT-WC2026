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

// src/lib/liveSync/fixtureIdMap.ts
var FIXTURE_ID_REGISTRY = INITIAL_MATCH_DEFINITIONS.map(
  (def) => ({
    matchId: def.matchId,
    lockTime: def.kickoffTime,
    apiFootballFixtureId: null,
    espnEventId: null
  })
);
var byMatchId = new Map(FIXTURE_ID_REGISTRY.map((row) => [row.matchId, row]));
var byApiFootballId = new Map(
  FIXTURE_ID_REGISTRY.filter((row) => row.apiFootballFixtureId != null).map((row) => [
    row.apiFootballFixtureId,
    row
  ])
);
var byEspnId = new Map(
  FIXTURE_ID_REGISTRY.filter((row) => row.espnEventId != null).map((row) => [
    row.espnEventId,
    row
  ])
);
function resolveMatchIdFromApiFootballFixture(fixtureId) {
  return byApiFootballId.get(fixtureId)?.matchId ?? null;
}
function resolveMatchIdFromEspnEvent(eventId) {
  return byEspnId.get(eventId)?.matchId ?? null;
}
function getLockTimeForMatch(matchId) {
  return byMatchId.get(matchId)?.lockTime ?? null;
}

// src/lib/liveSync/statusMapping.ts
var API_FOOTBALL_LIVE = /* @__PURE__ */ new Set([
  "LIVE",
  "1H",
  "2H",
  "HT",
  "ET",
  "BT",
  "P",
  "INT",
  "SUSP"
]);
var API_FOOTBALL_FINISHED = /* @__PURE__ */ new Set(["FT", "AET", "PEN", "AWD", "WO"]);
function mapApiFootballStatus(short) {
  const code = short.toUpperCase();
  if (API_FOOTBALL_FINISHED.has(code)) return "FT";
  if (API_FOOTBALL_LIVE.has(code)) return "LIVE";
  return "NS";
}
function mapEspnStatus(event) {
  const state = event.status?.type?.state?.toLowerCase();
  const completed = event.status?.type?.completed;
  const name = event.status?.type?.name?.toLowerCase() ?? "";
  if (completed || state === "post" || name.includes("final")) return "FT";
  if (state === "in" || name.includes("half") || name.includes("progress")) return "LIVE";
  return "NS";
}
function toLegacyMatchStatus(realStatus) {
  switch (realStatus) {
    case "FT":
      return "completed";
    case "LIVE":
      return "live";
    default:
      return "pending";
  }
}

// src/lib/liveSync/liveDataClient.ts
var DEFAULT_API_FOOTBALL_BASE = "https://v3.football.api-sports.io";
var DEFAULT_ESPN_SCOREBOARD = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
var FIFA_WORLD_CUP_LEAGUE_ID = 1;
var WC_2026_SEASON = 2026;
var LiveDataClientError = class extends Error {
  provider;
  status;
  constructor(message, provider, status) {
    super(message);
    this.name = "LiveDataClientError";
    this.provider = provider;
    this.status = status;
  }
};
var LiveDataClient = class {
  config;
  constructor(config = {}) {
    this.config = {
      apiFootballBaseUrl: config.apiFootballBaseUrl ?? DEFAULT_API_FOOTBALL_BASE,
      apiFootballKey: config.apiFootballKey ?? null,
      apiFootballLeagueId: config.apiFootballLeagueId ?? FIFA_WORLD_CUP_LEAGUE_ID,
      apiFootballSeason: config.apiFootballSeason ?? WC_2026_SEASON,
      espnScoreboardUrl: config.espnScoreboardUrl ?? DEFAULT_ESPN_SCOREBOARD,
      timeoutMs: config.timeoutMs ?? 12e3
    };
  }
  async fetchJson(url, init) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.config.timeoutMs);
    try {
      const response = await fetch(url, { ...init, signal: controller.signal });
      if (!response.ok) {
        throw new LiveDataClientError(
          `HTTP ${response.status} for ${url}`,
          url.includes("espn") ? "espn" : "api-football",
          response.status
        );
      }
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }
  async fetchApiFootballFixtures() {
    if (!this.config.apiFootballKey) return [];
    const params = new URLSearchParams({
      league: String(this.config.apiFootballLeagueId),
      season: String(this.config.apiFootballSeason)
    });
    const payload = await this.fetchJson(
      `${this.config.apiFootballBaseUrl}/fixtures?${params}`,
      {
        headers: {
          "x-apisports-key": this.config.apiFootballKey,
          Accept: "application/json"
        }
      }
    );
    if (payload.errors && Object.keys(payload.errors).length > 0) {
      const message = Object.values(payload.errors).join("; ");
      throw new LiveDataClientError(message, "api-football");
    }
    return payload.response ?? [];
  }
  async fetchApiFootballLiveFixtures() {
    if (!this.config.apiFootballKey) return [];
    const payload = await this.fetchJson(
      `${this.config.apiFootballBaseUrl}/fixtures?live=all`,
      {
        headers: {
          "x-apisports-key": this.config.apiFootballKey,
          Accept: "application/json"
        }
      }
    );
    const leagueId = this.config.apiFootballLeagueId ?? FIFA_WORLD_CUP_LEAGUE_ID;
    return (payload.response ?? []).filter((row) => row.league.id === leagueId);
  }
  async fetchEspnScoreboard() {
    const payload = await this.fetchJson(this.config.espnScoreboardUrl);
    return payload.events ?? [];
  }
  /** Primary: live API-Football fixtures, supplemented by full schedule + ESPN fallback. */
  async fetchMergedRealMatches() {
    const [liveFixtures, allFixtures, espnEvents] = await Promise.all([
      this.fetchApiFootballLiveFixtures().catch(() => []),
      this.fetchApiFootballFixtures().catch(() => []),
      this.fetchEspnScoreboard().catch(() => [])
    ]);
    const merged = /* @__PURE__ */ new Map();
    for (const fixture of allFixtures) {
      const mapped = mapApiFootballFixture(fixture);
      if (mapped) merged.set(mapped.matchId, mapped);
    }
    for (const fixture of liveFixtures) {
      const mapped = mapApiFootballFixture(fixture);
      if (mapped) merged.set(mapped.matchId, mapped);
    }
    for (const event of espnEvents) {
      const mapped = mapEspnEvent(event);
      if (!mapped) continue;
      const existing = merged.get(mapped.matchId);
      merged.set(mapped.matchId, existing ? mergeRealMatchState(existing, mapped) : mapped);
    }
    return [...merged.values()].sort((a, b) => a.matchId - b.matchId);
  }
};
function mapApiFootballFixture(fixture) {
  const matchId = resolveMatchIdFromApiFootballFixture(fixture.fixture.id);
  if (!matchId) return null;
  const realStatus = mapApiFootballStatus(fixture.fixture.status.short);
  const statusShort = fixture.fixture.status.short.toUpperCase();
  const realExtraTime = statusShort === "ET" || statusShort === "AET" || statusShort === "PEN";
  return {
    matchId,
    id: `m-${matchId}`,
    realStatus,
    realHomeScore: fixture.goals.home,
    realAwayScore: fixture.goals.away,
    realExtraTime,
    realPenaltyWinner: null,
    lockTime: getLockTimeForMatch(matchId) ?? fixture.fixture.date,
    apiFootballFixtureId: fixture.fixture.id,
    espnEventId: null,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function mapEspnEvent(event) {
  const matchId = resolveMatchIdFromEspnEvent(event.id);
  if (!matchId) return null;
  const competition = event.competitions?.[0];
  const competitors = competition?.competitors ?? [];
  const home = competitors.find((c) => c.homeAway === "home");
  const away = competitors.find((c) => c.homeAway === "away");
  const realStatus = mapEspnStatus(competition ?? event);
  const homeScore = parseScore(home?.score);
  const awayScore = parseScore(away?.score);
  return {
    matchId,
    id: `m-${matchId}`,
    realStatus,
    realHomeScore: homeScore,
    realAwayScore: awayScore,
    realExtraTime: false,
    realPenaltyWinner: null,
    lockTime: getLockTimeForMatch(matchId) ?? competition?.date ?? event.date ?? "",
    apiFootballFixtureId: null,
    espnEventId: event.id,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function parseScore(value) {
  if (value == null || value === "") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}
function mergeRealMatchState(primary, fallback) {
  return {
    ...primary,
    realStatus: priorityStatus(primary.realStatus, fallback.realStatus),
    realHomeScore: primary.realHomeScore ?? fallback.realHomeScore,
    realAwayScore: primary.realAwayScore ?? fallback.realAwayScore,
    realExtraTime: primary.realExtraTime || fallback.realExtraTime,
    realPenaltyWinner: primary.realPenaltyWinner ?? fallback.realPenaltyWinner,
    espnEventId: primary.espnEventId ?? fallback.espnEventId,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function priorityStatus(a, b) {
  const rank = { NS: 0, LIVE: 1, FT: 2 };
  return rank[a] >= rank[b] ? a : b;
}

// src/lib/liveSync/realTournamentState.ts
function realMatchToOfficialData(match) {
  const legacyStatus = toLegacyMatchStatus(match.realStatus);
  const finished = match.realStatus === "FT";
  return {
    id: match.id,
    matchId: match.matchId,
    kickoffTime: match.lockTime,
    lockTime: match.lockTime,
    status: legacyStatus,
    realStatus: match.realStatus,
    realHomeScore: match.realHomeScore,
    realAwayScore: match.realAwayScore,
    realExtraTime: match.realExtraTime,
    realPenaltyWinner: match.realPenaltyWinner,
    officialHomeScore: finished ? match.realHomeScore : match.realHomeScore,
    officialAwayScore: finished ? match.realAwayScore : match.realAwayScore,
    officialPenaltyWinnerId: match.realPenaltyWinner,
    apiFootballFixtureId: match.apiFootballFixtureId ?? null,
    espnEventId: match.espnEventId ?? null
  };
}
function buildRealTournamentState(matches, source) {
  const record = {};
  for (const match of matches) {
    record[match.matchId] = match;
  }
  return {
    version: 1,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    source,
    matches: record
  };
}
function realTournamentToOfficialFeed(state) {
  return Object.values(state.matches).sort((a, b) => a.matchId - b.matchId).map(realMatchToOfficialData);
}

// src/lib/liveSync/liveSyncService.ts
function toRow(match) {
  const finished = match.realStatus === "FT";
  return {
    match_id: match.matchId,
    id: match.id,
    real_status: match.realStatus,
    real_home_score: match.realHomeScore,
    real_away_score: match.realAwayScore,
    real_extra_time: match.realExtraTime,
    real_penalty_winner: match.realPenaltyWinner,
    lock_time: match.lockTime,
    official_home_score: finished ? match.realHomeScore : match.realHomeScore,
    official_away_score: finished ? match.realAwayScore : match.realAwayScore,
    official_penalty_winner_id: match.realPenaltyWinner,
    status: finished ? "completed" : match.realStatus === "LIVE" ? "live" : "pending",
    api_football_fixture_id: match.apiFootballFixtureId ?? null,
    espn_event_id: match.espnEventId ?? null,
    updated_at: match.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function persistRows(config, rows) {
  const { supabaseUrl, supabaseServiceRoleKey, resultsTable = "match_results" } = config;
  if (!supabaseUrl || !supabaseServiceRoleKey || rows.length === 0) return false;
  const response = await fetch(
    `${supabaseUrl.replace(/\/$/, "")}/rest/v1/${resultsTable}?on_conflict=match_id`,
    {
      method: "POST",
      headers: {
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal"
      },
      body: JSON.stringify(rows)
    }
  );
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase upsert failed (${response.status}): ${body}`);
  }
  return true;
}
async function runLiveSync(config = {}) {
  const errors = [];
  const client = new LiveDataClient(config);
  let matches = [];
  let source = "merged";
  try {
    matches = await client.fetchMergedRealMatches();
    source = matches.some((m) => m.apiFootballFixtureId) ? "api-football" : "espn";
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Live fetch failed");
  }
  const state = buildRealTournamentState(matches, source);
  const rows = matches.filter((match) => match.realStatus === "LIVE" || match.realStatus === "FT").map(toRow);
  let persisted = false;
  try {
    persisted = await persistRows(config, rows);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "Persist failed");
  }
  return {
    updatedAt: state.updatedAt,
    source,
    matchCount: matches.length,
    liveCount: matches.filter((m) => m.realStatus === "LIVE").length,
    finishedCount: matches.filter((m) => m.realStatus === "FT").length,
    persisted,
    errors,
    feed: realTournamentToOfficialFeed(state)
  };
}
function createLiveSyncServiceConfigFromEnv(env = {}) {
  return {
    apiFootballKey: env.API_FOOTBALL_KEY ?? env.API_SPORTS_KEY ?? null,
    apiFootballLeagueId: Number(env.API_FOOTBALL_LEAGUE_ID ?? 1),
    apiFootballSeason: Number(env.API_FOOTBALL_SEASON ?? 2026),
    espnScoreboardUrl: env.ESPN_SCOREBOARD_URL,
    supabaseUrl: env.SUPABASE_URL ?? env.VITE_SUPABASE_URL ?? null,
    supabaseServiceRoleKey: env.SUPABASE_SERVICE_ROLE_KEY ?? null,
    resultsTable: env.SUPABASE_RESULTS_TABLE ?? env.VITE_SUPABASE_RESULTS_TABLE ?? "match_results"
  };
}
export {
  createLiveSyncServiceConfigFromEnv,
  runLiveSync
};
