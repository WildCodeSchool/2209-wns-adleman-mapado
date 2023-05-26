import { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { KeyboardEvent } from "react";
//import ReactModal from 'react-modal';
import AddPoi from "./AddPoi";

interface iModal {
  handleOpenModal: () => void;
  cityId: number;
  cityName: string;
}

export default function PoiModal({
  cityId,
  cityName,
  handleOpenModal,
}: iModal) {
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setDomReady(true);
  }, [domReady]);

  return domReady
    ? ReactDom.createPortal(
        <div className="modal_container">
          <button onClick={handleOpenModal}>X</button>
          <AddPoi cityId={cityId} cityName={cityName} handleOpenModal={handleOpenModal}/>
        </div>,
        document.getElementById("portal")!
      )
    : null;
}
