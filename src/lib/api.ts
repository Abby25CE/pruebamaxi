export interface Attribute {
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
  brandModel: string;
  fullModel: string;
  year: string;
  bodyType: string;
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

export interface NavigationItem {
  label: string;
  isAction?: boolean;
  isCategory?: boolean;
  isBrand?: boolean;
  isModel?: boolean;
  isVariant?: boolean;
}

// Cache simple en memoria
const cache = new Map<string, { data: Anuncio; timestamp: number }>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutos

// Breadcrumb dinámico
export function buildNavigation(anuncio: Anuncio): NavigationItem[] {
  return [
    { label: "Volver al listado", isAction: true },
    { label: "Compra de autos", isCategory: true },
    { label: anuncio.brandModel.split(" ")[0] || "Marca", isBrand: true },
    {
      label: anuncio.year.replace(anuncio.brandModel, "").trim() || "Versión",
      isVariant: true,
    },
  ];
}

// Función para limpiar cache expirado
function cleanExpiredCache() {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}

// Función principal para obtener el anuncio con cache
export async function fetchAnuncio(id: string): Promise<Anuncio> {
  // Limpiar cache expirado
  cleanExpiredCache();

  // Verificar si existe en cache y no ha expirado
  const cached = cache.get(id);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log(`Cache hit para anuncio ${id}`);
    return cached.data;
  }

  console.log(`Fetching anuncio ${id} desde API`);

  const res = await fetch(`https://beta.maxipublica.com/testing/ads/${id}`);
  if (!res.ok) throw new Error("No se pudo obtener el anuncio");

  const data = await res.json();

  // Atributos importantes para mostrar
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

  const attributes: Attribute[] = (data.attributes || [])
    .filter((attr: any) => importantAttributeIds.includes(attr.id))
    .map((attr: any) => ({
      id: attr.id,
      label: attr.label,
      value: attr.value,
    }));

  // Valores individuales
  const doorsAttr = data.attributes?.find((attr: any) => attr.id === "doors");
  const doors = Number(doorsAttr?.value) || 0;

  const odometerAttr = data.attributes?.find(
    (attr: any) => attr.id === "odometer"
  );
  const odometer = Number(odometerAttr?.value) || 0;

  const priceAttr = data.attributes?.find((attr: any) => attr.id === "price");
  const currencyAttr = data.attributes?.find(
    (attr: any) => attr.id === "currency"
  );

  const price = typeof priceAttr?.value === "number" ? priceAttr.value : 0;
  const currency =
    typeof currencyAttr?.value === "string" ? currencyAttr.value : "MXN";

  const descriptionAttr = data.attributes?.find(
    (attr: any) => attr.id === "descriptionAut"
  );

  const description =
    typeof descriptionAttr?.value === "string" ? descriptionAttr.value : "";

  const images: string[] = (data.images || [])
    .map((img: any) => img.url)
    .filter(Boolean);

  const sellerName = data.seller?.commercialName ?? "Sin vendedor";
  const sellerPhone = data.seller?.phone?.[0]?.format ?? "Sin teléfono";
  const sellerLogo = data.seller?.logo ?? "";

  const loc = data.location;

  const location = {
    street: loc?.street ?? "",
    extNumber: loc?.numExt ?? "",
    intNumber: loc?.numInt ?? "",
    zipCode: loc?.zipCode ?? "",
    city: loc?.location?.city?.name ?? "",
    state: loc?.location?.state?.name ?? "",
  };

  // Datos del modelo
  const brand =
    data.attributes?.find((attr: any) => attr.id === "brand")?.value ?? "";
  const model =
    data.attributes?.find((attr: any) => attr.id === "model")?.value ?? "";
  const year =
    data.attributes?.find((attr: any) => attr.id === "year")?.value ?? "";
  const trim =
    data.attributes?.find((attr: any) => attr.id === "trim")?.value ?? "";

  const brandModel = [brand, model].filter(Boolean).join(" ");
  const fullModel = [brand, model, year, trim].filter(Boolean).join(" ");

  const bodyTypeAttr = data.attributes?.find(
    (attr: any) => attr.id === "bodyType"
  );
  const bodyType =
    typeof bodyTypeAttr?.value === "string"
      ? bodyTypeAttr.value
      : "No especificado";

  const anuncio: Anuncio = {
    id: String(data._id),
    title: data.title || "",
    description,
    price,
    currency,
    images,
    attributes,
    odometer,
    doors,
    sellerName,
    sellerPhone,
    sellerLogo,
    year,
    brandModel,
    fullModel,
    bodyType,
    location,
  };

  // Guardar en cache
  cache.set(id, { data: anuncio, timestamp: Date.now() });

  return anuncio;
}

// Función para limpiar cache manualmente (útil para desarrollo)
export function clearCache() {
  cache.clear();
  console.log("Cache limpiado");
}
