using AutoMapper;
using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using BlogApplication.Extensions;
using BlogApplication.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostsController : ControllerBase
    {
        private readonly IService _service;
        private readonly IMapper _mapper;
        public BlogPostsController(IService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var blogposts = await _service.GetAllAsync<BlogPost>();
            var blogpostDtos = _mapper.Map<IEnumerable<BlogPostDto>>(blogposts);
            foreach (var item in blogposts)
            {
                var categoryItems = _service.IncludeWithWhere<CategoryPostItem, Category>(x => x.Category, c => c.BlogPostId == item.Id).Select(x => x.Category.Name);
                blogpostDtos.FirstOrDefault(x => x.Id == item.Id).CategoryNames = string.Join(" ,", categoryItems);
            }

            var response = await DataTableHelper<BlogPostDto>.GetEntitiesAsync(blogpostDtos.AsQueryable(), this.GetDataTableParameter());
            var dataTable = new DataTableResponse<BlogPostDto>();
            dataTable.filterRows = response.Count();
            dataTable.source = _mapper.Map<IEnumerable<BlogPostDto>>(response);
            return Ok(dataTable);
        }

        [HttpPost]
        public async Task<IActionResult> Save(BlogPostCreateDto blogPostCreateDto)
        {
            var blogPost = _mapper.Map<BlogPost>(blogPostCreateDto);
            await _service.AddAsync<BlogPost>(blogPost);
            List<CategoryPostItem> categoryPostItems = new List<CategoryPostItem>();
            blogPostCreateDto.CategoryIds.ForEach(categoryId =>
            {
                var categoryBlogItem = new CategoryPostItem();
                categoryBlogItem.UserId = Guid.Parse("1db506b5-3fa5-451a-9a4b-68edf7b4c2d7");
                categoryBlogItem.CategoryId = categoryId;
                categoryBlogItem.BlogPostId = blogPost.Id;
                categoryPostItems.Add(categoryBlogItem);
            });
            await _service.AddRangeAsync<CategoryPostItem>(categoryPostItems.AsQueryable());
            return NoContent();
        }
    }
}
