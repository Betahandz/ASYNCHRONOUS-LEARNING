// SELECTED ELEMENTS OR TAGS
const menu_btn = document.querySelector(".menu_btn");
const close_menu = document.querySelector(".close_menu_btn")
const navigation = document.querySelector(".navigation");
const ordinates = navigation.querySelector(".co-ordinates");


// SETTING UP MY PROMISE
const order = time => {
    return new Promise((resolve, reject) => {
        if(display) {
            setTimeout(() => {
              resolve();  
            }, time);
        }else {
            reject();
        }
    })
}

const disorder = (time, work) => {
    return new Promise((resolve, reject) => {
        if(!display) {
            setTimeout(() => {
                resolve( work() );
            }, time);
        }else {
            reject();
        }
    })
}

// OPTIONS OR WHAT I CALL CONDITIONS
let display = true;

let trans_delay = [0.3, 0.5, 0.7];

// ADD EVENT LISTENERS
menu_btn.addEventListener("click", open_menu);
close_menu.addEventListener("click", hide_menu);




// ASYNCHRONOUS FUNCTIONS
function hide_menu() {
    disorder(100, () => {
        showList();
    } )
    .then(() => {
        return disorder(1000, () => {
            ordinates.classList.remove("shownav");
        })
    })
    .then(() => {
        disorder(200, () => {
            navigation.classList.remove("shownav");
        })
        display = true;
    })
    
    // display = true;
}

async function open_menu() {
    try{
        await order(100)
        navigation.classList.add("shownav");
        
        await order(50)
        ordinates.classList.add("shownav");

        await order(100);
        showList("shownav");
        display = false;

    }
    catch(error){
        return;
    }
}

function showList() {
    let num;
    for(let i = 0; i < trans_delay.length; i++) {
        num = Math.floor(Math.random() * trans_delay.length);
        tmp = trans_delay[i];
        trans_delay[i] = trans_delay[num];
        trans_delay[num] = tmp;
    }// getting random seconds for the transition delay.

    num = 0;
    let list = [...ordinates.querySelectorAll(".point")];
    list.forEach(li => {
        if(display) {
            li.classList.add("shownav");
        }else {
            li.classList.remove("shownav")
        }
        li.style.transitionDelay = trans_delay[num] + "s";
        num++;
    })
}

