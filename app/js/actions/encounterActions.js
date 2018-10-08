import { axiosInstance } from '../config';
import mockEncounter from '../mockData/mockEncounters.json';


// fetch the patient orders
// fetch the patient encounters
// filter the patient test order number and get the tests info to know if it's a set or not
// 
export const fetchEncounter = () => ({
  type: 'FETCH_PATIENT_ENCOUNTER',
  payload: Promise.resolve(mockEncounter),
});
