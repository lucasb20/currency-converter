using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace Backend.Controllers;

[ApiController]
[Route("currency")]
public class CurrencyController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetCurrencyList(){

        HttpClient client = new();

        string? accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");

        string fixer_url = "http://data.fixer.io/api/latest" + "?access_key="+ accessKey;

        var request = await client.GetStringAsync(fixer_url);

        List<string> symbols = [];
        Dictionary<string, float> values = [];
        long timestamp = 0;

        using (JsonDocument document = JsonDocument.Parse(request))
        {
            JsonElement root = document.RootElement;
            timestamp = root.GetProperty("timestamp").GetInt64();
            JsonElement rates = root.GetProperty("rates");
            foreach(JsonProperty otherSymbol in rates.EnumerateObject()){
                symbols.Add(otherSymbol.Name);
                values.Add(otherSymbol.Name, (float) otherSymbol.Value.GetDouble());
            }
        }

        var json = new {
            timestamp = timestamp,
            symbols = symbols,
            values = values
        };

        return new JsonResult(json);
    }
}