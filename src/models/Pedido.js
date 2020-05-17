class Pedido{


    constructor(Ciudad__c,cliente__c,Direccion__c,Provincia__c , total__c,email){
        this.Status__c="Pendiente";
        this.Ciudad__c=Ciudad__c;
        this.cliente__c=cliente__c;
        this.email=email;
        this.Direccion__c=Direccion__c;
        this.Provincia__c=Provincia__c;
        this.total__c=total__c;
        this.date=null;
        this.articulos=[];
        this.Infocliente=[];

    }
/**title: String,
content: String,
date : {type:Date, default: Date.now},
imagen: String */
}

export default Pedido;