import { AppModalInfo } from "../../presentation/components/AppModalInfo";
import React from "react";
import FarmaLealTicketDate from "../../assets/img/totalAmountTicket.jpg";

type AppInfoViewerAmountProps = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

export const AppInfoViewerAmount = ({
  open,
  close,
  isOpen,
}: AppInfoViewerAmountProps) => {
  const title = "Monto Total del Ticket";
  const description =
    "El monto total del ticket lo puedes encontrar como se muestra en el ejemplo";
  return (
    <AppModalInfo
      open={open}
      close={close}
      isOpen={isOpen}
      title={title}
      description={description}
      imageContent={FarmaLealTicketDate}
    />
  );
};
