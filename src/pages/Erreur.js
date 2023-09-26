import imgErreur from "../assets/404.png"

export default function Erreur(){
    return(
<div className="erreur">
    <img className="erreur-img" src={imgErreur} alt="erreur 404"/>
</div>
    );
}