

export class referenceRepository
{
    /**
     * @type {string[]}
     */
    referenceNames = [];

    constructor()
    {
        this.referenceNames = this.getAllReferenceNames();
    }

    /**
     * @returns { string[] }
     */
    getAllReferenceNames()
    {
        let storageName = "textNamesStorage";
        let item = localStorage.getItem(storageName);
        if(item === null)
        {
            localStorage.setItem("textNamesStorage", JSON.stringify([]));
        }

        /** @type {string[]} */
        let result = JSON.parse(item);
        return result;
    }

    saveReferences()
    {
        localStorage.setItem("textNamesStorage", JSON.stringify(this.referenceNames));
    }

    /**
     * @param {string} name
     * @returns { referenceDto }
     */
    getReference(name)
    {
        let item = localStorage.getItem(name);

        /** @type {referenceDto} */
        let reference = JSON.parse(item);
        return reference;
    }

    /**
     * @param {string} title
     * @param {string} html
     * @returns { referenceDto }
     */
    addReference(title, html)
    {
        let reference = new referenceDto();
        reference.title = title;
        reference.html = html;

        this.referenceNames.push(reference.title);
        this.saveReferences();

        localStorage.setItem(reference.title, JSON.stringify(reference));
      
        return reference;
    }

    /**
     * @param {referenceDto} reference
     */
    editReference(reference)
    {
        localStorage.setItem(reference.title, JSON.stringify(reference));
    }
}

export class referenceDto {
     /** 
    * @type { string }
    */
   title;

     /** 
    * @type { string }
    */
   html;

    constructor () {}
  }