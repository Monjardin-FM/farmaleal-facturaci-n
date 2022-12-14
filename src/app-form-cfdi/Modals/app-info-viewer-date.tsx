import { AppModalInfo } from "../../presentation/components/AppModalInfo";
import React from "react";
import FarmaLealTicketDate from "../../assets/img/fechaTicketInfo.jpg";
type AppInfoViewerDateProps = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};
export const AppInfoViewerDate = ({
  open,
  close,
  isOpen,
}: AppInfoViewerDateProps) => {
  const titleInfoViewerDate = "Fecha de Ticket";
  const descriptionViewerDate =
    "La fecha de ticket la puedes encontrar como se muestra en el ejemplo";

  return (
    <AppModalInfo
      open={open}
      close={close}
      isOpen={isOpen}
      title={titleInfoViewerDate}
      description={descriptionViewerDate}
      imageContent={FarmaLealTicketDate}
    />
  );
};
