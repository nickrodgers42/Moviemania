import { PersonSummary } from "./PersonSummary";

/*
 * Class to describe a single Movie Summary
 */

export class PersonDetail extends PersonSummary {
    constructor(id, name, popularity, profilePath, birthDate, deathDate, placeOfBirth, biography) {
        super(id, name, popularity, profilePath);
        this.birthDate = birthDate;
        this.dethDate = deathDate;
        this.placeOfBirth = placeOfBirth;
        this.biography = biography;
    }
}
