﻿using BlogApplication.Core.Models;
using System;

namespace BlogApplication.DataContact
{
    public class UserCreateDto
    {
        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public UserRole UserRole { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
    }
}
