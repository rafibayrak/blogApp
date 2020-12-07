using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApplication.DataContact
{
    public class BlogPostCreateDto
    {
        public Guid Id { get; set; }
        public List<Guid> CategoryIds { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
