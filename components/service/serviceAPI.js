const DOMAIN = "http://localhost:";
const PORT = 5001;

export const HARD_SKILLS = "/team_hard_skills";
export const SOFT_SKILLS = "/team_soft_skills";
export const BALANCED = "/balanced";

export const getTeam = async (data, path) => {
    try {

        const raw = await fetch(`${DOMAIN}${PORT}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data
            }),
        });
        const response = await raw.json();
        
        let team = [];
  
        response.team.forEach(element => {
            const correctedString = element.replace(/'/g, '"');
            team.push(JSON.parse(correctedString))
        });

        return team;
    } catch (error) {
        console.log(error);
    }
};