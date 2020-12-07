using AutoMapper;
using BlogApplication.Core.IServices;
using BlogApplication.Core.Models;
using BlogApplication.DataContact;
using System;

namespace BlogApplication.Mapping
{
    public class MapProfile : Profile
    {
        public MapProfile()
        {
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryDto, Category>()
                .ForMember(x => x.Id, o => o.MapFrom(src => src.Id == Guid.Empty ? Guid.NewGuid() : src.Id))
                .ForMember(x => x.CreationTime, o => o.MapFrom(src => src.CreationTime == DateTime.MinValue ? DateTime.UtcNow : src.CreationTime))
                .ForMember(x => x.ModificationTime, o => o.MapFrom(src => src.ModificationTime == DateTime.MinValue ? DateTime.UtcNow : src.ModificationTime));

            CreateMap<User, UserDto>();

            CreateMap<User, UserCreateDto>();
            CreateMap<UserCreateDto, User>()
                .ForMember(x => x.Id, o => o.MapFrom(src => src.Id == Guid.Empty ? Guid.NewGuid() : src.Id))
                .ForMember(x => x.CreationTime, o => o.MapFrom(src => src.CreationTime == DateTime.MinValue ? DateTime.UtcNow : src.CreationTime))
                .ForMember(x => x.ModificationTime, o => o.MapFrom(src => src.ModificationTime == DateTime.MinValue ? DateTime.UtcNow : src.ModificationTime));

            CreateMap<BlogPost, BlogPostCreateDto>();
            CreateMap<BlogPostCreateDto, BlogPost>().ForMember(x => x.Id, o => o.MapFrom(src => src.Id == Guid.Empty ? Guid.NewGuid() : src.Id))
                .ForMember(x => x.CreationTime, o => o.MapFrom(src => src.CreationTime == DateTime.MinValue ? DateTime.UtcNow : src.CreationTime))
                .ForMember(x => x.ModificationTime, o => o.MapFrom(src => src.ModificationTime == DateTime.MinValue ? DateTime.UtcNow : src.ModificationTime));
            CreateMap<BlogPost, BlogPostDto>();
            ;
        }
    }
}
