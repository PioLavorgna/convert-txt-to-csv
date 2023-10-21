class Header{
    constructor()
    {
        this.nomeDomanda = `NomeDomanda`;
        this.risposta1 = `Risposta1`;
        this.risposta2 = `Risposta2`;
        this.risposta3 = `Risposta3`;
        this.risposta4 = `Risposta4`;
        this.risposta5 = `Risposta5`;
        this.countArgomento = `Argomento`;
        this.rispostaEsatta = `Risposta Esatta`;
    }
}
class Row {

    constructor(
        {
            nomeDomanda,
            risposta1,
            risposta2,
            risposta3,
            risposta4,
            risposta5,
            countArgomento,
            rispostaEsatta
        }
    ){
        this.nomeDomanda = nomeDomanda;
        this.risposta1 = risposta1;
        this.risposta2 = risposta2;
        this.risposta3 = risposta3;
        this.risposta4 = risposta4;
        this.risposta5 = risposta5;
        this.countArgomento = countArgomento;
        this.rispostaEsatta = rispostaEsatta;
    }

    update(){

    }

}