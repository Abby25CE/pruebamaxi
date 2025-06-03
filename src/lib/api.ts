export interface Attribute {
  name: string;
  id: string;
  label: string;
  value: string | number | boolean | null;
}

export interface Anuncio {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  sellerLogo: string;
  odometer: number;
  images: string[];
  attributes: Attribute[];
  sellerName: string;
  sellerPhone: string;
  location: string;
  doors: number;
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

  const doorsAttr = data.attributes?.find((attr: any) => attr.id === "doors");
  const doors = typeof doorsAttr?.value === "number" ? doorsAttr.value : 0;

  const sellerName = data.seller?.commercialName ?? "Sin vendedor";
  const sellerPhone = data.seller?.phone?.[0]?.format ?? "Sin teléfono";
  const sellerLogo = data.seller?.logo ?? "";
  const odometerAttr = data.attributes?.find(
    (attr: any) => attr.id === "odometer"
  );
  const odometer =
    typeof odometerAttr?.value === "number" ? odometerAttr.value : 0;

  const loc = data.location?.location;
  const location = loc
    ? `${loc.city?.name ?? ""}, ${loc.state?.name ?? ""}`
    : "Sin ubicación";

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

  return {
    id: String(data._id),
    title: data.title || "",
    description:
      typeof descriptionAttr?.value === "string" ? descriptionAttr.value : "",
    price,
    currency,
    images,
    attributes,
    odometer,
    doors,
    sellerName,
    sellerPhone,
    location,
    sellerLogo,
  };
}
