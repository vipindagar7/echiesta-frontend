const events = [

/* ---------------- Fashion ---------------- */

{
name: "Ramp Walk",
category: "Fashionscape (Fashion Show)",
type: "Team",
minMembers: 7,
maxMembers: 25,
fee: 100,
prize: "₹21000"
},

/* ---------------- Cooking ---------------- */

{
name: "Fireless Flavours",
category: "Raso Vaisa (Cooking Competition)",
type: "Team",
minMembers: 3,
maxMembers: 4,
fee: 100,
prize: "₹7000 / ₹5000"
},

{
name: "Cook and Serve",
category: "Raso Vaisa (Cooking Competition)",
type: "Team",
minMembers: 3,
maxMembers: 4,
fee: 100,
prize: "₹11000"
},

/* ---------------- Dance ---------------- */

{
name: "Dance Solo",
category: "Rhythm and Movement (Dance)",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Dance Group",
category: "Rhythm and Movement (Dance)",
type: "Team",
minMembers: 8,
maxMembers: 10,
fee: 100,
prize: "₹11000"
},

/* ---------------- Music ---------------- */

{
name: "Music Solo",
category: "Rhythm & Riffs (Music)",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Band Battles",
category: "Rhythm & Riffs (Music)",
type: "Team",
minMembers: 10,
maxMembers: 10,
fee: 100,
prize: "₹11000 / ₹7000"
},

{
name: "Rap",
category: "Rhythm & Riffs (Music)",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

/* ---------------- Drama ---------------- */

{
name: "Monologue",
category: "Curtain Call (Drama)",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Stage Play",
category: "Curtain Call (Drama)",
type: "Team",
minMembers: 8,
maxMembers: 10,
fee: 100,
prize: "₹7000 / ₹5000"
},

{
name: "Nukkad",
category: "Curtain Call (Drama)",
type: "Team",
minMembers: 10,
maxMembers: 15,
fee: 100,
prize: "₹11000 / ₹7000"
},

/* ---------------- Drawing ---------------- */

{
name: "Sketch / Painting",
category: "Creative Canvas (Drawing)",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Face Painting",
category: "Creative Canvas (Drawing)",
type: "Team",
minMembers: 2,
maxMembers: 2,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Rangoli",
category: "Creative Canvas (Drawing)",
type: "Team",
minMembers: 6,
maxMembers: 8,
fee: 100,
prize: "₹5000 / ₹3000"
},

/* ---------------- Literary ---------------- */

{
name: "Debate",
category: "Literary",
type: "Team",
minMembers: 2,
maxMembers: 2,
fee: 100,
prize: "₹5000 / ₹3000"
},

{
name: "Poetry Hindi",
category: "Literary",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "Poetry English",
category: "Literary",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "JAM (Just a Minute)",
category: "Literary",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 100,
prize: "₹2100 / ₹1100"
},

{
name: "AD MAD Show",
category: "Literary",
type: "Team",
minMembers: 3,
maxMembers: 3,
fee: 100,
prize: "₹5000 / ₹3000"
},

/* ---------------- Technical ---------------- */

{
name: "DSA Contest",
category: "Technical",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 0,
prize: "₹2100 / ₹1100"
},

{
name: "Tech Quiz",
category: "Technical",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 0,
prize: "₹2100 / ₹1100"
},

{
name: "CTF (Capture The Flag)",
category: "Technical",
type: "Team",
minMembers: 4,
maxMembers: 4,
fee: 0,
prize: "₹5000 / ₹3000"
},

{
name: "Circuit Design",
category: "Technical",
type: "Team",
minMembers: 1,
maxMembers: 2,
fee: 0,
prize: "₹2100 / ₹3000"
},

{
name: "Best Out of Waste",
category: "Technical",
type: "Team",
minMembers: 1,
maxMembers: 3,
fee: 0,
prize: "₹2100 / ₹3000"
},

{
name: "Debugging Challenge",
category: "Technical",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 0,
prize: "₹2100 / ₹1100"
},

{
name: "Tech-Biz Rapid Quiz",
category: "Technical",
type: "Individual",
minMembers: 1,
maxMembers: 1,
fee: 0,
prize: "₹2100 / ₹1100"
},

{
name: "Line Follower",
category: "Technical",
type: "Team",
minMembers: 4,
maxMembers: 4,
fee: 0,
prize: "₹5000 / ₹3000"
},

{
name: "Robo Hurdle",
category: "Technical",
type: "Team",
minMembers: 4,
maxMembers: 4,
fee: 0,
prize: "₹5000 / ₹3000"
},

{
name: "Robo Soccer / Robo Race",
category: "Technical",
type: "Team",
minMembers: 4,
maxMembers: 4,
fee: 0,
prize: "₹5000 / ₹3000"
},

{
name: "Tech Talk",
category: "Technical",
type: "Team",
minMembers: 2,
maxMembers: 2,
fee: 0,
prize: "₹2100 / ₹1100"
},

{
name: "Tech Walk",
category: "Technical",
type: "Team",
minMembers: 4,
maxMembers: 5,
fee: 0,
prize: "₹11000"
},

{
name: "Project Showcase",
category: "Technical",
type: "Team",
minMembers: 1,
maxMembers: 4,
fee: 0,
prize: "₹5000 / ₹3000"
},

/* ---------------- Indian Knowledge System ---------------- */

{
name: "Exhibition",
category: "Passage to India (IKS)",
type: "Team",
minMembers: 3,
maxMembers: 4,
fee: 100,
prize: "₹5000 / ₹3000"
},

{
name: "Poster Presentation",
category: "Passage to India (IKS)",
type: "Team",
minMembers: 2,
maxMembers: 2,
fee: 100,
prize: "₹2100 / ₹1100"
}

];

export default events;