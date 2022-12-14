import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { AppFormField } from "../presentation/components/AppForm";
import { AppFormLabel } from "../presentation/components/AppForm/AppFormLabel";
import AppTextField from "../presentation/components/AppTextField";
import "../assets/css/form-background.css";
import { AppButton } from "../presentation/components/AppButton";
import AppSelect from "../presentation/components/AppSelect";
import { UsosCFDI } from "../assets/useCFDI";
import * as Yup from "yup";
import { AppToast } from "../presentation/components/AppToast";
import AppDatePicker from "../presentation/components/AppDatePicker";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { RegimenFiscal } from "./../assets/RegimenFiscal";
import { AppErrorForm } from "../presentation/components/AppErrorForm";
import dayjs from "dayjs";
import HelpOutline from "@mui/icons-material/HelpOutline";
import { AppInfoViewerDate } from "./Modals/app-info-viewer-date";
import { AppInfoViewerTicketNumber } from "./Modals/app-info-viewer-ticket-number";
import { AppInfoViewerAmount } from "./Modals/app-info-viewer-amount-ticket";
import Swal from "sweetalert2";

export type CFDIFormValue = {
  Nombre: string;
  RFC: string;
  TipoPersona: string;
  RegFiscal: string;
  CFDIUse: string;
  TicketNumber: string;
  TotalAmount: number;
  FechaTicket: Date;
  ShopPlace: string;
  FormaPago: string;
  MetodoPago: string;
  Calle: string;
  NumExt: string;
  NumInt: string;
  Colonia: string;
  DelMun: string;
  Estado: string;
  CP: string;
  Correo: string;
};

