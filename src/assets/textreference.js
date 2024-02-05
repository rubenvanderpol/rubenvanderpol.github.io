class TextReference {
    Add() {

    }
}

export class RefText {

    /** @type {TextReference[]} */
    references;
    
    /** @type {number} */
    id;

    /** @type {string} */
    plainText;

    /** @type {string} */
    title;

    /**
     * @param {number} id
     */
    constructor(id){
        this.id = id;
        this.plainText = localStorage.getItem('RefText') ?? 
            'new text';
    }

    /**
     * add a reference to the current text
     * @param {string} refText
     * @param {number} start
     * @param {number} end
     */
    addReference(refText, start, end) {
        let ref = new TextReference();
        this.references.push(ref);
    }

    /**
     * @param {string} text
     */
    saveText(text) {
        this.plainText = text;
        localStorage.setItem('RefText', text);
    }

    getPlainText() {

    }


}