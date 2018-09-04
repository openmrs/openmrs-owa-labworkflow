import axiosInstance from '../config/axios';

const api = {
  getPatientRecord: params => axiosInstance.get(`patient/${params.patientUuid}?v=custom:(patientId,uuid,patientIdentifier:(uuid,identifier),person:(gender,age,birthdate,birthdateEstimated,personName,preferredAddress),attributes:(value,attributeType:(name)))`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),

  getPatientNote: params => axiosInstance.get(`obs?concept=162169AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA&patient=${params.patientUuid}&v=full`)
    .then((response) => {
      if (response.status !== 200) {
        throw response;
      } else {
        return response.data;
      }
    }),
};

export default api;
