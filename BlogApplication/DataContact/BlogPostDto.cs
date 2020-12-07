using System;
using System.Collections.Generic;

namespace BlogApplication.DataContact
{
    public class BlogPostDto
    {
        public Guid Id { get; set; }
        public string CategoryNames { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
    }
}
