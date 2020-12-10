using System;
using System.Collections.Generic;
using System.Text;

namespace BlogApplication.Core.Models
{
    public class Image
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ImageFolderId { get; set; }
        public virtual ImageFolder ImageFolder { get; set; }
        public Guid? UserId { get; set; }
        public virtual User User { get; set; }
    }
}
