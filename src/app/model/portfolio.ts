import { ProyectoI } from "./proyectoI";
export interface PortfolioI {
  id: number;
  email: string;
  datospersonales: {
    nombre: string;
    imgUser: string;
    titulo: string;
    acerdemi: string;
  };
  educacion: [{ titulo: string; establecimiento: string; fecha: string }];
  experiencia: [
    {
      empresa: string;
      img: string;
      descripcion: string;
      fechIni: string;
      fechaFin: string;
      puesto: string;
    }
  ];
  proyectos: ProyectoI[];
}
