using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend.Controllers;

[ApiController]
[Route("currency")]
public class CurrencyController : ControllerBase
{
    [HttpGet("flags")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCurrencyList(){

        HttpClient client = new();

        string? accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");

        string fixer_url = "http://data.fixer.io/api/latest" + "?access_key="+ accessKey;

        var request = await client.GetStringAsync(fixer_url);

        List<string> symbols = [];

        using (JsonDocument document = JsonDocument.Parse(request))
        {
            JsonElement root = document.RootElement;
            JsonElement baseSymbol = root.GetProperty("base");
            symbols.Add(baseSymbol.ToString());
            JsonElement rates = root.GetProperty("rates");
            foreach(JsonProperty otherSymbol in rates.EnumerateObject()){
                symbols.Add(otherSymbol.Name);
            }
        }

        var json = new {
            symbols = symbols
        };

        return new JsonResult(json);
    }

    [HttpPost("convert")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetConvert([FromBody] JsonElement data){
         if (data.TryGetProperty("source", out var source))
            {
                HttpClient client = new();

                string? accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");

                string fixer_url = "http://data.fixer.io/api/latest" + "?access_key="+ accessKey+"&base="+source.ToString();

                var request = await client.GetStringAsync(fixer_url);

                using (JsonDocument document = JsonDocument.Parse(request))
                {
                    JsonElement root = document.RootElement;
                    JsonElement rates = root.GetProperty("rates");
                    return new JsonResult(rates);
                }
            }
            else
            {
                return BadRequest("O JSON deve conter as chaves 'source' e 'destiny'.");
            }
    }
}