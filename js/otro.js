const fetchData = async () =>{
    try{
        const res = await fetch ('data.json')
        const data = await res.json()
        printCards(data)
    } catch (error) {
        console.log(error)
    }
}



const printCards = data =>{
    console.log(data)
}