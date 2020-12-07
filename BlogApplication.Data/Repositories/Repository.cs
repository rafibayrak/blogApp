using BlogApplication.Core.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlogApplication.Data.Repositories
{

    public class Repository: IRepository
    {
        protected readonly DbContext _context;

        public Repository(BlogDataContext context)
        {
            _context = context;
        }

        public async Task<TEntity> AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            await _context.Set<TEntity>().AddAsync(entity);
            return entity;
        }

        public async Task<IQueryable<TEntity>> AddRangeAsync<TEntity>(IQueryable<TEntity> entities) where TEntity : class
        {
            await _context.Set<TEntity>().AddRangeAsync(entities);
            return entities;
        }

        public IQueryable<TEntity> Where<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return _context.Set<TEntity>().Where(predicate);
        }

        public async Task<IQueryable<TEntity>> GetAllAsync<TEntity>() where TEntity : class
        {
            var list = await _context.Set<TEntity>().ToListAsync();
            return list.AsQueryable();
        }

        public async Task<TEntity> GetByIdAsync<TEntity>(Guid id) where TEntity : class
        {
            return await _context.Set<TEntity>().FindAsync(id);
        }

        public void Remove<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange<TEntity>(IQueryable<TEntity> entities) where TEntity : class
        {
            _context.Set<TEntity>().RemoveRange(entities);
        }

        public async Task<TEntity> SingleOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return await _context.Set<TEntity>().SingleOrDefaultAsync(predicate);
        }

        public TEntity Update<TEntity>(TEntity entity) where TEntity : class
        {
            _context.Entry(entity).State = EntityState.Modified;
            return entity;
        }

        public IQueryable<TEntity> Include<TEntity,T>(Expression<Func<TEntity, T>> predicate) where TEntity : class
        {
            return _context.Set<TEntity>().Include(predicate);
        }

        public IQueryable<TEntity> IncludeWithWhere<TEntity,T>(Expression<Func<TEntity, T>> predicate, Expression<Func<TEntity, bool>> predicateWhere) where TEntity : class
        {
            return _context.Set<TEntity>().Include(predicate).Where(predicateWhere);
        }

        public async Task<TEntity> FirstOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return await _context.Set<TEntity>().FirstOrDefaultAsync(predicate);
        }
    }
}
