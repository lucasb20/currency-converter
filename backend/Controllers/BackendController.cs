using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("currency")]
public class CurrencyController : ControllerBase
{
    [HttpGet("flags")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public IActionResult GetCurrency(){

        HttpClient client = new();

        string accessKey = Environment.GetEnvironmentVariable("ACCESS_KEY");

        string fixer_url = "http://data.fixer.io/api/latest" + "?access_key="+ accessKey;

        var request = client.GetStringAsync(fixer_url);
        
        var json = new {
            teste = request
        };

        return new JsonResult(json);
    }
}