export const registerUserService = async ({name ,email, pwd, pwd2}) => {
    const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        body: JSON.stringify({ name ,email, pwd, pwd2}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();


    if (!response.ok) {
        throw new Error(json.message);
      }
}

export const registerAdminService = async ({name ,email, pwd, clue, role}) => {
    const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        body: JSON.stringify({ name ,email, pwd, clue, role}),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
}

export const logInUserService = async ({email, pwd}) => {
    const response = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        body: JSON.stringify({email, pwd}),
        headers: {
            "Content-Type": "application/json",
          },
    })

    const json = await response.json();

    if(!response.ok){
        throw new Error(error.message);
    }

    return json.data.token
    
};


