using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using BlogApplication.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;

namespace BlogApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly AppSettings _appSettings;
        private readonly IService _service;
        public AuthenticationController(IOptions<AppSettings> appSettings, IService service)
        {
            _appSettings = appSettings.Value;
            _service = service;
        }

        [AllowAnonymous]
        [Route("authenticate")]
        [HttpPost]
        public async Task<IActionResult> Authenticate(Login login)
        {
            var user = await _service.FirstOrDefaultAsync<User>(x => x.UserName == login.UserName);
            if (user == null)
            {
                return null;
            }

            var token = AuthenticationHelper.Authenticate(login, user, _appSettings);
            if (token == null)
            {
                return BadRequest();
            }
            user.Token = token;
            _service.Update(user);
            return Ok(token);
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            HttpContext.Session.Clear();
            return NoContent();
        }
    }
}
