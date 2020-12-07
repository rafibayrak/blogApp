using System;
using System.Collections.Generic;

namespace BlogApplication.Core.Models
{
    public class Category : IIdentity
    {
        public Category()
        {
            CategoryBlogItems = new List<CategoryPostItem>();
        }

        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryPostItem> CategoryBlogItems { get; set; }
    }
}
