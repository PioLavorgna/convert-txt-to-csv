function loadFileFormatTxT() {

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('fileinput_txt');
    if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        document.getElementById("spinner_convert").style.display = "block";
        setTimeout(function() {
            file = input.files[0];
            fr = new FileReader();
            fr.onload = receivedText;
            fr.readAsText(file);
            document.getElementById("spinner_convert").style.display = "none";
        }, 2000);
    }

    function receivedText(e) {

        let upLoadTxt = e.target.result;
        let upLoadTxt_UPDT = upLoadTxt.split('\r\n');

        console.log(`upLoadTxt_UPDT_array: ${upLoadTxt_UPDT}`);

        let countNumberArgomento = 1;

        let row = new Row({});
        let countArgomento = 1;
        let coutAnsware = 1;
        let arrayRowObjects = [];
        let ckBlank = false;

        let txtHeader = '', txtBody = '';

        upLoadTxt_UPDT.forEach((cell,number) => {
            if( cell.length !== 0 ){

                if( ckBlank ){

                    if(cell.includes('*')){
                        row[`risposta${coutAnsware}`] = cell.replace('*','');
                        row[`rispostaEsatta`] = 
                            ( row[`rispostaEsatta`] !== undefined ? 
                                `${row['rispostaEsatta']}-${(coutAnsware)}` : 
                                `${coutAnsware}` 
                            );
                    }else{
                        row[`risposta${coutAnsware}`] = cell;
                    }
                    coutAnsware++;
                }else if ( cell.includes('- ') ){

                    if( row[`nomeDomanda`] !== undefined && number !== 0 ){
                        arrayRowObjects.push(row);
                        row = new Row({});
                    }

                    //modifica incremento argomento
                    if((countNumberArgomento)%30 === 0){
                        countArgomento += 1;
                        countNumberArgomento = 1;
                    }else{
                        countNumberArgomento++;
                    }

                    row[`nomeDomanda`] = cell.replace('- ','');
                    row[`countArgomento`] = `E${countArgomento}`;

                    coutAnsware = 1;
                    
                }
                
            }else{
                ckBlank = ckBlank ? false : true;
            }
            
        });

        let header = new Header();
        Object.entries(header).map((item,number) => {
            txtHeader += ( number === 0 ? item[1] : `;;${item[1]}` );
            console.log(item[1])
        })

        arrayRowObjects.forEach((cell,numberRow) => {

            Object.entries(cell).map((item,number) => {

                if(number !== 0 && number === 1){
                    txtBody += ( item[1] === undefined ? `;;` : `;;${item[1]}` );
                }else{
                    txtBody += ( number === 0 ? item[1] : ( item[1] === undefined ? `;;` : `;;${item[1]}` ) );
                }

            });

            txtBody += ( ( numberRow >= (arrayRowObjects.length - 1) ? `` : `\n`) );

        });

        download(
            `CSV-${document.getElementById('fileinput_txt').value}`, 
            `${txtHeader}\n${txtBody}`
        );
    }

    function download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }
}