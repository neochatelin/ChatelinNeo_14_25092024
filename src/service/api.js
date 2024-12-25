export const api = {
    getStates:(setter)=>{
        return fetch('/data/state.json').then((data)=>{
            data.json().then((value)=>{
                setter(value.option);
            })
        })
    },
    getDepartements:(setter)=>{
        return fetch('/data/department.json').then((data)=>{
            data.json().then((value)=>{
                setter(value.option);
            })
        })
    },
    getForm:(setter)=>{
        return fetch('/data/form.json').then((data)=>{
            data.json().then((value)=>{
                setter(value);
            })
        })
    }
}