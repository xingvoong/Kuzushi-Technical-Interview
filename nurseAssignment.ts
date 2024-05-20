import { promises as fsPromises } from 'fs';
import { mean, standardDeviation } from 'simple-statistics';

interface Nurse {
  id: string;
  name: string;
  location: {
    latitude: string;
    longitude: string;
  };
  yoe: number;
  acceptedOffers: number;
  canceledOffers: number;
  averageReplyTime: number;
}

interface Facility {
  location: {
    latitude: string;
    longitude: string;
  };
}

async function readFile(filePath: string): Promise<string> {
  try {
    return await fsPromises.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
}

function preprocessData(data: any[]): Nurse[] {
  return data.map(nurse => ({
    id: nurse.id,
    name: nurse.name,
    location: nurse.location,
    yoe: nurse.yoe || 0,
    acceptedOffers: nurse.acceptedOffers || 0,
    canceledOffers: nurse.canceledOffers || 0,
    averageReplyTime: nurse.averageReplyTime || 0
  }));
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

function scoreNurses(data: Nurse[], facilityLocation: Facility): number[] {
  const scores = data.map(nurse => {
    const distance = calculateDistance(
      parseFloat(nurse.location.latitude),
      parseFloat(nurse.location.longitude),
      parseFloat(facilityLocation.location.latitude),
      parseFloat(facilityLocation.location.longitude)
    );

    const yoeScore = (nurse.yoe / 10) * 0.10;
    const distanceScore = (distance / 100) * 0.10; // Assume max 100 km for normalization
    const acceptedOffersScore = (nurse.acceptedOffers / 100) * 0.30; // Assume max 100 accepted offers for normalization
    const canceledOffersScore = ((100 - nurse.canceledOffers) / 100) * 0.30; // Assume max 100 canceled offers for normalization
    const replyTimeScore = ((6000 - nurse.averageReplyTime) / 6000) * 0.20; // Assume max 6000 seconds for normalization

    return yoeScore + distanceScore + acceptedOffersScore + canceledOffersScore + replyTimeScore;
  });

  return scores;
}

function rankNurses(scores: number[], data: Nurse[]): Nurse[] {
  const rankedIndices = scores.map((score, index) => ({ score, index }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  return rankedIndices.map(({ index }) => data[index]);
}

export async function getTopNurses(facilityLocation: Facility): Promise<Nurse[]> {
  try {
    const fileData = await readFile('sample-data/clinician.json');
    const nurseData: Nurse[] = preprocessData(JSON.parse(fileData));
    const nurseScores = scoreNurses(nurseData, facilityLocation);
    return rankNurses(nurseScores, nurseData);
  } catch (error) {
    console.error('Error processing nurse data:', error);
    return [];
  }
}

async function main() {
  const facilityLocation = {
    location: {
      latitude: '37.7749', // Example latitude
      longitude: '-122.4194' // Example longitude
    }
  }; // Replace with actual location input

  const topNurses = await getTopNurses(facilityLocation);
  console.log(topNurses);
}

main().catch(console.error);
