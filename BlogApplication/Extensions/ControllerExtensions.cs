using BlogApplication.DataContact;
using Microsoft.AspNetCore.Mvc;

namespace BlogApplication.Extensions
{
    public static class ControllerExtensions
    {
        public static DataTableParameter GetDataTableParameter(this ControllerBase controllerBase)
        {
            var dataTableParameter = new DataTableParameter();
            dataTableParameter.Filter = controllerBase.ControllerContext.HttpContext.Request.Query["filter"];
            dataTableParameter.Orderby = controllerBase.ControllerContext.HttpContext.Request.Query["orderby"];
            dataTableParameter.PageSize = int.Parse(controllerBase.ControllerContext.HttpContext.Request.Query["pageSize"]);
            dataTableParameter.PageIndex = int.Parse(controllerBase.ControllerContext.HttpContext.Request.Query["pageIndex"]);
            return dataTableParameter;
        }
    }
}
