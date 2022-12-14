import { Dialog, Transition } from "@headlessui/react";
import { AppButton } from "../AppButton";
import { Fragment, useState } from "react";

export type AppModalInfoProps = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
  imageContent: string;
  title: string;
  description: string;
};

export const AppModalInfo = ({
  open,
  close,
  isOpen,
  imageContent,
  title,
  description,
}: AppModalInfoProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-xl font-medium leading-6 text-gray-700">
                    {title}
                  </Dialog.Title>
                  <div className="mt-5 mb-5">
                    <p className="text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="mt-2">
                    <img
                      title={"InfoTicket"}
                      className="mx-auto h-auto w-2/3 border border-black border-opacity-10 rounded-lg"
                      src={imageContent}
                      alt="Farmaleal"
                    />
                  </div>

                  <div className="mt-4 flex flex-row justify-center">
                    <div>
                      <AppButton
                        variant="solid"
                        colorScheme="primary"
                        onClick={close}
                      >
                        ¡Entendido!
                      </AppButton>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
