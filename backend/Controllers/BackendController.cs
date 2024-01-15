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
    public async Task<IActionResult> GetCurrency(){

        HttpClient client = new();

        string? accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");

        string fixer_url = "http://data.fixer.io/api/latest" + "?access_key="+ accessKey;

        var request = await client.GetStringAsync(fixer_url);

        List<string> symbols = [];

        using (JsonDocument document = JsonDocument.Parse(request))
        {
            JsonElement root = document.RootElement;
            Console.WriteLine(root);
            JsonElement baseSymbol = root.GetProperty("base");
            symbols.Add(baseSymbol.ToString());
        }

        var json = new {
            symbols = symbols
        };

        return new JsonResult(json);
    }
}