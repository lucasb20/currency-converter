import React from "react"

export const ConvertForm = () => {
    return(
        <form>
            <div>
                <label htmlFor="num"> Valor em questão: </label>
                <input type="number" name="num" id="num" value={0} />
            </div>

            <div>
                <label htmlFor="currencybase">Currency Base:    </label>
                <select name="currencybase" id="currencybase">
                    <option value="BRL">BRL</option>
                    <option value="BRL2">BRL2</option>
                    <option value="BRL3">BRL3</option>
                </select>
            </div>

            <div>
                <label htmlFor="currencytarget">Corrency Target:    </label>
                <select name="currencytarget" id="currencytarget">
                    <option value="EUR">EUR</option>
                    <option value="EUR2">EUR2</option>
                    <option value="EUR3">EUR3</option>
                </select>
            </div>

            <div>
                <p>Result: </p>
                <div className="output">Waiting request...</div>
            </div>
        </form>    
    )
}