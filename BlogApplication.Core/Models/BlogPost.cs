using System;
using System.Collections.Generic;

namespace BlogApplication.Core.Models
{
    public class BlogPost : IIdentity
    {
        public BlogPost()
        {
            Id = Guid.NewGuid();
            Comments = new List<Comment>();
            CategoryBlogItems = new List<CategoryPostItem>();
            CreationTime = DateTime.UtcNow;
            ModificationTime = DateTime.UtcNow;
        }

        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool IsApproved { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<CategoryPostItem> CategoryBlogItems { get; set; }
    }
}
