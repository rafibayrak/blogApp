using System;

namespace BlogApplication.Core.Models
{
    public class Image : IIdentity
    {
        public Image()
        {
            Id = Guid.NewGuid();
            CreationTime = DateTime.UtcNow;
            ModificationTime = DateTime.UtcNow;
        }

        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ImageFolderId { get; set; }
        public virtual ImageFolder ImageFolder { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
    }
}
