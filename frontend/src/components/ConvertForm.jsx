import React, { useEffect, useRef, useState } from "react"
import {dataSimulate} from "../data"

export const ConvertForm = () => {
    const [amount, setAmount] = useState(0)
    const refResult = useRef("Waiting request...")
    const [currencyBase, setCurrencyBase] = useState("")
    const [currencyTarget, setCurrencyTarget] = useState("")
    const requested = useRef(false)
    const [symbols, setSymbols] = useState([])
    const [rates, setRates] = useState({})

    useEffect(() => {
        //depois faço
    },[currencyBase, currencyTarget, amount])

    useEffect(() => {
        if (!(requested.current)) {
            const url = `http://localhost:5233/currency`

            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("data", data)
            })
            .catch(error => {
                console.log("error", error)
                const dataJson =  JSON.parse(dataSimulate())
                setSymbols(dataJson.symbols)
                setRates(dataJson.values)
            })

            requested.current = true
            return;
        }
    },[])

    return(
        <form>
            <div>
                <label htmlFor="num"> Amount:   </label>
                <input type="number" name="num" id="num" value={amount} onChange={e=>{
                    setAmount(e.target.value)
                }}/>
            </div>

            <div>
                <label htmlFor="currencybase">Currency Base:    </label>
                <select name="currencybase" id="currencybase" onChange={e => {
                    setCurrencyBase(e.target.value)
                }}>
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
                }}>
                    {symbols.map((symbol, index) => {
                        return(
                            <option key={index} value={symbol}>{symbol}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <p>Result: </p>
                <div className="output">{refResult.current}</div>
            </div>
        </form>    
    )
}