export const loadInputsEvents = () => {
    document.body.addEventListener("DOMNodeInserted", (e:Event) => {
        // e.target
        if (e.target instanceof HTMLInputElement){
            addEvents(e.target);
        }

        if (e.target instanceof HTMLElement){
            let inputs = e.target.querySelectorAll("input");
            inputs.forEach(elementInput => {
                addEvents(elementInput);
            });
        }
    });
}


const addEvents = (e:HTMLInputElement):void => {
    if (e.classList.contains('letter')){
        e.addEventListener("keyup" , (e) => letterKeyup((e as KeyboardEventInput)));
    }
}

interface KeyboardEventInput extends KeyboardEvent {
    target:HTMLInputElement
}

const onlyNumbers = (e:Event): void => {

}


const letterKeyup = (e:KeyboardEventInput): void => {
    if (e.target.value.match(/^[a-z]/)){
        e.target.value = e.target.value.replace(/^[a-z]/, (char:string) => char.toUpperCase());
    }
}

