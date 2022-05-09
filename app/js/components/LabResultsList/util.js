const isLabSet = (obs) => obs.concept.conceptClass && obs.concept.conceptClass.name === 'LabSet';
const isTest = (obs) => obs.concept.conceptClass && obs.concept.conceptClass.name === 'Test';

export { isLabSet, isTest };