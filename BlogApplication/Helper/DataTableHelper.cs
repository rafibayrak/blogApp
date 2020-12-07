using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BlogApplication.Helper
{
    public class DataTableHelper<TEntity> where TEntity : class
    {
        public static async Task<IQueryable<TEntity>> GetEntitiesAsync(IQueryable<TEntity> entities,DataTableParameter dataTableParameter)
        {
            PropertyDescriptorCollection props = TypeDescriptor.GetProperties(typeof(TEntity));
            Expression<Func<TEntity, bool>> expression = null;
            foreach (PropertyDescriptor property in props)
            {
                if (property.PropertyType == typeof(string))
                {
                    if (expression == null)
                    {
                        expression = ExpressionHelper.GetCriteriaWhere<TEntity>(property.Name, OperationExpression.Like, dataTableParameter.Filter);
                    }
                    else
                    {
                        expression = expression.Or(ExpressionHelper.GetCriteriaWhere<TEntity>(property.Name, OperationExpression.Like, dataTableParameter.Filter));
                    }
                }
            }

            var ordertype = dataTableParameter.Orderby.Split('-');
            IQueryable<TEntity> result = null;
            if (dataTableParameter.Orderby.Length == 0)
            {
                result = entities.Where(expression);
            }
            else if (ordertype.Length == 1)
            {
                result = Sort(entities.Where(expression), ordertype[0], "asc");
            }
            else
            {
                result = Sort(entities.Where(expression), ordertype[1], "");
            }

            return result.Skip(dataTableParameter.PageIndex).Take(dataTableParameter.PageSize);
        }

        public static IQueryable<TEntity> Sort(IQueryable<TEntity> source, string sortBy, string sortDirection)
        {
            var param = Expression.Parameter(typeof(TEntity), "item");

            var sortExpression = Expression.Lambda<Func<TEntity, object>>
                (Expression.Convert(Expression.Property(param, sortBy), typeof(object)), param);

            switch (sortDirection.ToLower())
            {
                case "asc":
                    return source.OrderBy<TEntity, object>(sortExpression);
                default:
                    return source.OrderByDescending<TEntity, object>(sortExpression);
            }
        }
    }
}
