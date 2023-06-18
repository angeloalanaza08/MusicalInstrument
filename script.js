class Note{
    constructor(note,pitch){  
        this.name = note;
        this.pitch = pitch;
    }

    static nameList = ["do", "re", "mi", "fa", "sol", "la", "ti"];
    
    static playTune(ins, note){ 
        let j = 0;       
        for(let i = 0; i < note.length; i++){ 
            j = j + 400;
            setTimeout(function(){
                if (ins == 1){
                    let audio = new Audio("assets/piano/do.mp3");
                    audio.src = `assets/piano/${note[i].name}.mp3`;
                    audio.play(); 
                }
                else if (ins == 2){
                    let audio = new Audio("assets/xylo/do.mp3");
                    audio.src = `assets/xylo/${note[i].name}.mp3`;
                    audio.play(); 
                }     
                
            }, j);   
        }
    }

    showInfo(){
        console.log(`Note: ${this.name} | Pitch: ${this.pitch}`); 
    }  
}

class Instrument{
    constructor(brand, model, color){
        this.record = [];
        this.brand = brand;
        this.model = model;
        this.color = color;
    }

    addNote(name, pitch){
        let note = new Note(name, pitch);
        this.record.push(note);
    }

    removeLastNote(){
        this.record.pop();
    }

    changeNote(index, note, pitch){
        this.record[index] = new Note(note, pitch);
    }

    shuffleRecord(newnote){
        this.record = newnote;
        var m = newnote.length, t, i;

        while (m) {
            i = Math.floor(Math.random() * m--);

            t = newnote[m];
            newnote[m] = newnote[i];
            newnote[i] = t;
        }
        console.log(newnote);
        return newnote;
    }

    autoCompose(num){
        this.record = [];
        for(let a = 0; a < num; a++){
            let notes = Note.nameList;
            let index = Math.floor(Math.random() * 7);
            let pitch = Math.floor(Math.random() * 6) + 1;
            let newnote = new Note(notes[index], pitch);
            this.record.push(newnote);          
        }         
        return this.record;  
    }
    
    logInfo(){
        console.log(this.record); 
    }

    showInsInfo(ins, brand, model, color){
        console.log(`${ins} \nBrand: ${brand} \nModel: ${model} \nColor: ${color}`);
    }
    
}

class Piano extends Instrument{
    constructor(brand, model, color){
        super(brand, model, color);
    }  
}

class Xylophone extends Instrument{
    constructor(brand, model, color){
        super(brand, model, color);
    }
}


document.getElementById("compose").addEventListener("click", function(){
    let ins = 1; //For piano
    let num = document.getElementById("num").value;
    if (num > 0){
        
        let piano = new Piano();
        piano.showInsInfo("PIANO", "Toyota", "Wigo", "white");

        let note = new Instrument();
        let newnote = note.autoCompose(num);
        console.log(newnote);
        Note.playTune(ins, newnote);

        document.getElementById("shuffle").addEventListener("click", function(){
            let instrument = new Instrument();
            instrument.shuffleRecord(newnote);
            Note.playTune(ins, newnote);
        });
    }  
});

document.getElementById("compose_xy").addEventListener("click", function(){
    let ins = 2; //For xylophone
    let num = document.getElementById("numxy").value;
    if (num > 0){
        let xylo = new Xylophone();
        xylo.showInsInfo("XYLOPHONE", "Mitsubishi", "Montero", "black");
        let note = new Instrument();
        let newnote = note.autoCompose(num);
        console.log(newnote);
        Note.playTune(ins, newnote);

        document.getElementById("shuffle_xy").addEventListener("click", function(){
            let instrument = new Instrument();
            instrument.shuffleRecord(newnote);
            Note.playTune(ins, newnote);
        });
    }  
});

const pkeys = document.querySelectorAll(".pkeys");
let audio = new Audio("assets/piano/do.mp3");

let playTune = function(note, pitch){
    audio.src = `assets/piano/${note}.mp3`;
    audio.play();
    console.log(`Note: ${note} | Pitch: ${pitch}`);
}

for(let i = 0; i < pkeys.length; i++){
    pitch = 1; 
    pkeys[i].addEventListener("click", function(){
        playTune(pkeys[i].id, pitch);
    })
}

const xkeys = document.querySelectorAll(".xkeys");
let audioxy = new Audio("assets/xylo/do.mp3");

let playTunexy = function(note, pitch){
    audioxy.src = `assets/xylo/${note}.mp3`;
    audioxy.play();
    console.log(`Note: ${note} | Pitch: ${pitch}`);
}

for(let i = 0; i < xkeys.length; i++){
    pitch = 1; 
    xkeys[i].addEventListener("click", function(){
        playTunexy(xkeys[i].id, pitch);
    })
}