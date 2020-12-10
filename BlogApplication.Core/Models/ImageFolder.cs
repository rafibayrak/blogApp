using System;
using System.Collections.Generic;

namespace BlogApplication.Core.Models
{
    public class ImageFolder : IIdentity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid UserId { get; set; }
        public virtual User User { get; set; }
        public ICollection<Image> Images { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
    }
}
