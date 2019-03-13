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
    labResultsEncounterType: {
      URL: '/openmrs/ws/rest/v1/systemsetting?v=custom:(value)&q=labworkflowowa.labResultsEncounterType',
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
  ORDERS: {
    URL: `/openmrs/ws/rest/v1/order?s=default&totalCount=true&sort=desc&status=active&orderTypes=52a447d3-a64a-11e3-9aeb-50e549534c5e&activatedOnOrAfterDate=${moment(endDate).format('YYYY-MM-DD')}&activatedOnOrBeforeDate=${moment(startDate).format('YYYY-MM-DD')}&v=full`,
    RESPONSE: {
      results: [
        {
          "uuid": "a76b47d6-b507-45d3-bf34-e8eb14b4864e",
          "orderNumber": "ORD-1",
          "accessionNumber": null,
          "patient": {
              "uuid": "0c9bbb90-c85d-4a13-b2e6-8fc59f999ca4",
              "display": "Y653VL - Test Patient 1",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/0c9bbb90-c85d-4a13-b2e6-8fc59f999ca4"
                  }
              ]
          },
          "concept": {
              "uuid": "3cecf068-26fe-102b-80cb-0017a47871b2",
              "display": "Ionogramme",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/3cecf068-26fe-102b-80cb-0017a47871b2"
                  }
              ]
          },
          "action": "NEW",
          "careSetting": {
              "uuid": "c365e560-c3ec-11e3-9c1a-0800200c9a66",
              "name": "Inpatient",
              "description": "In-patient care setting",
              "retired": false,
              "careSettingType": "INPATIENT",
              "display": "Inpatient",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66"
                  },
                  {
                      "rel": "full",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66?v=full"
                  }
              ],
              "resourceVersion": "1.10"
          },
          "previousOrder": null,
          "dateActivated": startDate.toISOString(),
          "scheduledDate": null,
          "dateStopped": null,
          "autoExpireDate": null,
          "encounter": {
              "uuid": "7a067b12-4a97-4bf1-84b7-f15ca308ad09",
              "display": "Test Order 14/09/2018",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/7a067b12-4a97-4bf1-84b7-f15ca308ad09"
                  }
              ]
          },
          "orderer": {
              "uuid": "0129d25f-b4cc-4d15-9296-dfec872f545d",
              "display": "MUND4 - Roland Henshaw",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/provider/0129d25f-b4cc-4d15-9296-dfec872f545d"
                  }
              ]
          },
          "orderReason": null,
          "orderReasonNonCoded": null,
          "orderType": {
              "uuid": "52a447d3-a64a-11e3-9aeb-50e549534c5e",
              "display": "Test Order",
              "name": "Test Order",
              "javaClassName": "org.openmrs.TestOrder",
              "retired": false,
              "description": "Order type for test orders",
              "conceptClasses": [],
              "parent": null,
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e"
                  },
                  {
                      "rel": "full",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/ordertype/52a447d3-a64a-11e3-9aeb-50e549534c5e?v=full"
                  }
              ],
              "resourceVersion": "1.10"
          },
          "urgency": "STAT",
          "instructions": null,
          "commentToFulfiller": null,
          "display": "Ionogramme",
          "auditInfo": {
              "creator": {
                  "uuid": "030215ed-7ee1-4e77-99b2-7f971daf7422",
                  "display": "rhenshaw",
                  "links": [
                      {
                          "rel": "self",
                          "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/user/030215ed-7ee1-4e77-99b2-7f971daf7422"
                      }
                  ]
              },
              "dateCreated": "2018-09-14T11:10:43.000-0400",
              "changedBy": null,
              "dateChanged": null
          },
          "specimenSource": null,
          "laterality": null,
          "clinicalHistory": null,
          "frequency": null,
          "numberOfRepeats": null,
          "links": [
              {
                  "rel": "self",
                  "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/order/a76b47d6-b507-45d3-bf34-e8eb14b4864e"
              }
          ],
          "type": "testorder",
          "resourceVersion": "1.10"
        },
        {
          "uuid": "b2172165-d9b1-4faa-95eb-fde8d1dc2b10",
          "orderNumber": "ORD-2",
          "accessionNumber": null,
          "patient": {
              "uuid": "test-patient-2-uuid",
              "display": "Y640L8 - Test Patient 2",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/patient/ee3e5f96-cbd8-4d81-96ff-7558149af4d5"
                  }
              ]
          },
          "concept": {
              "uuid": "73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              "display": "CEPHALEXIN",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/73087AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                  }
              ]
          },
          "action": "NEW",
          "careSetting": {
              "uuid": "6f0c9a92-6f24-11e3-af88-005056821db0",
              "display": "Outpatient",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/caresetting/6f0c9a92-6f24-11e3-af88-005056821db0"
                  }
              ]
          },
          "previousOrder": null,
          "dateActivated": "2018-09-10T10:13:45.000-0400",
          "scheduledDate": null,
          "dateStopped": null,
          "autoExpireDate": "2018-09-17T10:13:44.000-0400",
          "encounter": {
              "uuid": "8d06597a-4c85-409d-9877-990e54551ee6",
              "display": "Test Order 09/10/2018",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/encounter/8d06597a-4c85-409d-9877-990e54551ee6"
                  }
              ]
          },
          "orderer": {
              "uuid": "8df33b68-630d-460e-9c70-6f4681ce8b85",
              "display": "MLJ38 - Dominic Surrao",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/provider/8df33b68-630d-460e-9c70-6f4681ce8b85"
                  }
              ]
          },
          "orderReason": null,
          "orderReasonNonCoded": null,
          "orderType": {
              "uuid": "131168f4-15f5-102d-96e4-000c29c2a5d7",
              "display": "Drug Order",
              "name": "Drug Order",
              "javaClassName": "org.openmrs.DrugOrder",
              "retired": false,
              "description": "An order for a medication to be given to the patient",
              "conceptClasses": [],
              "parent": null,
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/ordertype/131168f4-15f5-102d-96e4-000c29c2a5d7"
                  },
                  {
                      "rel": "full",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/ordertype/131168f4-15f5-102d-96e4-000c29c2a5d7?v=full"
                  }
              ],
              "resourceVersion": "1.10"
          },
          "urgency": "ROUTINE",
          "instructions": null,
          "commentToFulfiller": null,
          "display": "(NEW) Cefalexin, 500 mg, capsule: 1.0 Capsule Oral Once a day 1 Weeks",
          "drug": {
              "uuid": "4c908591-3adf-4601-b61c-4faddffbee56",
              "display": "Cefalexin, 500 mg, capsule",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/drug/4c908591-3adf-4601-b61c-4faddffbee56"
                  }
              ]
          },
          "dosingType": "org.openmrs.SimpleDosingInstructions",
          "dose": 1,
          "doseUnits": {
              "uuid": "1608AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              "display": "Capsule",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/1608AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                  }
              ]
          },
          "frequency": {
              "uuid": "fb8068a0-7647-4aec-93d0-14658533dfdf",
              "display": "Once a day",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/orderfrequency/fb8068a0-7647-4aec-93d0-14658533dfdf"
                  }
              ]
          },
          "asNeeded": false,
          "asNeededCondition": null,
          "quantity": 7,
          "quantityUnits": {
              "uuid": "1608AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              "display": "Capsule",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/1608AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                  }
              ]
          },
          "numRefills": 0,
          "dosingInstructions": null,
          "duration": 1,
          "durationUnits": {
              "uuid": "3cd7091a-26fe-102b-80cb-0017a47871b2",
              "display": "Weeks",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/3cd7091a-26fe-102b-80cb-0017a47871b2"
                  }
              ]
          },
          "route": {
              "uuid": "46aaaca8-1f21-410a-aac9-67bfcc1fd577",
              "display": "Oral",
              "links": [
                  {
                      "rel": "self",
                      "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/concept/46aaaca8-1f21-410a-aac9-67bfcc1fd577"
                  }
              ]
          },
          "brandName": null,
          "dispenseAsWritten": false,
          "drugNonCoded": null,
          "links": [
              {
                  "rel": "self",
                  "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/order/b2172165-d9b1-4faa-95eb-fde8d1dc2b10"
              },
              {
                  "rel": "full",
                  "uri": "https://humci.pih-emr.org:443/mirebalais/ws/rest/v1/order/b2172165-d9b1-4faa-95eb-fde8d1dc2b10?v=full"
              }
          ],
          "type": "drugorder",
          "resourceVersion": "1.10"
        },
        {
          "uuid": "5953b6c0-aba4-48cb-a7a6-cb27c6cfa3c1",
          "orderNumber": "ORD-3",
          "accessionNumber": null,
          "patient": {
              "uuid": "test-patient-3-uuid",
              "display": "Y2EAA3 - Test Patient 3",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/009683b6-2b75-4bca-ac31-111842fdc4d2"
                  }
              ]
          },
          "concept": {
              "uuid": "163436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
              "display": "Panel coagulation",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/163436AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                  }
              ]
          },
          "action": "NEW",
          "careSetting": {
              "uuid": "c365e560-c3ec-11e3-9c1a-0800200c9a66",
              "name": "Inpatient",
              "description": "In-patient care setting",
              "retired": false,
              "careSettingType": "INPATIENT",
              "display": "Inpatient",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66"
                  },
                  {
                      "rel": "full",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66?v=full"
                  }
              ],
              "resourceVersion": "1.10"
          },
          "previousOrder": null,
          "dateActivated": "2018-08-30T17:57:58.000+0100",
          "scheduledDate": null,
          "dateStopped": null,
          "autoExpireDate": null,
          "encounter": {
              "uuid": "4ef110d7-ea75-491f-8cfd-0a194a009586",
              "display": "Test Order 30/08/2018",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/4ef110d7-ea75-491f-8cfd-0a194a009586"
                  }
              ]
          },
          "orderer": {
              "uuid": "4a854ae9-5fd9-4aa8-80ef-9074ff7b6fb4",
              "display": "MAADH - rowland henshaw",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/provider/4a854ae9-5fd9-4aa8-80ef-9074ff7b6fb4"
                  }
              ]
          },
          "orderReason": null,
          "orderReasonNonCoded": null,
          "urgency": "ROUTINE",
          "instructions": null,
          "commentToFulfiller": null,
          "display": "Panel coagulation",
          "auditInfo": {
              "creator": {
                  "uuid": "e7ff2a99-a819-4d9d-8b07-9778c5b164a8",
                  "display": "sudo",
                  "links": [
                      {
                          "rel": "self",
                          "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/e7ff2a99-a819-4d9d-8b07-9778c5b164a8"
                      }
                  ]
              },
              "dateCreated": "2018-08-30T17:57:58.000+0100",
              "changedBy": null,
              "dateChanged": null
          },
          "specimenSource": null,
          "laterality": null,
          "clinicalHistory": null,
          "frequency": null,
          "numberOfRepeats": null,
          "links": [
              {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/order/5953b6c0-aba4-48cb-a7a6-cb27c6cfa3c1"
              }
          ],
          "type": "testorder",
          "resourceVersion": "1.10"
        },
        {
          "uuid": "69ae3d2f-3ed2-46ff-9209-abc333e28eff",
          "orderNumber": "ORD-4",
          "accessionNumber": null,
          "patient": {
              "uuid": "test-patient-4-uuid",
              "display": "Y2A7LR - Test Patient 4",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/patient/49287a9d-256b-4f52-9a92-ec61f9166f25"
                  }
              ]
          },
          "concept": {
              "uuid": "3ccf4090-26fe-102b-80cb-0017a47871b2",
              "display": "Groupe sanguin",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/concept/3ccf4090-26fe-102b-80cb-0017a47871b2"
                  }
              ]
          },
          "action": "NEW",
          "careSetting": {
              "uuid": "c365e560-c3ec-11e3-9c1a-0800200c9a66",
              "name": "Inpatient",
              "description": "In-patient care setting",
              "retired": false,
              "careSettingType": "INPATIENT",
              "display": "Inpatient",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66"
                  },
                  {
                      "rel": "full",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/caresetting/c365e560-c3ec-11e3-9c1a-0800200c9a66?v=full"
                  }
              ],
              "resourceVersion": "1.10"
          },
          "previousOrder": null,
          "dateActivated": "2018-08-30T17:34:19.000+0100",
          "scheduledDate": null,
          "dateStopped": null,
          "autoExpireDate": null,
          "encounter": {
              "uuid": "dc1132f8-bc27-4f19-adfa-78297cad71af",
              "display": "Test Order 30/08/2018",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/encounter/dc1132f8-bc27-4f19-adfa-78297cad71af"
                  }
              ]
          },
          "orderer": {
              "uuid": "4a854ae9-5fd9-4aa8-80ef-9074ff7b6fb4",
              "display": "MAADH - rowland henshaw",
              "links": [
                  {
                      "rel": "self",
                      "uri": "http://localhost:8080/openmrs/ws/rest/v1/provider/4a854ae9-5fd9-4aa8-80ef-9074ff7b6fb4"
                  }
              ]
          },
          "orderReason": null,
          "orderReasonNonCoded": null,
          "urgency": "ROUTINE",
          "instructions": null,
          "commentToFulfiller": null,
          "display": "Groupe sanguin",
          "auditInfo": {
              "creator": {
                  "uuid": "e7ff2a99-a819-4d9d-8b07-9778c5b164a8",
                  "display": "sudo",
                  "links": [
                      {
                          "rel": "self",
                          "uri": "http://localhost:8080/openmrs/ws/rest/v1/user/e7ff2a99-a819-4d9d-8b07-9778c5b164a8"
                      }
                  ]
              },
              "dateCreated": "2018-08-30T17:34:19.000+0100",
              "changedBy": null,
              "dateChanged": null
          },
          "specimenSource": null,
          "laterality": null,
          "clinicalHistory": null,
          "frequency": null,
          "numberOfRepeats": null,
          "links": [
              {
                  "rel": "self",
                  "uri": "http://localhost:8080/openmrs/ws/rest/v1/order/69ae3d2f-3ed2-46ff-9209-abc333e28eff"
              }
          ],
          "type": "testorder",
          "resourceVersion": "1.10"
      },
      ]
    }
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
    }
  ]

};