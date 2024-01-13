using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("currency")]
public class CurrencyController : ControllerBase
{
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult GetCurrency(){

        var json = new { teste = "testando", vamos = 123 };

        return new JsonResult(json);
    }
}