import { getConceptShortName } from '../../app/js/utils/helpers';

describe("getConceptShortName", () => {

    // Some mock names for our concept
    const frShortName = {
        voided: false,
        locale: 'fr',
        localePreferred: false,
        conceptNameType: "SHORT",
        name: "RdY",
    }
    const frLocalePreferred = {
        voided: false,
        locale: 'fr',
        localePreferred: true,
        conceptNameType: null,
        name: "Rasage de Yak"
    }
    const frVoided = {
        voided: true,
        locale: 'fr',
        localePreferred: true,
        conceptNameType: "FULLY_SPECIFIED",
        name: "Shave de Yak"
    }
    const frOther = {
        voided: false,
        locale: 'fr',
        localePreferred: false,
        conceptNameType: "FULLY_SPECIFIED",
        name: "Passer trop de temps"
    }
    const enShortName = {
        voided: false,
        locale: 'en',
        localePreferred: false,
        conceptNameType: "SHORT",
        name: "y-s",
    }
    const enLocalePreferred = {
        voided: false,
        locale: 'en',
        localePreferred: true,
        conceptNameType: null,
        name: "Yak Shave",
    }

    it("returns short name in preferred locale if available", () => {
        const concept = {
            names: [
                enLocalePreferred,
                enShortName,
                frLocalePreferred,
                frShortName,
                frVoided,
                frOther
            ],
            display: "Yak shave"
        }
        const result = getConceptShortName(concept, "fr_HT");
        expect(result).toBe(frShortName.name);
    });

    it("returns preferred name in preferred locale if short name in preferred locale not available", () => {
        const concept = {
            names: [
                enLocalePreferred,
                enShortName,
                frLocalePreferred,
                frVoided,
                frOther
            ],
            display: "Yak shave"
        }
        const result = getConceptShortName(concept, "fr_HT");
        expect(result).toBe(frLocalePreferred.name);
    });

    it("returns display name if nothing else is available", () => {
        const concept = {
            names: [
                enLocalePreferred,
                frVoided
            ],
            display: "Yak shave"
        }
        const result = getConceptShortName(concept, "fr_HT");
        expect(result).toBe("Yak shave");
    });

    it("accepts short locale name parameter", () => {
        const concept = {
            names: [
                enShortName,
                frShortName,
            ],
            display: "Yak shave"
        }
        const result = getConceptShortName(concept, "fr");
        expect(result).toBe(frShortName.name);
    });

    it("returns null if the concept is null or undefined or missing the expected properties", () => {
        expect(getConceptShortName(null, 'en')).toBeNull();
        expect(getConceptShortName(undefined, 'en')).toBeNull();
        expect(getConceptShortName({}, 'en')).toBeNull();
    })

})
