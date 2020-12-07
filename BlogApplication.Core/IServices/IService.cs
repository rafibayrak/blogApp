using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BlogApplication.Core.IServices
{
    public interface IService
    {
        Task<TEntity> GetByIdAsync<TEntity>(Guid id) where TEntity : class;
        Task<IQueryable<TEntity>> GetAllAsync<TEntity>() where TEntity : class;
        IQueryable<TEntity> Where<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;
        IQueryable<TEntity> Include<TEntity,T>(Expression<Func<TEntity, T>> predicate) where TEntity : class;
        IQueryable<TEntity> IncludeWithWhere<TEntity,T>(Expression<Func<TEntity, T>> predicate, Expression<Func<TEntity, bool>> predicateWhere) where TEntity : class;
        Task<TEntity> FirstOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;
        Task<TEntity> SingleOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class;
        Task<TEntity> AddAsync<TEntity>(TEntity entity) where TEntity : class;
        Task<IQueryable<TEntity>> AddRangeAsync<TEntity>(IQueryable<TEntity> entities) where TEntity : class;
        void Remove<TEntity>(TEntity entity) where TEntity : class;
        void RemoveRange<TEntity>(IQueryable<TEntity> entities) where TEntity : class;
        TEntity Update<TEntity>(TEntity entity) where TEntity : class;
    }
}
