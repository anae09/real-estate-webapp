export class Nekretnina {
  _id: string;
  naziv: string;
  adresa: string;
  grad: string;
  opstina: string;
  kategorija: string;
  brojSpratova: number;
  brojSprata: number;
  brojSoba: number;
  imaNamestaj: boolean;
  kvadratura: number;
  transakcija: string;
  slike: string[];
  video: string[];
  iznajmljivanje: Period[];
  cena: number;
  vlasnik: string;
  aktivna: boolean;
  status: string;
  promovisana: boolean;
  ponude: Ponuda[]
}

export class Period {
  datumOd: Date;
  datumDo: Date;
}

export class Ponuda {
  id: string;
  placanje: string;
  datumOd: Date;
  datumDo: Date;
  kupac: string;
  status: string;
}
