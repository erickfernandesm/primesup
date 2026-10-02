export interface OpeningHours {
  /** Ex.: "Segunda a sexta" */
  days: string;
  /** Ex.: "09:00" */
  opens: string;
  closes: string;
  /** Dias no padrão schema.org, para SEO local. */
  schemaDays: Array<
    "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"
  >;
}

export interface Differential {
  title: string;
  description: string;
}

export interface InstagramPost {
  image: string;
  alt: string;
  href: string;
}
