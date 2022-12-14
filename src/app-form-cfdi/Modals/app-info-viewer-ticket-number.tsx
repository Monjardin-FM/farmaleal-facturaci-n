import { AppModalInfo } from "../../presentation/components/AppModalInfo";
import React from "react";
import FarmaLealTicketDate from "../../assets/img/ticketNumberInfo.jpg";
type AppInfoViewerTicketNumberProps = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};
export const AppInfoViewerTicketNumber = ({
  open,
  close,
  isOpen,
}: AppInfoViewerTicketNumberProps) => {
  const titleInfoViewerDate = "Número de Ticket";
  const descriptionViewerDate =
    "El número de ticket lo puedes encontrar como se muestra en el ejemplo";

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
