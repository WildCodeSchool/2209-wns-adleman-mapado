import { useState } from "react";
import {
  useCitiesQuery,
  useFetchCityNameMutation,
} from "../gql/generated/schema";
import { ApolloError } from "@apollo/client";
import Toast from "./Toast";
import checkIcon from "../assets/svg/check.svg";
import errorIcon from "../assets/svg/error.svg";

interface ToastInterface {
  id: number;
  title: string;
  description: string;
  icon: string;
  backgroundColor: string;
}

export default function AddCity( ) {
  // Initialisation de l'objet cityRequested
  const [cityRequested, setCityRequested] = useState({
    cityName: "",
  });

  // Initialisation de l'objet Toast
  const [toastData, setToastData] = useState<ToastInterface>({
    id: 0,
    title: "",
    description: "",
    icon: "",
    backgroundColor: "",
  });
  const [showToast, setShowToast] = useState(false);

  const { refetch } = useCitiesQuery();

  const [sendCityName] = useFetchCityNameMutation();

  const onClickSendCityName = () => {
    console.log(cityRequested);

    sendCityName({
      variables: { data: cityRequested },
    })
      .then((res) => {
        console.log("log du then", res);

        setToastData({
          id: Math.floor(Math.random() * 100 + 1),
          description: res?.data?.fetchCityName!,
          title: "Super ! 👍",
          backgroundColor: "green",
          icon: checkIcon,
        });
        console.log("log de toastData au click avant le set", toastData);
      })
      .catch((erreur: ApolloError) => {
        console.log(erreur);

        setToastData({
          id: Math.floor(Math.random() * 100 + 1),
          description: erreur.message,
          title: "Oups... 🧐",
          backgroundColor: "#bd2424",
          icon: errorIcon,
        });
      })
      .finally(() => {
        setShowToast(true);
        refetch();
      });
  };

  return (
    <>
      <div className={"addCityContainer"}>
        <input
          type="text"
          placeholder="Nom de la ville"
          value={cityRequested.cityName}
          onChange={(e) => setCityRequested({ cityName: e.target.value })}
        ></input>
        <button onClick={onClickSendCityName} className={"tertiaryButton"}>
          Ajouter
        </button>
        <Toast
          toast={toastData}
          position={"bottomRight"}
          autoDelete={false}
          autoDeleteTime={5000}
          visible={showToast}
          setVisible={setShowToast}
        />
      </div>
    </>
  );
}
