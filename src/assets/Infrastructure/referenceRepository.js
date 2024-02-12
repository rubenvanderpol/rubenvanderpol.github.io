import { writable } from 'svelte/store';

/**
 * @interface
 */
export function ireferenceRepository() {
 
    /**
     *   @abstract
     * @type {referenceDto[]}
     */
    this.references = [];

    /**
     * @abstract
     * @type {import('svelte/store').Writable<referenceDto[]>}
     */
    this.readableReferences;
    
     /**
    * @abstract
     */
     this.saveReferences = function () { };

      /**
    * @abstract
    * @param {string} name
     * @returns { referenceDto }
     */
      this.getReference = function (name) { return new referenceDto(); };

       /**
        * @abstract
     * @param {string} title
     * @param {string} html
     * @returns { referenceDto }
     */
    this.addReference = function (title, html) { return new referenceDto(); };


    /**
     *  @abstract
     * @param {referenceDto} reference
     */
    this.editReference = function (reference) {};

      /**
     *  @abstract
     * @param {referenceDto} reference
     */
      this.deleteReference = function (reference) {};
}

/** @implements {ireferenceRepository} */
export class referenceRepository {

    /**
     * @type {referenceDto[]}
     */
    references = [];

    /**
     * @type {string}
     */
    currentProject = "textNamesStorage";

    /**
     * @type {import('svelte/store').Writable<referenceDto[]>}
     */
    readableReferences;

    constructor() {
        this.loadAllReferences();
    }

    loadAllReferences() {
        let storageName = this.currentProject;
        let item = localStorage.getItem(storageName);
        if (item === null) {
            item = JSON.stringify([]);
            localStorage.setItem(this.currentProject, item);
        }

        /** @type {string[]} */
        let resultIds = JSON.parse(item);
        let t = this;
        resultIds.forEach(id => {
            t.references.push(t.getReference(id));
        });

        this.readableReferences = writable(this.references);
    }

    saveReferences() {
        localStorage.setItem(this.currentProject, JSON.stringify(this.references.map(a => a.id)));
    }

    /**
     * @param {string} id
     * @returns { referenceDto }
     */
    getReference(id) {
        let item = localStorage.getItem(id);

        /** @type {referenceDto} */
        let reference = JSON.parse(item);
        return reference;
    }

    /**
     * @param {string} title
     * @param {string} html
     * @returns { referenceDto }
     */
    addReference(title, html) {
        let reference = new referenceDto();

        reference.id = crypto.randomUUID();
        reference.title = title;
        reference.html = html;
        this.references.push(reference);
        this.saveReferences();
        localStorage.setItem(reference.id, JSON.stringify(reference));

        this.readableReferences.set(this.references);
        // this.readableReferences.update(old =>  [...old, reference]);        
        return reference;
    }

    /**
     * @param {referenceDto} reference
     */
    editReference(reference) {
        localStorage.setItem(reference.id, JSON.stringify(reference));
        this.readableReferences.set(this.references);
    }

    /**
     * @param {referenceDto} reference
     */
    deleteReference(reference) {
        this.references = this.references.filter(a => a.id !== reference.id);
        this.saveReferences();
        localStorage.removeItem(reference.id);
        this.readableReferences.set(this.references);
    }

}

export class referenceDto {

       /** 
   * @type { string }
   */
       id;

    /** 
   * @type { string }
   */
    title;

    /** 
   * @type { string }
   */
    html;
}