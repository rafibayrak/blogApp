using AutoMapper;
using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using BlogApplication.Extensions;
using BlogApplication.Helper;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        public readonly IService _service;
        public readonly IMapper _mapper;
        public CategoriesController(IService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _service.GetAllAsync<Category>();
            var response = await DataTableHelper<Category>.GetEntitiesAsync(categories, this.GetDataTableParameter());
            var dataTable = new DataTableResponse<CategoryDto>();
            dataTable.filterRows = response.Count();
            dataTable.source = _mapper.Map<IEnumerable<CategoryDto>>(response);
            return Ok(dataTable);
        }


        [HttpGet("notFilter")]
        public async Task<IActionResult> GetAllNotFilter()
        {
            var categories = await _service.GetAllAsync<Category>();
            var categoryDtos = _mapper.Map<IEnumerable<CategoryDto>>(categories);
            return Ok(categoryDtos);
        }

        [HttpPost]
        public async Task<IActionResult> Save(CategoryDto categoryDto)
        {
            categoryDto.Name = categoryDto.Name.Trim();
            if (string.IsNullOrEmpty(categoryDto.Name))
            {
                return BadRequest();
            }

            var category = _mapper.Map<Category>(categoryDto);
            await _service.AddAsync(category);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(Guid id, CategoryDto categoryDto)
        {
            if (id == null || id == Guid.Empty || id != categoryDto.Id)
            {
                return BadRequest();
            }

            categoryDto.Name = categoryDto.Name.Trim();
            if (string.IsNullOrEmpty(categoryDto.Name))
            {
                return BadRequest();
            }

            var category = _mapper.Map<Category>(categoryDto);
            _service.Update(category);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(Guid id)
        {
            if (id == null || id == Guid.Empty)
            {
                return BadRequest();
            }

            var category = await _service.GetByIdAsync<Category>(id);
            if (category == null)
            {
                return NotFound();
            }

            _service.Remove(category);
            return NoContent();
        }
    }
}
