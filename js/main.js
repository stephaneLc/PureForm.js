function floatingLabelsOnInput(){
  
    document.querySelectorAll("input").forEach( input => {

        if(input.type !== "radio" && input.type !=="checkbox"){

            if(input.value !== ''){
                input.nextElementSibling.classList.add("active");

            }else{
                input.nextElementSibling.classList.remove("active");

            }

            input.addEventListener("input", () =>{
                if(input.value !== ''){
                    input.nextElementSibling.classList.add("active");

                }else{
                    input.nextElementSibling.classList.remove("active");

                }

            });

        }

    });

}

function optionSelected(){

    document.querySelectorAll("select").forEach(select => {

        if(select.value !== ''){
            console.log('a un option');
            select.classList.add("active");
        }else{
            console.log('pas select');
            select.classList.remove("active");
        }

        select.addEventListener("change", () =>{

            if(select.value !== ''){
                console.log('a un option');
                select.classList.add("active");
            }else{
                console.log('pas select');
                select.classList.remove("active");
            }

        });

    });

}

floatingLabelsOnInput();
optionSelected();

