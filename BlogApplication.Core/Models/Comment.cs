using System;

namespace BlogApplication.Core.Models
{
    public class Comment : IIdentity
    {
        public Comment()
        {
            Id = Guid.NewGuid();
            CreationTime = DateTime.UtcNow;
            ModificationTime = DateTime.UtcNow;
        }

        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
        public string Message { get; set; }
        public MessageState MessageState { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
        public Guid? ParentCommentId { get; set; }
        public virtual Comment ParentComment { get; set; }
        public  Guid BlogPostId { get; set; }
        public virtual BlogPost BlogPost { get; set; }
    }
}
