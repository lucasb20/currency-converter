import React, { useEffect, useRef , useState } from "react"

export const ConvertForm = () => {
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)
    const [currencyBase, setCurrencyBase] = useState("USD")
    const [currencyTarget, setCurrencyTarget] = useState("BRL")
    const requested = useRef(false)
    const [symbols, setSymbols] = useState([])
    const [rates, setRates] = useState({})
    const [timestemp, setTimestemp] = useState(null)
    
    function calculateConvert(amount = 0, currencyBase = "BRL", currencyTarget = "USD"){
        return Math.round(amount * rates[currencyTarget] / rates[currencyBase]*10000)/10000
    }

    useEffect(() => {
        const valueRound = calculateConvert(amount, currencyBase, currencyTarget)
        if (!(isNaN(valueRound))) {
            setResult(valueRound)
            return;
        }
    })

    useEffect(() => {
        if (!(requested.current)) {
            const url = `http://localhost:5233/currency`

            fetch(url)
            .then(response => response.json())
            .then(data => {
                setSymbols(data.symbols)
                setRates(data.values)
                const rateTime = new Date(data.timestamp)
                setTimestemp(rateTime.toLocaleString())
            })
            .catch(error => {
                console.log("error", error)
            })

            requested.current = true
            return;
        }
    },[])


    const swapCurrency = () => {
        const currencyBaseTemp = currencyBase
        setAmount(result)
        setCurrencyBase(currencyTarget)
        setCurrencyTarget(currencyBaseTemp)
    }

    return(
        <form>
            <div>
                <label htmlFor="num"> Amount:   </label>
                <input type="number" name="num" id="num" value={amount} onChange={e=>{
                    setAmount(Number(e.target.value))
                }}/>
            </div>

            <div>
                <label htmlFor="currencybase">Currency Base:    </label>
                <select name="currencybase" id="currencybase" onChange={e => {
                    setCurrencyBase(e.target.value)
                }} value={currencyBase} >
                    {symbols.map((symbol, index) => {
                        return(
                            <option key={index} value={symbol}>{symbol}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="currencytarget">Corrency Target:    </label>
                <select name="currencytarget" id="currencytarget" onChange={e => {
                    setCurrencyTarget(e.target.value)
                }} value={currencyTarget} >
                    {symbols.map((symbol, index) => {
                        return(
                            <option key={index} value={symbol}>{symbol}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <button type="button" onClick={swapCurrency}>Swap Currency</button>
            </div>

            <div>
                <p className="output" style={{textAlign:"center"}}>Result: {currencyTarget} {result}</p>
            </div>
                <div>
                    <p>{currencyBase} 1 = {currencyTarget} {calculateConvert(1, currencyBase, currencyTarget)}</p>
                    <p>Timestamp: {timestemp}</p>
                </div>
        </form>    
    )
}