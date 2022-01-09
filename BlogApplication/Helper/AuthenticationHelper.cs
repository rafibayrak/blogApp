using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BlogApplication.Helper
{
    public static class AuthenticationHelper
    {
        public static string Authenticate(Login login, User user, AppSettings appSettings)
        {
            var verifyPassword = PasswordHelper.VerifyPassword(login.Password, user.Password);
            if (!verifyPassword)
            {
                return null;
            }

            // Token oluşturmak için önce JwtSecurityTokenHandler sınıfından instance alıyorum.
            var tokenHandler = new JwtSecurityTokenHandler();
            //İmza için gerekli gizli anahtarımı alıyorum.
            var key = Encoding.ASCII.GetBytes(appSettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                //Özel olarak şu Claimler olsun dersek buraya ekleyebiliriz.
                Subject = new ClaimsIdentity(new Claim[]
                {
                    //İstersek string bir property istersek ClaimsTypes sınıfının sabitlerinden çağırabiliriz.
                    new Claim("userId", user.Id.ToString()),
                    new Claim(ClaimTypes.Name,user.UserName)
                }),
                //Tokenın hangi tarihe kadar geçerli olacağını ayarlıyoruz.
                Expires = DateTime.UtcNow.AddHours(3),
                //Son olarak imza için gerekli algoritma ve gizli anahtar bilgisini belirliyoruz.
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            //Token oluşturuyoruz.
            var token = tokenHandler.CreateToken(tokenDescriptor);
            //Oluşturduğumuz tokenı string olarak bir değişkene atıyoruz.
            string generatedToken = tokenHandler.WriteToken(token);
            return generatedToken;
        }
    }
}
