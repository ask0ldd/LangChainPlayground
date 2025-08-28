async function add({ a, b } : {a : number, b : number}) : Promise<number>
{
    return a + b
}

export default add