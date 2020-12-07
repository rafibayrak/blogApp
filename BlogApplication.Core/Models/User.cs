using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.Core.Models
{
    public class User : IIdentity
    {
        public User()
        {
            Id = Guid.NewGuid();
            Categories = new List<Category>();
            BlogPosts = new List<BlogPost>();
            Comments = new List<Comment>();
            CreationTime = DateTime.UtcNow;
            ModificationTime = DateTime.UtcNow;
        }

        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public UserRole UserRole { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public ICollection<BlogPost> BlogPosts { get; set; }
        public ICollection<Category> Categories { get; set; }
        public ICollection<Comment> Comments { get; set; }
    }
}
