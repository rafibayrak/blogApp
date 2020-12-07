using System;

namespace BlogApplication.Core.Models
{
    public class CategoryPostItem
    {
        public CategoryPostItem()
        {
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; }
        public Guid? BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
    }
}
