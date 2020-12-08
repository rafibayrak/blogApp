using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.Core.Models
{
    public class ImageFolder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public ICollection<Image> Images { get; set; }
    }
}
