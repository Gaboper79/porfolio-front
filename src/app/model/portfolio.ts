export interface PortfolioI {
  id: number;
  email: string;
  datospersonales: {
    nombre: string;
    imgUser: string;
    titulo: string;
    acerdemi: string;
  };
  educacion: string;
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
}