export const AppFormCFDI = () => {
  const [fechaTicket, setFechaTicket] = useState<Date>(new Date());
  const [isDateMore, setIsDateMore] = useState<boolean>(false);
  const [dateChange, setDateChange] = useState<boolean>(false);
  const [isSameDate, setIsSameDate] = useState<boolean>(false);
  const [isSameOrAfter, setIsSameOrAfter] = useState<boolean>(false);
  const [diffDate, setDiffDate] = useState<number>(0);
  const [toggleModalDateInfo, setToggleModalDateInfo] =
    useState<boolean>(false);
  const [toggleModalTicketNumberInfo, setToggleModalTicketNumberInfo] =
    useState<boolean>(false);
  const [toggleModalAmounTicketInfo, setToggleModalAmounTicketInfo] =
    useState<boolean>(false);

  const initialValues: CFDIFormValue = {
    Nombre: "",
    RFC: "",
    TipoPersona: "",
    RegFiscal: "",
    CFDIUse: "",
    TicketNumber: "",
    TotalAmount: 0,
    FechaTicket: fechaTicket,
    ShopPlace: "",
    FormaPago: "",
    MetodoPago: "",
    Calle: "",
    NumExt: "",
    NumInt: "",
    Colonia: "",
    DelMun: "",
    Estado: "",
    CP: "",
    Correo: "",
  };

  const CreateCFDISchema = Yup.object().shape({
    Nombre: Yup.string().required("Campo Obligatorio"),
    RFC: Yup.string()
      .max(13, "El RFC debe de tener máximo 13 caracteres")
      .required("Campo Obligatorio"),
    TipoPersona: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Debes seleccionar una opción"),
    RegFiscal: Yup.string().required("Debes seleccionar una opción"),
    CFDIUse: Yup.string()
      .min(1, "Debes seleccionar una opción")
      .required("Debes seleccionar una opción"),
    TicketNumber: Yup.string().required("Campo obligatorio"),
    TotalAmount: Yup.number()
      .required("Campo Obligatorio")
      .positive("El monto debe ser mayor a 0"),
    ShopPlace: Yup.string().required("Campo Obligatorio"),
    FormaPago: Yup.string()
      .min(1, "Debes de seleccionar una forma de pago")
      .required("Debes de seleccionar una forma de pago"),
    MetodoPago: Yup.string()
      .min(1, "Debes seleccionar un método de pago")
      .required("Debes seleccionar un método de pago"),
    Calle: Yup.string().required("Campo obligatorio"),
    NumExt: Yup.string().required("Campo obligatorio"),
    Colonia: Yup.string().required("Campo Obligatorio"),
    DelMun: Yup.string().required("Campo Obligatorio"),
    Estado: Yup.string().required("Campo Obligatorio"),
    CP: Yup.string()
      .required("Campo Obligatorio")
      .length(5, "Codigo Postal Inválido")
      .matches(/^\d+$/, "Código Postal Inválido"),
    Correo: Yup.string()
      .email("Introduce un correo válido")
      .required("Debes de introducir un correo para enviar la factura"),
  });

  const onSubmitHandler = async (data: CFDIFormValue) => {
    if (isSameDate) {
      AppToast().fire({
        icon: "error",
        title: `Fecha Inválida`,
        text: `Debes de esperar al menos 24 horas para poder generar tu factura`,
      });
      setIsDateMore(true);
      return false;
    } else if (
      !isSameDate &&
      data.Nombre !== "" &&
      data.TipoPersona !== "" &&
      data.RFC !== "" &&
      data.TicketNumber !== "" &&
      data.TotalAmount !== 0 &&
      data.ShopPlace !== "" &&
      data.RegFiscal !== "" &&
      data.CFDIUse !== "" &&
      data.FormaPago !== "" &&
      data.MetodoPago !== "" &&
      data.Calle !== "" &&
      data.NumExt !== "" &&
      data.Colonia !== "" &&
      data.DelMun !== "" &&
      data.Estado !== "" &&
      data.CP !== "" &&
      data.Correo !== ""
    ) {
      Swal.fire({
        title: "Factura generada con éxito",
        text: `La factura se enviará al correo ${data.Correo}`,
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#65af9d",
        color: "#206265",
      });
      return true;

      console.table(data);
    } else {
      AppToast().fire({
        icon: "error",
        title: `Uno o más campos sin rellenar.
        `,
        text: `Debes de rellenar los campos del formulario`,
      });
      return false;
    }
  };

  useEffect(() => {
    setDiffDate(dayjs().diff(fechaTicket, "month", true));
    setIsSameOrAfter(dayjs(fechaTicket).isAfter(dayjs()));
    setIsSameDate(dayjs(fechaTicket).isSame(dayjs(), "day"));
  }, [dateChange]);

  useEffect(() => {
    if (diffDate > 1) {
      AppToast().fire({
        icon: "error",
        title: `Ticket con más de 1 mes de antigüedad`,
        text: `No se puede generar una factura de un ticket con más de un mes de antigüedad`,
      });
      setIsDateMore(true);
    }
    if (diffDate < 1) setIsDateMore(false);
    if (isSameOrAfter) {
      AppToast().fire({
        icon: "error",
        title: `Fecha Inválida`,
        text: `No se puede generar una factura con una fecha futura`,
      });
      setIsDateMore(true);
    }
  }, [diffDate, isSameOrAfter]);

  return (
    <>
      <AppInfoViewerDate
        open={() => setToggleModalDateInfo(true)}
        close={() => setToggleModalDateInfo(false)}
        isOpen={toggleModalDateInfo}
      />
      <AppInfoViewerTicketNumber
        open={() => {
          setToggleModalTicketNumberInfo(true);
        }}
        close={() => {
          setToggleModalTicketNumberInfo(false);
        }}
        isOpen={toggleModalTicketNumberInfo}
      />
      <AppInfoViewerAmount
        open={() => setToggleModalAmounTicketInfo(true)}
        close={() => setToggleModalAmounTicketInfo(false)}
        isOpen={toggleModalAmounTicketInfo}
      />

      <div className="container">
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={CreateCFDISchema}
        >
          {({
            values,
            handleSubmit,
            handleChange,
            errors,
            setFieldValue,
            resetForm,
          }) => {
            return (
              <Form onSubmit={handleSubmit}>
                <div className="h-full grid p-7 max-sm:px-5 background-form mb-2">
                  <div className="text-lg  text-primary-600 mb-5 max-sm:text-sm">
                    Ingresa tus datos de Facturación
                  </div>
                  <div className="grid grid-cols-12 gap-6 max-sm:gap-x-3 max-sm:gap-y-4 bg-white p-5 max-sm:p-5 rounded-lg bg-opacity-30 border border-bg-dark border-opacity-10">
                    <AppFormField className="col-span-4 max-sm:col-span-12 flex flex-col">
                      <AppFormLabel>Nombre:</AppFormLabel>
                      <AppTextField
                        placeholder="Nombre"
                        name="Nombre"
                        value={values.Nombre}
                        onChange={handleChange}
                      />
                      {errors.Nombre && (
                        <AppErrorForm
                          errorName={errors.Nombre}
                          errorFlag={errors.Nombre ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Tipo de Persona:</AppFormLabel>
                      <AppSelect
                        name="TipoPersona"
                        value={values.TipoPersona}
                        onChange={handleChange}
                      >
                        <option value={""}>Seleccionar</option>
                        <option value={"PF"}>Persona Física</option>
                        <option value={"PM"}>Persona Moral</option>
                      </AppSelect>
                      {errors.TipoPersona && (
                        <AppErrorForm
                          errorName={errors.TipoPersona}
                          errorFlag={errors.TipoPersona ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>RFC:</AppFormLabel>
                      <AppTextField
                        placeholder="RFC"
                        name="RFC"
                        value={values.RFC}
                        onChange={handleChange}
                      />
                      {errors.RFC && (
                        <AppErrorForm
                          errorName={errors.RFC}
                          errorFlag={errors.RFC ? true : false}
                        />
                      )}
                    </AppFormField>

                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>
                        <div className="flex flex-row gap-1 items-center">
                          <div>Fecha de Ticket: </div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              setToggleModalDateInfo(true);
                            }}
                          >
                            <HelpOutline fontSize="small" color="primary" />
                          </div>
                        </div>
                      </AppFormLabel>
                      <AppDatePicker
                        id="FechaTicket"
                        name="FechaTicket"
                        selected={values.FechaTicket}
                        locale={"es"}
                        onChange={(FechaTicket) => {
                          if (FechaTicket instanceof Date) {
                            setFieldValue("FechaTicket", FechaTicket);
                            setFechaTicket(FechaTicket);
                            setDateChange(!dateChange);
                          }
                        }}
                        leftIcon={<EventNoteIcon />}
                      ></AppDatePicker>
                    </AppFormField>
                    <AppFormField className="col-span-2 max-sm:col-span-12">
                      <AppFormLabel>
                        <div className="flex flex-row gap-1 items-center">
                          <div>Número de Ticket:</div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => {
                              setToggleModalTicketNumberInfo(true);
                            }}
                          >
                            <HelpOutline fontSize="small" color="primary" />
                          </div>
                        </div>
                      </AppFormLabel>
                      <AppTextField
                        placeholder="Número de Ticket"
                        name="TicketNumber"
                        value={values.TicketNumber}
                        onChange={handleChange}
                      />
                      {errors.TicketNumber && (
                        <AppErrorForm
                          errorName={errors.TicketNumber}
                          errorFlag={errors.TicketNumber ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-2 max-sm:col-span-12">
                      <AppFormLabel>
                        <div className="flex flex-row gap-1 items-center">
                          <div>Monto Total (Ticket)</div>
                          <div
                            className="hover:cursor-pointer"
                            onClick={() => setToggleModalAmounTicketInfo(true)}
                          >
                            <HelpOutline fontSize="small" color="primary" />
                          </div>
                        </div>
                      </AppFormLabel>
                      <AppTextField
                        placeholder="Monto Total"
                        name="TotalAmount"
                        value={values.TotalAmount}
                        onChange={handleChange}
                        type="number"
                        min={0}
                        step={0.5}
                      />
                      {errors.TotalAmount && (
                        <AppErrorForm
                          errorName={errors.TotalAmount}
                          errorFlag={errors.TotalAmount ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Lugar de Compra:</AppFormLabel>
                      <AppSelect
                        name="ShopPlace"
                        value={values.ShopPlace}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">Coppel</option>
                        <option value="2">Farma Leal tienda en línea</option>
                      </AppSelect>
                      {errors.ShopPlace && (
                        <AppErrorForm
                          errorName={errors.ShopPlace}
                          errorFlag={errors.ShopPlace ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Régimen Fiscal:</AppFormLabel>
                      <AppSelect
                        name="RegFiscal"
                        value={values.RegFiscal}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        {RegimenFiscal.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {item.regimen}
                            </option>
                          );
                        })}
                      </AppSelect>
                      {errors.RegFiscal && (
                        <AppErrorForm
                          errorName={errors.RegFiscal}
                          errorFlag={errors.RegFiscal ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Uso de CFDI:</AppFormLabel>
                      <AppSelect
                        name="CFDIUse"
                        value={values.CFDIUse}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        {UsosCFDI.map((item, index) => {
                          return (
                            <option key={index} value={item.key}>
                              {item.use}
                            </option>
                          );
                        })}
                      </AppSelect>
                      {errors.CFDIUse && (
                        <AppErrorForm
                          errorName={errors.CFDIUse}
                          errorFlag={errors.CFDIUse ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Forma de Pago:</AppFormLabel>
                      <AppSelect
                        name="FormaPago"
                        value={values.FormaPago}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="1">Efectivo</option>
                        <option value="2">
                          Transferencia Electrónica de Fondos
                        </option>
                        <option value="3">Tarjeta de Crédito</option>
                        <option value="4">Monedero Electrónico</option>
                        <option value="5">Tarjeta de Débito</option>
                      </AppSelect>
                      {errors.FormaPago && (
                        <AppErrorForm
                          errorName={errors.FormaPago}
                          errorFlag={errors.FormaPago ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Método de Pago: </AppFormLabel>
                      <AppSelect
                        name="MetodoPago"
                        value={values.MetodoPago}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar</option>
                        <option value="PUE">
                          PUE (Pago en una sola exhibición)
                        </option>
                      </AppSelect>
                      {errors.MetodoPago && (
                        <AppErrorForm
                          errorName={errors.MetodoPago}
                          errorFlag={errors.MetodoPago ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Calle:</AppFormLabel>
                      <AppTextField
                        placeholder="Calle"
                        name="Calle"
                        value={values.Calle}
                        onChange={handleChange}
                      />
                      {errors.Calle && (
                        <AppErrorForm
                          errorName={errors.Calle}
                          errorFlag={errors.Calle ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-2 max-sm:col-span-6">
                      <AppFormLabel>Número Exterior:</AppFormLabel>
                      <AppTextField
                        placeholder="Núm. Ext."
                        name="NumExt"
                        value={values.NumExt}
                        onChange={handleChange}
                      />
                      {errors.NumExt && (
                        <AppErrorForm
                          errorName={errors.NumExt}
                          errorFlag={errors.NumExt ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-2 max-sm:col-span-6">
                      <AppFormLabel>Número Interior:</AppFormLabel>
                      <AppTextField
                        placeholder="Núm. Int."
                        name="NumInt"
                        value={values.NumInt}
                        onChange={handleChange}
                      />
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Colonia:</AppFormLabel>
                      <AppTextField
                        placeholder="Colonia"
                        name="Colonia"
                        value={values.Colonia}
                        onChange={handleChange}
                      />
                      {errors.Colonia && (
                        <AppErrorForm
                          errorName={errors.Colonia}
                          errorFlag={errors.Colonia ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Delegación/Municipio:</AppFormLabel>
                      <AppTextField
                        placeholder="Del./Mun."
                        name="DelMun"
                        value={values.DelMun}
                        onChange={handleChange}
                      />
                      {errors.DelMun && (
                        <AppErrorForm
                          errorName={errors.DelMun}
                          errorFlag={errors.DelMun ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Estado:</AppFormLabel>
                      <AppTextField
                        placeholder="Estado"
                        name="Estado"
                        value={values.Estado}
                        onChange={handleChange}
                      />
                      {errors.Estado && (
                        <AppErrorForm
                          errorName={errors.Estado}
                          errorFlag={errors.Estado ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-3 max-sm:col-span-12">
                      <AppFormLabel>Código Postal:</AppFormLabel>
                      <AppTextField
                        placeholder="C.P."
                        name="CP"
                        value={values.CP}
                        onChange={handleChange}
                      />
                      {errors.CP && (
                        <AppErrorForm
                          errorName={errors.CP}
                          errorFlag={errors.CP ? true : false}
                        />
                      )}
                    </AppFormField>
                    <AppFormField className="col-span-4 max-sm:col-span-12">
                      <AppFormLabel>Correo Electrónico: </AppFormLabel>
                      <AppTextField
                        placeholder="Correo Electrónico"
                        name="Correo"
                        value={values.Correo}
                        onChange={handleChange}
                      />
                      {errors.Correo && (
                        <AppErrorForm
                          errorName={errors.Correo}
                          errorFlag={errors.Correo ? true : false}
                        />
                      )}
                    </AppFormField>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <div>
                      <AppButton
                        className="text-base"
                        colorScheme="primary"
                        onClick={async () => {
                          const response = await onSubmitHandler(values);
                          if (response) {
                            resetForm();
                          }
                        }}
                        type="submit"
                        isDisabled={isDateMore}
                      >
                        Generar Factura
                      </AppButton>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </>
  );
};
