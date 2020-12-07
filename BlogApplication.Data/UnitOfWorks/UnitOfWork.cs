using BlogApplication.Core.IUnitOfWorks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BlogApplication.Data.UnitOfWorks
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly BlogDataContext _context;
        public UnitOfWork(BlogDataContext appDbContext)
        {
            _context = appDbContext;
        }

        public void Commit()
        {
            _context.SaveChanges();
        }

        public async Task CommitAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
