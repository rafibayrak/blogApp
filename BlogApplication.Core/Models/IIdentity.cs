using System;

namespace BlogApplication.Core.Models
{
    interface IIdentity
    {
        public Guid Id { get; set; }
        public DateTime CreationTime { get; set; }
        public DateTime ModificationTime { get; set; }
    }
}
