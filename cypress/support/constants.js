import moment from 'moment';

const startDate = new Date();
const endDate = new Date(startDate.getTime() - (8 * 24 * 60 * 60 * 1000));


export const MOCKS = {
  SYSTEM_SETTIINGS: {
    dateAndTimeFormat: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.dateAndTimeFormat',
      RESPONSE: {
        body: {
          results: [
            {
              value: "DD-MMM-YYYY HH:mm"
            }
          ]
        }
      }
    },
    labResultsEntryEncounterType: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEntryEncounterType',
      RESPONSE: {
        body: {
          results: [
            {
              value: "10db3139-07c0-4766-b4e5-a41b01363145"
            }
          ]
        }
      }
    },
    didNotPerformQuestion: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformQuestion',
      RESPONSE: {
        body: {
          results: [
            {
              value: "7e0cf626-dbe8-42aa-9b25-483b51350bf8"
            }
          ]
        }
      }
    },
    testOrderType: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.testOrderType',
      RESPONSE: {
        body: {
          results: [ {
            value: "52a447d3-a64a-11e3-9aeb-50e549534c5e"
          }]
        }
      }
    },
    didNotPerformAnswer: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformAnswer',
      RESPONSE: {
        body: {
          results: [
            {
              value: '3cd75550-26fe-102b-80cb-0017a47871b2'
            }
          ]
        }
      }
    },
    testOrderNumberConcept: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.testOrderNumberConcept',
      RESPONSE: {
        body: {
          results: [
            {
              value: '393dec41-2fb5-428f-acfa-36ea85da6666'
            }
          ]
        }
      }
    },
    locationOfLaboratory: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.locationOfLaboratory',
      RESPONSE: {
        body: {
          results: [
            {
              value: 'e9732df4-971d-4a9a-9129-e2e610552468'
            }
          ]
        }
      }
    },
    estimatedCollectionDateQuestion: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.estimatedCollectionDateQuestion',
      RESPONSE: {
        body: {
          results: [
            {
              value: '87f506e3-4433-40ec-b16c-b3c65e402989'
            }
          ]
        }
      }
    },
    estimatedCollectionDateAnswer: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.estimatedCollectionDateAnswer',
      RESPONSE: {
        body: {
          results: [
            {
              value: '3cd6f600-26fe-102b-80cb-0017a47871b2'
            }
          ]
        }
      }
    },
    didNotPerformReason: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.didNotPerformReason',
      RESPONSE: {
        body: {
          results: [
            {
              value: '5dc35a2a-228c-41d0-ae19-5b1e23618eda'
            }
          ]
        }
      }
    },
    labResultsDateConcept: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.labResultsDateConcept',
      RESPONSE: {
        body: {
          results: [
            {
              value: '68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0'
            }
          ]
        }
      }
    },
  },
  ENCOUNTERS: [
    {
      URL: '/openmrs/ws/rest/v1/encounter/?patient=0c9bbb90-c85d-4a13-b2e6-8fc59f999ca4&encounterType=10db3139-07c0-4766-b4e5-a41b01363145&v=custom:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))',
      RESPONSE: {
        results: [
          {
            "id": 121,
            "uuid": "fb9cc06d-9b5a-4091-be6f-f757bb5f3fbb",
            "encounterDatetime": "2018-10-31T00:00:00.000+0100",
            "location": {
                "id": 17,
                "uuid": "be50d584-26b2-4371-8768-2b9565742b3b",
                "name": "Achiv Santral"
            },
            "encounterType": {
                "id": 28,
                "uuid": "10db3139-07c0-4766-b4e5-a41b01363145",
                "name": "Specimen Collection"
            },
            "obs": [
                {
                    "id": 499,
                    "uuid": "2bfb7879-725c-4185-aedd-a85e65a1ece5",
                    "value": null,
                    "concept": {
                        "uuid": "3cd58dba-26fe-102b-80cb-0017a47871b2",
                        "display": "Bilan hépatique",
                        "name": {
                            "display": "Bilan hépatique",
                            "uuid": "e879f35f-db25-485d-b094-4fa36a672049",
                            "name": "Bilan hépatique",
                            "locale": "fr",
                            "localePreferred": true,
                            "conceptNameType": null,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "N/A",
                            "name": "N/A",
                            "description": "Not associated with a datatype (e.g., term answers, sets)",
                            "hl7Abbreviation": "ZZ",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2",
                    "display": "Bilan hépatique: 23,0, 27,0",
                    "groupMembers": [
                        {
                            "id": 500,
                            "uuid": "ef99d160-a7c9-4c8c-8892-f0111c891ae5",
                            "value": 23,
                            "concept": {
                                "uuid": "3cd275d0-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamo-oxaloacétique",
                                "name": {
                                    "display": "Sérum transaminase glutamo-oxaloacétique",
                                    "uuid": "835bef97-7d16-4ecb-9df5-843f530164a9",
                                    "name": "Sérum transaminase glutamo-oxaloacétique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd275d0-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamo-oxaloacétique: 23,0",
                            "groupMembers": null
                        },
                        {
                            "id": 501,
                            "uuid": "692a68c8-a419-41d1-ae02-279574367876",
                            "value": 27,
                            "concept": {
                                "uuid": "3cd27760-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamique-pyruvique",
                                "name": {
                                    "display": "Sérum transaminase glutamique-pyruvique",
                                    "uuid": "766a41f7-b6a0-4afd-b348-37406f2436f1",
                                    "name": "Sérum transaminase glutamique-pyruvique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd27760-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamique-pyruvique: 27,0",
                            "groupMembers": null
                        }
                    ]
                },
                {
                    "id": 498,
                    "uuid": "0118e56d-63b5-4029-be19-136dbac6d1dd",
                    "value": "ORD-1",
                    "concept": {
                        "uuid": "393dec41-2fb5-428f-acfa-36ea85da6666",
                        "display": "Test order number",
                        "name": {
                            "display": "Test order number",
                            "uuid": "b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb",
                            "name": "Test order number",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Text",
                            "name": "Text",
                            "description": "Free text",
                            "hl7Abbreviation": "ST",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^test-order-number",
                    "display": "Test order number: ORD-1",
                    "groupMembers": null
                },
                {
                    "id": 497,
                    "uuid": "8baab460-9a4a-4454-a6be-6bda4a211f9d",
                    "value": "2018-11-02T00:00:00.000+0100",
                    "concept": {
                        "uuid": "68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0",
                        "display": "Date of test results",
                        "name": {
                            "display": "Date of test results",
                            "uuid": "ed9644d3-d844-4060-90bd-d288a8159a20",
                            "name": "Date of test results",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a505e-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Date",
                            "name": "Date",
                            "description": "Absolute date",
                            "hl7Abbreviation": "DT",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^result-date",
                    "display": "Date of test results: 2018-11-02",
                    "groupMembers": null
                }
            ]
          },
        ]
      }
    },
    {
      URL: '/openmrs/ws/rest/v1/encounter/?patient=test-patient-2-uuid&encounterType=10db3139-07c0-4766-b4e5-a41b01363145&v=custom:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))',
      RESPONSE: {
        results: [
          {
            "id": 121,
            "uuid": "fb9cc06d-9b5a-4091-be6f-f757bb5f3fbb",
            "encounterDatetime": "2018-10-31T00:00:00.000+0100",
            "location": {
                "id": 17,
                "uuid": "be50d584-26b2-4371-8768-2b9565742b3b",
                "name": "Achiv Santral"
            },
            "encounterType": {
                "id": 28,
                "uuid": "10db3139-07c0-4766-b4e5-a41b01363145",
                "name": "Specimen Collection"
            },
            "obs": [
                {
                    "id": 499,
                    "uuid": "2bfb7879-725c-4185-aedd-a85e65a1ece5",
                    "value": null,
                    "concept": {
                        "uuid": "3cd58dba-26fe-102b-80cb-0017a47871b2",
                        "display": "Bilan hépatique",
                        "name": {
                            "display": "Bilan hépatique",
                            "uuid": "e879f35f-db25-485d-b094-4fa36a672049",
                            "name": "Bilan hépatique",
                            "locale": "fr",
                            "localePreferred": true,
                            "conceptNameType": null,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "N/A",
                            "name": "N/A",
                            "description": "Not associated with a datatype (e.g., term answers, sets)",
                            "hl7Abbreviation": "ZZ",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2",
                    "display": "Bilan hépatique: 23,0, 27,0",
                    "groupMembers": [
                        {
                            "id": 500,
                            "uuid": "ef99d160-a7c9-4c8c-8892-f0111c891ae5",
                            "value": 23,
                            "concept": {
                                "uuid": "3cd275d0-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamo-oxaloacétique",
                                "name": {
                                    "display": "Sérum transaminase glutamo-oxaloacétique",
                                    "uuid": "835bef97-7d16-4ecb-9df5-843f530164a9",
                                    "name": "Sérum transaminase glutamo-oxaloacétique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd275d0-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamo-oxaloacétique: 23,0",
                            "groupMembers": null
                        },
                        {
                            "id": 501,
                            "uuid": "692a68c8-a419-41d1-ae02-279574367876",
                            "value": 27,
                            "concept": {
                                "uuid": "3cd27760-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamique-pyruvique",
                                "name": {
                                    "display": "Sérum transaminase glutamique-pyruvique",
                                    "uuid": "766a41f7-b6a0-4afd-b348-37406f2436f1",
                                    "name": "Sérum transaminase glutamique-pyruvique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd27760-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamique-pyruvique: 27,0",
                            "groupMembers": null
                        }
                    ]
                },
                {
                    "id": 498,
                    "uuid": "0118e56d-63b5-4029-be19-136dbac6d1dd",
                    "value": "ORD-1",
                    "concept": {
                        "uuid": "393dec41-2fb5-428f-acfa-36ea85da6666",
                        "display": "Test order number",
                        "name": {
                            "display": "Test order number",
                            "uuid": "b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb",
                            "name": "Test order number",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Text",
                            "name": "Text",
                            "description": "Free text",
                            "hl7Abbreviation": "ST",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^test-order-number",
                    "display": "Test order number: ORD-1",
                    "groupMembers": null
                },
                {
                    "id": 497,
                    "uuid": "8baab460-9a4a-4454-a6be-6bda4a211f9d",
                    "value": "2018-11-02T00:00:00.000+0100",
                    "concept": {
                        "uuid": "68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0",
                        "display": "Date of test results",
                        "name": {
                            "display": "Date of test results",
                            "uuid": "ed9644d3-d844-4060-90bd-d288a8159a20",
                            "name": "Date of test results",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a505e-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Date",
                            "name": "Date",
                            "description": "Absolute date",
                            "hl7Abbreviation": "DT",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^result-date",
                    "display": "Date of test results: 2018-11-02",
                    "groupMembers": null
                }
            ]
          },
        ]
      }
    },
    {
      URL: '/openmrs/ws/rest/v1/encounter/?patient=test-patient-3-uuid&encounterType=10db3139-07c0-4766-b4e5-a41b01363145&v=custom:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))',
      RESPONSE: {
        results: [
          {
            "id": 121,
            "uuid": "fb9cc06d-9b5a-4091-be6f-f757bb5f3fbb",
            "encounterDatetime": "2018-10-31T00:00:00.000+0100",
            "location": {
                "id": 17,
                "uuid": "be50d584-26b2-4371-8768-2b9565742b3b",
                "name": "Achiv Santral"
            },
            "encounterType": {
                "id": 28,
                "uuid": "10db3139-07c0-4766-b4e5-a41b01363145",
                "name": "Specimen Collection"
            },
            "obs": [
                {
                    "id": 499,
                    "uuid": "2bfb7879-725c-4185-aedd-a85e65a1ece5",
                    "value": null,
                    "concept": {
                        "uuid": "3cd58dba-26fe-102b-80cb-0017a47871b2",
                        "display": "Bilan hépatique",
                        "name": {
                            "display": "Bilan hépatique",
                            "uuid": "e879f35f-db25-485d-b094-4fa36a672049",
                            "name": "Bilan hépatique",
                            "locale": "fr",
                            "localePreferred": true,
                            "conceptNameType": null,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd58dba-26fe-102b-80cb-0017a47871b2/name/e879f35f-db25-485d-b094-4fa36a672049?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4c94-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "N/A",
                            "name": "N/A",
                            "description": "Not associated with a datatype (e.g., term answers, sets)",
                            "hl7Abbreviation": "ZZ",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4c94-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2",
                    "display": "Bilan hépatique: 23,0, 27,0",
                    "groupMembers": [
                        {
                            "id": 500,
                            "uuid": "ef99d160-a7c9-4c8c-8892-f0111c891ae5",
                            "value": 23,
                            "concept": {
                                "uuid": "3cd275d0-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamo-oxaloacétique",
                                "name": {
                                    "display": "Sérum transaminase glutamo-oxaloacétique",
                                    "uuid": "835bef97-7d16-4ecb-9df5-843f530164a9",
                                    "name": "Sérum transaminase glutamo-oxaloacétique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd275d0-26fe-102b-80cb-0017a47871b2/name/835bef97-7d16-4ecb-9df5-843f530164a9?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd275d0-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamo-oxaloacétique: 23,0",
                            "groupMembers": null
                        },
                        {
                            "id": 501,
                            "uuid": "692a68c8-a419-41d1-ae02-279574367876",
                            "value": 27,
                            "concept": {
                                "uuid": "3cd27760-26fe-102b-80cb-0017a47871b2",
                                "display": "Sérum transaminase glutamique-pyruvique",
                                "name": {
                                    "display": "Sérum transaminase glutamique-pyruvique",
                                    "uuid": "766a41f7-b6a0-4afd-b348-37406f2436f1",
                                    "name": "Sérum transaminase glutamique-pyruvique",
                                    "locale": "fr",
                                    "localePreferred": true,
                                    "conceptNameType": "FULLY_SPECIFIED",
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3cd27760-26fe-102b-80cb-0017a47871b2/name/766a41f7-b6a0-4afd-b348-37406f2436f1?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.9"
                                },
                                "datatype": {
                                    "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                                    "display": "Numeric",
                                    "name": "Numeric",
                                    "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                                    "hl7Abbreviation": "NM",
                                    "retired": false,
                                    "links": [
                                        {
                                            "rel": "self",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                                        },
                                        {
                                            "rel": "full",
                                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                        }
                                    ],
                                    "resourceVersion": "1.8"
                                },
                                "units": "IU/L"
                            },
                            "comment": "result-entry-form^3cd58dba-26fe-102b-80cb-0017a47871b2^3cd27760-26fe-102b-80cb-0017a47871b2",
                            "display": "Sérum transaminase glutamique-pyruvique: 27,0",
                            "groupMembers": null
                        }
                    ]
                },
                {
                    "id": 498,
                    "uuid": "0118e56d-63b5-4029-be19-136dbac6d1dd",
                    "value": "ORD-1",
                    "concept": {
                        "uuid": "393dec41-2fb5-428f-acfa-36ea85da6666",
                        "display": "Test order number",
                        "name": {
                            "display": "Test order number",
                            "uuid": "b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb",
                            "name": "Test order number",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Text",
                            "name": "Text",
                            "description": "Free text",
                            "hl7Abbreviation": "ST",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^test-order-number",
                    "display": "Test order number: ORD-1",
                    "groupMembers": null
                },
                {
                    "id": 497,
                    "uuid": "8baab460-9a4a-4454-a6be-6bda4a211f9d",
                    "value": "2018-11-02T00:00:00.000+0100",
                    "concept": {
                        "uuid": "68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0",
                        "display": "Date of test results",
                        "name": {
                            "display": "Date of test results",
                            "uuid": "ed9644d3-d844-4060-90bd-d288a8159a20",
                            "name": "Date of test results",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a505e-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Date",
                            "name": "Date",
                            "description": "Absolute date",
                            "hl7Abbreviation": "DT",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^result-date",
                    "display": "Date of test results: 2018-11-02",
                    "groupMembers": null
                }
            ]
          },
        ]
      }
    },
    {
      URL: '/openmrs/ws/rest/v1/encounter/?patient=test-patient-4-uuid&encounterType=10db3139-07c0-4766-b4e5-a41b01363145&v=custom:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))',
      RESPONSE: {
        results: [
          {
            "id": 121,
            "uuid": "fb9cc06d-9b5a-4091-be6f-f757bb5f3fbb",
            "encounterDatetime": "2018-10-31T00:00:00.000+0100",
            "location": {
                "id": 17,
                "uuid": "be50d584-26b2-4371-8768-2b9565742b3b",
                "name": "Achiv Santral"
            },
            "encounterType": {
                "id": 28,
                "uuid": "10db3139-07c0-4766-b4e5-a41b01363145",
                "name": "Specimen Collection"
            },
            "obs": [
                {
                    "id": 498,
                    "uuid": "0118e56d-63b5-4029-be19-136dbac6d1dd",
                    "value": "ORD-4",
                    "concept": {
                        "uuid": "393dec41-2fb5-428f-acfa-36ea85da6666",
                        "display": "Test order number",
                        "name": {
                            "display": "Test order number",
                            "uuid": "b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb",
                            "name": "Test order number",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/393dec41-2fb5-428f-acfa-36ea85da6666/name/b8b98d4d-242d-4936-9c3e-3f31ab5bf0eb?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Text",
                            "name": "Text",
                            "description": "Free text",
                            "hl7Abbreviation": "ST",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4ab4-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^test-order-number",
                    "display": "Test order number: ORD-1",
                    "groupMembers": null
                },
                {
                    "id": 497,
                    "uuid": "8baab460-9a4a-4454-a6be-6bda4a211f9d",
                    "value": "2018-11-02T00:00:00.000+0100",
                    "concept": {
                        "uuid": "68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0",
                        "display": "Date of test results",
                        "name": {
                            "display": "Date of test results",
                            "uuid": "ed9644d3-d844-4060-90bd-d288a8159a20",
                            "name": "Date of test results",
                            "locale": "en",
                            "localePreferred": true,
                            "conceptNameType": "FULLY_SPECIFIED",
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0/name/ed9644d3-d844-4060-90bd-d288a8159a20?v=full"
                                }
                            ],
                            "resourceVersion": "1.9"
                        },
                        "datatype": {
                            "uuid": "8d4a505e-c2cc-11de-8d13-0010c6dffd0f",
                            "display": "Date",
                            "name": "Date",
                            "description": "Absolute date",
                            "hl7Abbreviation": "DT",
                            "retired": false,
                            "links": [
                                {
                                    "rel": "self",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f"
                                },
                                {
                                    "rel": "full",
                                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a505e-c2cc-11de-8d13-0010c6dffd0f?v=full"
                                }
                            ],
                            "resourceVersion": "1.8"
                        },
                        "units": null
                    },
                    "comment": "result-entry-form^result-date",
                    "display": "Date of test results: 2018-11-02",
                    "groupMembers": null
                }
            ]
          },
        ]
      }
    }
  ],
  CONCEPTS: [
      {
          URL: '/openmrs/ws/rest/v1/concept/73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA?v=full',
          RESPONSE: {
            "uuid": "73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
            "display": "Serum pH measurement",
            "name": {
                "display": "Serum pH measurement",
                "uuid": "f1e43916-e2dc-4a9c-9a9e-49a402867072",
                "name": "Serum pH measurement",
                "locale": "en",
                "localePreferred": true,
                "conceptNameType": "FULLY_SPECIFIED",
                "links": [
                    {
                        "rel": "self",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/f1e43916-e2dc-4a9c-9a9e-49a402867072"
                    },
                    {
                        "rel": "full",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/f1e43916-e2dc-4a9c-9a9e-49a402867072?v=full"
                    }
                ],
                "resourceVersion": "1.9"
            },
            "datatype": {
                "uuid": "8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
                "display": "Numeric",
                "name": "Numeric",
                "description": "Numeric value, including integer or float (e.g., creatinine, weight)",
                "hl7Abbreviation": "NM",
                "retired": false,
                "links": [
                    {
                        "rel": "self",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f"
                    },
                    {
                        "rel": "full",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptdatatype/8d4a4488-c2cc-11de-8d13-0010c6dffd0f?v=full"
                    }
                ],
                "resourceVersion": "1.8"
            },
            "conceptClass": {
                "uuid": "8d4907b2-c2cc-11de-8d13-0010c6dffd0f",
                "display": "Test",
                "name": "Test",
                "description": "Acq. during patient encounter (vitals, labs, etc.)",
                "retired": false,
                "links": [
                    {
                        "rel": "self",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4907b2-c2cc-11de-8d13-0010c6dffd0f"
                    },
                    {
                        "rel": "full",
                        "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptclass/8d4907b2-c2cc-11de-8d13-0010c6dffd0f?v=full"
                    }
                ],
                "resourceVersion": "1.8"
            },
            "set": false,
            "version": null,
            "retired": false,
            "names": [
                {
                    "display": "Serum pH measurement",
                    "uuid": "f1e43916-e2dc-4a9c-9a9e-49a402867072",
                    "name": "Serum pH measurement",
                    "locale": "en",
                    "localePreferred": true,
                    "conceptNameType": "FULLY_SPECIFIED",
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/f1e43916-e2dc-4a9c-9a9e-49a402867072"
                        },
                        {
                            "rel": "full",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/name/f1e43916-e2dc-4a9c-9a9e-49a402867072?v=full"
                        }
                    ],
                    "resourceVersion": "1.9"
                }
            ],
            "descriptions": [],
            "mappings": [
                {
                    "display": "CIEL: 165176",
                    "uuid": "2720cee4-a709-42e6-a1f7-a38a01dc859e",
                    "conceptReferenceTerm": {
                        "uuid": "d1761831-b628-4b47-86cd-a7532f815009",
                        "display": "CIEL: 165176",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/d1761831-b628-4b47-86cd-a7532f815009"
                            }
                        ]
                    },
                    "conceptMapType": {
                        "uuid": "35543629-7d8c-11e1-909d-c80aa9edcf4e",
                        "display": "SAME-AS",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e"
                            }
                        ]
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/2720cee4-a709-42e6-a1f7-a38a01dc859e"
                        },
                        {
                            "rel": "full",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/2720cee4-a709-42e6-a1f7-a38a01dc859e?v=full"
                        }
                    ],
                    "resourceVersion": "1.9"
                },
                {
                    "display": "LOINC: 2753-2",
                    "uuid": "9d861781-7b5a-422a-bf8b-c98bd1bc6068",
                    "conceptReferenceTerm": {
                        "uuid": "e57a13b6-737d-4feb-9f35-8df76577b10f",
                        "display": "LOINC: 2753-2",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/e57a13b6-737d-4feb-9f35-8df76577b10f"
                            }
                        ]
                    },
                    "conceptMapType": {
                        "uuid": "35543629-7d8c-11e1-909d-c80aa9edcf4e",
                        "display": "SAME-AS",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e"
                            }
                        ]
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/9d861781-7b5a-422a-bf8b-c98bd1bc6068"
                        },
                        {
                            "rel": "full",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/9d861781-7b5a-422a-bf8b-c98bd1bc6068?v=full"
                        }
                    ],
                    "resourceVersion": "1.9"
                },
                {
                    "display": "SNOMED NP: 81065003",
                    "uuid": "59396ae1-f99d-4532-9f44-20eb82902af6",
                    "conceptReferenceTerm": {
                        "uuid": "2c985e66-3926-4967-acef-33a276141369",
                        "display": "SNOMED NP: 81065003",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptreferenceterm/2c985e66-3926-4967-acef-33a276141369"
                            }
                        ]
                    },
                    "conceptMapType": {
                        "uuid": "35543629-7d8c-11e1-909d-c80aa9edcf4e",
                        "display": "SAME-AS",
                        "links": [
                            {
                                "rel": "self",
                                "uri": "http://localhost:8080/openmrs/ws/rest/v1/conceptmaptype/35543629-7d8c-11e1-909d-c80aa9edcf4e"
                            }
                        ]
                    },
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/59396ae1-f99d-4532-9f44-20eb82902af6"
                        },
                        {
                            "rel": "full",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/mapping/59396ae1-f99d-4532-9f44-20eb82902af6?v=full"
                        }
                    ],
                    "resourceVersion": "1.9"
                }
            ],
            "answers": [],
            "setMembers": [],
            "auditInfo": {
                "creator": {
                    "uuid": "A4F30A1B-5EB9-11DF-A648-37A07F9C90FB",
                    "display": "daemon",
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB"
                        }
                    ]
                },
                "dateCreated": "2018-08-09T17:27:30.000+0100",
                "changedBy": {
                    "uuid": "A4F30A1B-5EB9-11DF-A648-37A07F9C90FB",
                    "display": "daemon",
                    "links": [
                        {
                            "rel": "self",
                            "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/A4F30A1B-5EB9-11DF-A648-37A07F9C90FB"
                        }
                    ]
                },
                "dateChanged": "2018-10-22T08:23:17.000+0100"
            },
            "hiNormal": null,
            "hiAbsolute": 14,
            "hiCritical": null,
            "lowNormal": null,
            "lowAbsolute": 0,
            "lowCritical": null,
            "units": null,
            "allowDecimal": false,
            "displayPrecision": null,
            "attributes": [],
            "links": [
                {
                    "rel": "self",
                    "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/165176AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                }
            ],
            "resourceVersion": "2.0"
          }
      }
  ],
 // TODO: fix mockiing for enounter post
  ENCOUNTER_POST: {
    URL: '/openmrs/ws/rest/v1/encounter/?v=custom:(id,uuid,encounterDatetime,location:(id,uuid,name),encounterType:(id,uuid,name),obs:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers:(id,uuid,value:(id,uuid,display,name:(uuid,name)),concept:(uuid,display,name,datatype,units),comment,display,groupMembers)))',
    RESPONSE: {
        "encounterType":"10db3139-07c0-4766-b4e5-a41b01363145",
        "location": {

        },
        "encounterDatetime":"2019-03-11T00:00:00.000+01:00",
        "obs": [
            {
                "concept":"393dec41-2fb5-428f-acfa-36ea85da6666",
                "comment":"result-entry-form^test-order-number",
                "value":"ORD-7",
                "order":"f9237ee3-9a7b-46ed-aab7-fff9303df636"
            },
            {
                "concept":"68d6bd27-37ff-4d7a-87a0-f5e0f9c8dcc0",
                "comment":"result-entry-form^result-date",
                "value":"2019-03-11T00:00:00.000+01:00",
                "order":"f9237ee3-9a7b-46ed-aab7-fff9303df636"
            },
            {
                "concept":"e9732df4-971d-4a9a-9129-e2e610552468",
                "comment":"result-entry-form^test-location-dropdown",
                "value":"3cee7fb4-26fe-102b-80cb-0017a47871b2",
                "order":"f9237ee3-9a7b-46ed-aab7-fff9303df636"
            },
            {
                "concept":"163436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                "comment":"result-entry-form^163436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                "order":"f9237ee3-9a7b-46ed-aab7-fff9303df636",
                "groupMembers": [
                    {
                        "concept":"73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "comment":"result-entry-form^163436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA^73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "value":"7",
                        "order":"f9237ee3-9a7b-46ed-aab7-fff9303df636"
                    }
                ]
            }
        ]
    }
  }


};
