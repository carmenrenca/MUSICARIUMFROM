class Article{


    constructor(Name,precio,cantidad,descripcion, unidad, imagen,categoria){
        this.Name=Name;
        this.Precio__c=precio;
        this.Cantidad__c=cantidad;
        this.Descripcion__c=descripcion;
        this.unidad=unidad;
        this.imagen=imagen;
        this.categoria=categoria;
        this.date=null;
    }
/**title: String,
content: String,
date : {type:Date, default: Date.now},
imagen: String */
}

export default Article;