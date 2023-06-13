const DOMAIN = "http://localhost:";
const PORT = 5001;

const HARD_SKILLS = "/team_hard_skills";
const SOFT_SKILLS = "/team_soft_skills";
const BALANCED = "/balanced";

const getTeam = async (path) => {
    try {

        const raw = await fetch(`${DOMAIN}${PORT}/${HARD_SKILLS}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data:{
                    project:['Nombre','Desc', 'link',1,2,3,4,5,6,7,8,9,1,2,3],
                    softSkills:[1,2,3,4,5,6,7,8,9,1]
                }
            }),
        });
        const response = await raw.json();
        
        let team = [];
  
        response.team.forEach(element => {
            const correctedString = element.replace(/'/g, '"');
            team.push(JSON.parse(correctedString))
        });

        console.log(team)
    } catch (error) {
        console.log(error);
    }
};