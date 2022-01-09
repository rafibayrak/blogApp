using AutoMapper;
using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using BlogApplication.Extensions;
using BlogApplication.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Reflection;
using System.Threading.Tasks;

namespace BlogApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly IService _service;
        private readonly IMapper _mapper;
        private readonly IHostingEnvironment _appEnvironment;
        public ImagesController(IService service, IMapper mapper, IHostingEnvironment appEnvironment)
        {
            _service = service;
            _mapper = mapper;
            _appEnvironment = appEnvironment;
        }

        [HttpGet]
        public async Task<IActionResult> GetFolders()
        {
            var folders = _service.Include<ImageFolder, User>(x => x.User);
            var response = await DataTableHelper<ImageFolder>.GetEntitiesAsync(folders, this.GetDataTableParameter());
            var dataTable = new DataTableResponse<ImageDto>();
            dataTable.filterRows = response.Count();
            dataTable.source = _mapper.Map<IEnumerable<ImageDto>>(response);
            return Ok(dataTable);
        }

        [HttpGet("{folderId}/images")]
        public async Task<IActionResult> GetFolderImages(Guid folderId)
        {
            var images = _service.Where<Image>(x => x.ImageFolderId == folderId);
            var response = await DataTableHelper<Image>.GetEntitiesAsync(images, this.GetDataTableParameter());
            var dataTable = new DataTableResponse<ImageDto>();
            dataTable.filterRows = response.Count();
            dataTable.source = _mapper.Map<IEnumerable<ImageDto>>(response);
            return Ok(dataTable);
        }

        [HttpPost("saveFolder")]
        public async Task<IActionResult> Save(ImageDto imageDto)
        {
            var imageFolder = _mapper.Map<ImageFolder>(imageDto);
            imageFolder.UserId = Guid.Parse("1db506b5-3fa5-451a-9a4b-68edf7b4c2d7");
            await _service.AddAsync(imageFolder);
            return NoContent();
        }

        [HttpPut("{id}/updateFolder")]
        public async Task<IActionResult> Update(Guid id, ImageDto imageDto)
        {
            if (id != imageDto.Id)
            {
                return BadRequest();
            }

            var existImageFolder = _service.GetByIdAsync<ImageFolder>(id);
            if (existImageFolder == null)
            {
                return NotFound();
            }

            var imageFolder = _mapper.Map<ImageFolder>(imageDto);
            imageFolder.UserId = Guid.Parse("1db506b5-3fa5-451a-9a4b-68edf7b4c2d7");
            _service.Update(imageFolder);
            return NoContent();
        }

        [HttpPost("uploadImage")]
        public async Task<IActionResult> UploadImage()
        {
            try
            {
                var files = HttpContext.Request.Form.Files;
                if (files.Count <= 0)
                {
                    return BadRequest();
                }

                var folderIdStr = Request.Form["folderId"];
                if (!Guid.TryParse(folderIdStr, out Guid folderId))
                {
                    return BadRequest();
                }

                var imageFolder = _service.GetByIdAsync<ImageFolder>(folderId);
                if (imageFolder == null)
                {
                    return NotFound();
                }
                //Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
                var workingDirectory = _appEnvironment.WebRootPath;
                var appData = Path.Combine(workingDirectory, "App_Data");
                if (!Directory.Exists(appData))
                {
                    Directory.CreateDirectory(appData);
                }

                var folder = Path.Combine(appData, folderId.ToString());
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var pathToSave = Path.Combine(workingDirectory, folder);
                List<Image> images = new List<Image>();
                foreach (var file in files)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var image = new Image();
                    image.ImageFolderId = folderId;
                    image.UserId = Guid.Parse("1db506b5-3fa5-451a-9a4b-68edf7b4c2d7");
                    image.Name = fileName;
                    images.Add(image);
                    var fullPath = Path.Combine(pathToSave, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                await _service.AddRangeAsync(images.AsQueryable());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }

            return NoContent();
        }

        [HttpDelete("{id}/removeFolder")]
        public async Task<IActionResult> Remove(Guid id)
        {
            var imageFolder = _service.IncludeWithWhere<ImageFolder, ICollection<Image>>(x => x.Images, x => x.Id == id)?.FirstOrDefault();
            if (imageFolder == null)
            {
                return NotFound();
            }

            var workingDirectory = _appEnvironment.WebRootPath;
            var appData = Path.Combine(workingDirectory, "App_Data");
            foreach (var image in imageFolder.Images)
            {
                var filePath = Path.Combine(appData, image.ImageFolderId.ToString(), image.Name);
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }
            }

            _service.Remove(imageFolder);
            return NoContent();
        }

        [HttpDelete("{imageId}/removeImage")]
        public async Task<IActionResult> RemoveImage(Guid imageId)
        {
            var image = await _service.GetByIdAsync<Image>(imageId);
            if (image == null)
            {
                return NotFound();
            }

            var workingDirectory = _appEnvironment.WebRootPath;
            var appData = Path.Combine(workingDirectory, "App_Data");
            var filePath = Path.Combine(appData, image.ImageFolderId.ToString(), image.Name);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _service.Remove(image);
            return NoContent();
        }
    }
}
