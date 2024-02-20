// Add classNames
export function cls(...classNames: string[]) {
  return classNames.join(" ");
}

// Get image from Cloudflare
type VariantName = "public" | "avatar";
export function getImage(imageId: string, variantName: VariantName) {
  return `https://imagedelivery.net/kk4YLvIogqMNHpBdH1Y55w/${imageId}/${variantName}`;
}
