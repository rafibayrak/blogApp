﻿using AutoMapper;
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
    public class UsersController : ControllerBase
    {
        public readonly IMapper _mapper;
        public readonly IService _service;
        public UsersController(IService service, IMapper mapper)
        {
            _mapper = mapper;
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _service.GetAllAsync<User>();
            var response = await DataTableHelper<User>.GetEntitiesAsync(users, this.GetDataTableParameter());
            var dataTable = new DataTableResponse<UserDto>();
            dataTable.filterRows = response.Count();
            dataTable.source = _mapper.Map<IEnumerable<UserDto>>(response);
            return Ok(dataTable);
        }

        [HttpPost]
        public async Task<IActionResult> Save(UserCreateDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userDto);
            user.Password = PasswordHelper.GetHashString(user.Password);
            await _service.AddAsync(user);
            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Update(UserCreateDto userDto)
        {
            if (userDto == null)
            {
                return BadRequest();
            }

            var user = _mapper.Map<User>(userDto);
            _service.Update(user);
            return NoContent();
        }
    }
}
