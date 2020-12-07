using BlogApplication.Core.IRepositories;
using BlogApplication.Core.IServices;
using BlogApplication.Core.IUnitOfWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlogApplication.Service.Services
{
    public class RepositoryService : IService
    {
        public readonly IUnitOfWork _unitOfWork;
        private readonly IRepository _repository;

        public RepositoryService(IUnitOfWork unitOfWork, IRepository repository)
        {
            _unitOfWork = unitOfWork;
            _repository = repository;
        }

        public async Task<TEntity> AddAsync<TEntity>(TEntity entity) where TEntity : class
        {
            await _repository.AddAsync(entity);
            await _unitOfWork.CommitAsync();
            return entity;
        }


        public async Task<IQueryable<TEntity>> AddRangeAsync<TEntity>(IQueryable<TEntity> entities) where TEntity : class
        {
            await _repository.AddRangeAsync(entities);
            await _unitOfWork.CommitAsync();
            return entities;
        }

        public Task<TEntity> FirstOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return _repository.FirstOrDefaultAsync<TEntity>(predicate);
        }

        public async Task<IQueryable<TEntity>> GetAllAsync<TEntity>() where TEntity : class
        {
            return await _repository.GetAllAsync<TEntity>();
        }

        public async Task<TEntity> GetByIdAsync<TEntity>(Guid id) where TEntity : class
        {
            return await _repository.GetByIdAsync<TEntity>(id);
        }

        public IQueryable<TEntity> Include<TEntity,T>(Expression<Func<TEntity, T>> predicate) where TEntity : class
        {
            return _repository.Include<TEntity,T>(predicate);
        }

        public IQueryable<TEntity> IncludeWithWhere<TEntity,T>(Expression<Func<TEntity, T>> predicate, Expression<Func<TEntity, bool>> predicateWhere) where TEntity : class
        {
            return _repository.IncludeWithWhere<TEntity,T>(predicate, predicateWhere);
        }

        public void Remove<TEntity>(TEntity entity) where TEntity : class
        {
            _repository.Remove<TEntity>(entity);
            _unitOfWork.Commit();
        }

        public void RemoveRange<TEntity>(IQueryable<TEntity> entities) where TEntity : class
        {
            _repository.RemoveRange<TEntity>(entities);
            _unitOfWork.Commit();
        }

        public async Task<TEntity> SingleOrDefaultAsync<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return await _repository.SingleOrDefaultAsync<TEntity>(predicate);
        }

        public TEntity Update<TEntity>(TEntity entity) where TEntity : class
        {
            TEntity updateEntity = _repository.Update<TEntity>(entity);
            _unitOfWork.Commit();
            return updateEntity;
        }

        public IQueryable<TEntity> Where<TEntity>(Expression<Func<TEntity, bool>> predicate) where TEntity : class
        {
            return _repository.Where<TEntity>(predicate);
        }
    }
}
