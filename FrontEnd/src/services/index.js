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
    const response = await fetch("http://localhost:3001/user/admin", {
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
        throw new Error(json.message);
    }

    return json.data.token;
    
};

export const postExerciseService = async ({data, token}) => {
    const response = await fetch("http://localhost:3001/exercise/add-exercise", {
        method: "POST",
        body: data,
        headers: {
            auth: token,
        },
        mode: "cors"
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

export const postTrainingService = async ({name, description, exercises, token}) => {
    const response = await fetch("http://localhost:3001/exercise/add-training", {
        method: "POST",
        body: JSON.stringify({ name, description, exercises }),
        headers: {
            auth: token,
            'Content-Type': 'application/json',
          },
        mode: "cors"
    });

    const json = await response.json();

    if(!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
}

export const getAllExercisesService = async ({token}) => {
    const response = await fetch("http://localhost:3001/exercise/list", {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const getTraining = async ({token}) => {
    const response = await fetch("http://localhost:3001/training/list", {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const getAllExercisesExtendedService = async ({token, idParam}) => {
    const response = await fetch(`http://localhost:3001/exercise/list-extended/${idParam}`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const recoverPasswordService = async ({email, token}) => {
    const response = await fetch("http://localhost:3001/user/recover-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
            auth: token,
            'Content-Type': 'application/json',
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const resetPasswordService = async ({recoverCode, newPassword, newPassword1}) => {
    const response = await fetch("http://localhost:3001/user/reset-password", {
        method: "POST",
        body: JSON.stringify({ recoverCode, newPassword, newPassword1 }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
};

export const modifyUserService = async ({data, token, userId}) => {
    const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PUT",
        body: data,
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const modifyExerciseService = async ({data, token, idParam}) => {
    const response = await fetch(`http://localhost:3001/exercise/modify/${idParam}`, {
        method: "PUT",
        body: data,
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const modifyTrainingService = async ({data, token, idParam}) => {
    const response = await fetch(`http://localhost:3001/training/modify/${idParam}`, {
        method: "PUT",
        body: data,
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const addLikeService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/exercise/add-like/${id}`, {
        method: "POST",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const deleteLikeService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/exercise/delete-like/${id}`, {
        method: "DELETE",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const deleteExerciseService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/exercise/delete/${id}`, {
        method: "DELETE",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const deleteTrainingService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/training/delete/${id}`, {
        method: "DELETE",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const addFavService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/exercise/add-fav/${id}`, {
        method: "POST",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const deleteFavService = async ({token, id}) => {
    const response = await fetch(`http://localhost:3001/exercise/delete-favs/${id}`, {
        method: "DELETE",
        headers: {
            auth: token,
        },
    });

    const json = await response.json();

    if(!response.ok){
        throw new Error(json.message)
    }

    return json.data;
}

export const getFavsService = async ({token}) => {
    const response = await fetch(`http://localhost:3001/exercise/favs`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const getLikesService = async ({token}) => {
    const response = await fetch(`http://localhost:3001/exercise/likes`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const getUserDataService = async ({token}) => {
    const response = await fetch(`http://localhost:3001/get-user`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}


export const validateUserService = async ({regCode}) => {
    const response = await fetch(`http://localhost:3001/user/validate/${regCode}`, {
    });
    
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
      return json;
}

export const validateEmailService = async ({emailCode}) => {
    const response = await fetch(`http://localhost:3001/user/email-validate/${emailCode}`, {
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json;
}

export const getOrderLikesService = async ({token}) => {
    const response = await fetch(`http://localhost:3001/exercise/order-likes`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
      }
    
      return json.data;
}

export const checkTokenValidity = async ({token}) => {
    const response = await fetch(`http://localhost:3001/user/check-token`, {
        headers: {
            auth: token
        }
    });

    const json = await response.json();
    
      return json.data;
}