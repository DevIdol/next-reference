import { REGION, TOWNSHIPS } from '../constants/regionsAndTownships';

// Function to validate region and township
export function getValidRegionAndTownship(region: string, township: string) {
  if (!REGION.includes(region)) {
    throw new Error(`Invalid region: ${region}`);
  }
  if (!TOWNSHIPS[region]?.includes(township)) {
    throw new Error(`Invalid township: ${township} for region: ${region}`);
  }
  return { region, township };
}
