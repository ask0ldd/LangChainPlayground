async function multiply({ a, b } : {a : number, b : number}) : Promise<number>
{
    return a * b
}

export default multiply