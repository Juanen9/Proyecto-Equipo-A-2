import React, { useEffect, useState } from "react";
import { validateUserService } from "../../../services";
import { useParams } from "react-router-dom";
import lottie from "lottie-web"; // Importa lottie-web
import animation from "../../../assets/animation_lmvpprcb.json";
import animationError from "../../../assets/animation_lmvv7m32.json";
import "./UserValidation.css"; // Importa tus estilos CSS si es necesario

function UserValidation() {
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const { regCode } = useParams();
  const [validate, setValidate] = useState();
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationInitialized, setAnimationInitialized] = useState(false);
  const [showErrorAnimation, setShowErrorAnimation] = useState(false); // Nuevo estado para la animación de error
  const [animationInitializedError, setAnimationInitializedError] = useState(false); // Nuevo estado para la inicialización de la animación de error
  let counter = 0;

  const fetchData = async () => {
    try {
      if (counter !== 0) {
        setLoading(true);
        const data = await validateUserService({ regCode });
        setValidate(data);
        setShowAnimation(true);
      }
    } catch (error) {
      setError(error.message);
      setShowErrorAnimation(true); // Mostrar animación de error en caso de error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    counter++;

    if (showAnimation && !animationInitialized) {
      const animationContainer = document.getElementById("lottie-animation");
      lottie.loadAnimation({
        container: animationContainer,
        animationData: animation,
        loop: false,
        autoplay: true,
      });
      setAnimationInitialized(true);
    }

    // Inicialización de la animación de error
    if (showErrorAnimation && !animationInitializedError && !animationInitialized) {
      const animationContainerError = document.getElementById("lottie-animation-error");

      if (animationContainerError) {
        const animationContainer = document.getElementById("lottie-animation");
        if (animationContainer) {
          lottie.stop(animationContainer);
        }

        lottie.loadAnimation({
          container: animationContainerError,
          animationData: animationError,
          loop: false,
          autoplay: true,
        });

        setAnimationInitializedError(true);
      }
    }
  }, [showAnimation, animationInitialized, showErrorAnimation, animationInitializedError]);

  return (
    <section className="user-section-validate">
      {validate ? <p className="user-validate-message">{validate.message}</p> : null}
      {error ? <p className="user-error-message">{error}</p> : null}
      {showAnimation && validate ? (
        <div className="animation-container">
          <div id="lottie-animation"></div>
        </div>
      ) : null}
      {showErrorAnimation ? (
        <div className="animation-container-error">
          <div id="lottie-animation-error"></div>
        </div>
      ) : null}
    </section>
  );
}

export default UserValidation;
