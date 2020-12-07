using System.Security.Cryptography;
using System.Text;

namespace BlogApplication.Helper
{
    public static class PasswordHelper
    {
        private static byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
            {
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
            }
        }

        public static string GetHashString(string inputString)
        {
            if (string.IsNullOrWhiteSpace(inputString))
            {
                return string.Empty;
            }

            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
            {
                sb.Append(b.ToString("X2"));
            }

            return sb.ToString();
        }

        public static bool VerifyPassword(string input, string password)
        {
            var result = GetHashString(input);
            if (!string.IsNullOrEmpty(result) && result == password)
            {
                return true;
            }

            return false;
        }
    }
}
