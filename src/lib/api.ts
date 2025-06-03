export interface Attribute {
  name: string;
  id: string;
  label: string;
  value: string | number | boolean | null;
}

export interface Anuncio {
  id: string;
  brandModel: string;
  year: string;
  description: string;
  price: number;
  currency: string;
  sellerLogo: string;
  odometer: number;
  images: string[];
  attributes: Attribute[];
  sellerName: string;
  sellerPhone: string;
  model: string;
  doors: number;
  location: {
    street: string;
    extNumber: string;
    intNumber: string;
    zipCode: string;
    city: string;
    state: string;
  };
}

export async function fetchAnuncio(id: string): Promise<Anuncio> {
  const res = await fetch(`https://beta.maxipublica.com/testing/ads/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el anuncio");

  const data = await res.json();

  const importantAttributeIds = [
    "year",
    "transmission",
    "direction",
    "vesture",
    "energy",
    "condition",
    "doors",
    "odometer",
    "bodyType",
    "colorExt",
    "colorInt",
    "traction",
  ];
  const brand =
    data.attributes?.find((attr: any) => attr.id === "brand")?.value ?? "";
  const mode =
    data.attributes?.find((attr: any) => attr.id === "model")?.value ?? "";
  const year =
    data.attributes?.find((attr: any) => attr.id === "year")?.value ?? "";

  const brandModel = [brand, mode].filter(Boolean).join(" ");

  const model =
    data.attributes?.find((attr: any) => attr.id === "model")?.value ?? "";
  data.attributes?.find((attr: any) => attr.id === "year")?.value ?? "";

  const doorsAttr = data.attributes?.find((attr: any) => attr.id === "doors");
  const doors = Number(doorsAttr?.value) || 0;

  const sellerName = data.seller?.commercialName ?? "Sin vendedor";
  const sellerPhone = data.seller?.phone?.[0]?.format ?? "Sin teléfono";
  const sellerLogo = data.seller?.logo ?? "";
  const odometerAttr = data.attributes?.find(
    (attr: any) => attr.id === "odometer"
  );
  const odometer =
    typeof odometerAttr?.value === "number" ? odometerAttr.value : 0;

  const attributes: Attribute[] = (data.attributes || [])
    .filter((attr: any) => importantAttributeIds.includes(attr.id))
    .map((attr: any) => ({
      id: attr.id,
      label: attr.label,
      value: attr.value,
    }));

  const descriptionAttr = data.attributes?.find(
    (attr: any) => attr.id === "descriptionAut"
  );

  const priceAttr = data.attributes?.find((attr: any) => attr.id === "price");
  const currencyAttr = data.attributes?.find(
    (attr: any) => attr.id === "currency"
  );

  const price = typeof priceAttr?.value === "number" ? priceAttr.value : 0;
  const currency =
    typeof currencyAttr?.value === "string" ? currencyAttr.value : "MXN";

  const images: string[] = (data.images || [])
    .map((img: any) => img.url)
    .filter(Boolean);

  const loc = data.location;

  const location = {
    street: loc?.street ?? "",
    extNumber: loc?.numExt ?? "",
    intNumber: loc?.numInt ?? "",
    zipCode: loc?.zipCode ?? "",
    city: loc?.location?.city?.name ?? "",
    state: loc?.location?.state?.name ?? "",
  };

  return {
    id: String(data._id),
    brandModel,
    year,
    description:
      typeof descriptionAttr?.value === "string" ? descriptionAttr.value : "",
    price,
    currency,
    images,
    attributes,
    odometer,
    model,
    doors,
    sellerName,
    location,
    sellerPhone,
    sellerLogo,
  };
}
