import { ireferenceRepository, referenceRepository } from "./Infrastructure/referenceRepository";

export class Services {
    static ireferenceRepository = new referenceRepository();

    /**
     * @returns { ireferenceRepository }
     */
    static getReferenceRepos() { return Services.ireferenceRepository };
}