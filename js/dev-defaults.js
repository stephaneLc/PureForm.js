const valueDefaults = {
    firstName : 'Toto',
    name: 'Le Magicien',
    email: 'totoLeMagicien@exemple.com',
    phoneNumber: '514-555-1234',
    experience: 'intermediaire',
    availability : ['partTime'],
    skill : ['php','javascript'],
    message: 'Un message par défault pour les tests'
}

//console.log('valueDefaults', valueDefaults);

function fillFormAuto(){

    Object.entries(valueDefaults).forEach(([name,value]) =>{
        //console.log('name', name);
        //console.log('value', value);

        const input = document.querySelector(`[name="${name}"]`);
        //console.log('input', input);
        if(input){
            
            if(input.type == 'radio' || input.type ==  'checkbox'){
                //console.log('entre radio checkbox');
                const options = Array.isArray(value) ? value : [value];

                options.forEach(value =>{
                    const option = document.querySelector(`[name="${name}"][value="${value}"]`);
                    //console.log('options', options);
                        if(option){
                            option.checked = true;
                        }
                });
                
            }else{
                //console.log('default ');
                input.value = value;
            }
        }
        
    });
}

setTimeout(() => {
    fillFormAuto();
    floatingLabelsOnInput();
}, 500);

